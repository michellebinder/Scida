import Credentials from "next-auth/providers/credentials";
const mysql = require("mysql2");
import { useRouter } from "next/router";
const ldap = require("ldapjs");
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { setHttpClientAndAgentOptions } from "next/dist/server/config";

export default NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      //Using our own login form, therefore leaving it blank, but needs to remain here
      credentials: {},

      //Most important function to authorize users
      async authorize(credentials, req) {
        //Needed to integrate the database connection directly into the auhthorize function! Otherwise, it would not update the passwords when they were changed by the admin!
        const connection = mysql.createConnection({
          host: "127.0.0.1",
          user: "root",
          password: "@UniKoeln123",
          port: 3306,
          database: "test_db",
        });

        connection.connect();

        //Look up all the users in the db for later comparison
        let users;
        try {
          const [rows] = await connection
            .promise()
            .query("select * from accounts");
          users = rows;
        } catch (error) {
          console.error(error);
        }
        //Logic to look up the user from the credentials supplied
        const user = users.find(
          (user) =>
            user.email === credentials.email &&
            user.account_pwd === credentials.password
        );
        if (user) {
          connection.end();
          return user;
        } else {
          console.error("Lokale Zugangsdaten falsch");
          return null;
        }
      },
    }),
    CredentialsProvider({
      id: "LDAP",
      name: "LDAP",
      credentials: {},
      async authorize(credentials, req) {
        // You might want to pull this call out so we're not making a new LDAP client on every login attempt
        const client = ldap.createClient({
          url: "ldaps://ldapproxy-rzkj-1.rrz.uni-koeln.de",
        });

        // Essentially promisify the LDAPJS client.bind function
        return new Promise((resolve, reject) => {
          client.bind(
            "uid=" + credentials.email + ",ou=People,dc=uni-koeln,dc=de",
            credentials.password,
            (error) => {
              if (error) {
                console.error("LDAP Zugangsdaten falsch");
                reject();
              } else {
                // Perform a search to retrieve additional attributes for the user
                client.search(
                  "ou=People,dc=uni-koeln,dc=de",
                  {
                    scope: "sub",
                    filter: `uid=${credentials.email}`,
                  },
                  (err, res) => {
                    res.on("searchEntry", (entry) => {
                      // `entry.attributes` contains the additional attributes for the user
                      resolve({
                        attributes: entry.object,
                      });
                    });
                    res.on("error", (err) => {
                      console.error("Error: " + err.message);
                      reject();
                    });
                    res.on("end", (result) => {
                      //console.log("Status: " + result.status);
                    });
                  }
                );
              }
            }
          );
        });
      },
    }),
  ],
  jwt: {
    maxAge: 60 * 60, //JWT token expires after 1h
  },
  session: {
    maxAge: 60 * 60, //Session expires after 1h
  },
  callbacks: {
    //JWT token is the actual ENCRYPTED DATA that is stored as an http-only cookie and NOT available for JavaScript for security reasons
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        //Storing all user information we get in the token
        token.user = user;
      }
      return token;
    },
    //SESSION is a CONVENIENCE PIECE that allows us to display certain data of the jwt token on the frontend
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    //Use redirect callback in future instead of router.push
  },
  pages: {
    signIn: "/", //Telling nextauth that we want our own loging form
    error: "/",
  },
});
