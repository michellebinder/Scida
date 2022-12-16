// export default NextAuth({
//   providers: [
//
//   ],
//   callbacks: {
//     async session({ session, token }) {
//       session.user = token.user;
//       return session;
//     },
//     async jwt({ token, user }) {
//       if (user) {
//         token.user = user;
//       }
//       return token;
//     },
//   },
//
// });
import Credentials from "next-auth/providers/credentials";
const mysql = require("mysql");
import { useRouter } from "next/router";
const ldap = require("ldapjs");
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { setHttpClientAndAgentOptions } from "next/dist/server/config";

// // HELP: If you want to use the database instead of the dummy accounts in row 39-59 -> Comment in lines 7 to 37 and comment out lines 39-59
// //THIS DATABASE CALL NEEDS TO BE DONE HERE,OTHERWISE VALUES ARE SET TOO LATE LEADING TO "UNDEFINED" ERROS
// //Look up all the users in the db for later comparison in the authorize function
// var users;
// //Database information
// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "@UniKoeln123",
//   port: 3306,
//   database: "test_db",
// });

// //connect database
// connection.connect();

// //content query
// connection.query("select * from accounts", (err, results, fields) => {
//   if (err) {
//     throw err;
//   } else {
//     setUsers(results);
//   }
// });
// connection.end();

// //Use this function
// function setUsers(value) {
//   users = value;
//   console.log("Length of users array: " + users.length);
//   console.log(users);
// }

var users = [
  {
    id: 1,
    email: "studierende@test.de",
    account_pwd: "123test",
    account_role: "Studierende",
    first_name: "Studierende",
  },
  {
    id: 2,
    email: "dozierende@test.de",
    account_pwd: "123test",
    account_role: "Dozierende",
    first_name: "Dozierende",
  },
  {
    id: 3,
    email: "sekretariat@test.de",
    account_pwd: "123test",
    account_role: "Sekretariat",
    first_name: "Sekretariat",
  },
  {
    id: 4,
    email: "dekanat@test.de",
    account_pwd: "123test",
    account_role: "Studiendekanat",
    first_name: "Sekretariat",
  },
];

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
        //Logic to look up the user from the credentials supplied
        for (let i = 0; i < users.length; i++) {
          if (
            users[i].email === credentials.email &&
            users[i].account_pwd === credentials.password
          ) {
            // Any object returned will be saved in `user` property of the JWT
            console.log("logged in ");
            return users[i];
          }
        }
        //Return null then an error will be displayed advising the user to check their details.
        //This is the case where no user found
        console.log("error, credentials wrong or user does not exist");
        return null;
      },
    }),
    CredentialsProvider({
      id: "LDAP",
      name: "LDAP",
      credentials: {},
      async authorize(credentials, req) {
        // You might want to pull this call out so we're not making a new LDAP client on every login attemp
        const client = ldap.createClient({
          url: "ldaps://ldaptest-rzkj.rrz.uni-koeln.de",
        });

        // Essentially promisify the LDAPJS client.bind function
        return new Promise((resolve, reject) => {
          client.bind(
            "uid=" + credentials.email + ",ou=People,dc=uni-koeln,dc=de",
            credentials.password,
            (error) => {
              if (error) {
                console.error("Failed");
                reject();
              } else {
                console.log("Logged in");
                resolve({
                  email: credentials.email,
                  password: credentials.password,
                });
              }
            }
          );
        });
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      const isSignIn = user ? true : false;
      if (isSignIn) {
        //Storing all user information we get in the token
        token.user = user;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    //Use redirect callback in future instead of router.push
  },
  pages: {
    signIn: "/", //Telling nextauth that we want our own loging form
  },
});