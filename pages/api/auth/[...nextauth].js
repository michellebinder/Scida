import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
const mysql = require("mysql");

//THIS DATABASE CALL NEEDS TO BE DONE HERE,OTHERWISE VALUES ARE SET TOO LATE LEADING TO "UNDEFINED" ERROS
//Look up all the users in the db for later comparison in the authorize function
var users;
//Database information
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
connection.query("select * from accounts", (err, results, fields) => {
  if (err) {
    throw err;
  } else {
    setUsers(results);
  }
});
connection.end();

//Use this function
function setUsers(value) {
  users = value;
  console.log("Length of users array: " + users.length);
  console.log(users);
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
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
            console.log("logged in");
            return users[i];
          }
        }
        //Return null then an error will be displayed advising the user to check their details.
        //This is the case where no user found
        console.log("error, credentials wrong or user does not exist");
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/", //Telling nextauth that we want our own loging form
  },
});
