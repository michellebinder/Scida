import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        // const user = { id: "1", username: "jsmith", email: "jsmith@example.com", password: "test123" }
        const user = {
          email: credentials.email,
          password: credentials.password,
        };
        // Query the database or other source of user information using the supplied credentials
        // const user = await findUser(credentials.username, credentials.password);

        if (user.email === "test@test.de") {
          // Any object returned will be saved in `user` property of the JWT
          return user;
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null;

          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        }
      },
    }),
  ],
  pages:{
    signIn: "/" //Telling nextauth that we want our own loging form
  }
});
