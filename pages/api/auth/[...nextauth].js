import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const mysql = require("mysql");

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // `credentials` is used to generate a form on the sign in page.
      // You can specify which fields should be submitted, by adding keys to the `credentials` object.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.

      //using our own login form, therefore leaving it blank
      credentials: {
        // email: { label: "Email", type: "text", placeholder: "jsmith" },
        // password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        // const user = {
        //   email: credentials.email,
        //   password: credentials.password,
        // };
        // //database information
        const connection = mysql.createConnection({
          host: "127.0.0.1",
          user: "root",
          password: "@UniKoeln123",
          port: 3306,
          database: "test_db",
        });
        //connect database
        connection.connect();
        //content query

        connection.query(
          "select account_role from accounts where email=? AND account_pwd=?",
          [email, password],
          (err, results, fields) => {
            console.log(results[0]);
            if (results[0]) {
              // Any object returned will be saved in `user` property of the JWT
              return results[0];
            } else {
              // If you return null then an error will be displayed advising the user to check their details.
              console.log("error")
              return null;
    
              // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
            }
          }
        );
        connection.end();
        
      },
    }),
  ],
  pages: {
    signIn: "/", //Telling nextauth that we want our own loging form
  },
});
