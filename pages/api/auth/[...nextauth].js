import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "../../../config/db";

export default NextAuth({
  callbacks: {
    // jwt: async (token, user, account, profile, isNewUser) => {
    //   user && (token.user = user);
    //   return Promise.resolve(token); // ...here
    // },
    // session: async (session, user, sessionToken) => {
    //   session.user = user.user;
    //   return Promise.resolve(session);
    // },
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      return session;
    },
  },
  session: {
    jwt: true,
  },
  providers: [
    // Providers.Credentials({
    //   name: "credentials",
    //   async authorize(credentials) {
    //     const sql = `Select * from Users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;

    //     const [result, _] = await db.execute(sql);

    //     if (!result[0] || result.length === 0) {
    //       throw new Error("No User Found!");
    //     } else {
    //       return { name: result[0].name };
    //     }
    //   },
    // }),
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      // credentials: {
      //   username: { label: "Username", type: "text", placeholder: "jsmith" },
      //   password: {  label: "Password", type: "password" }
      // },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const sql = `Select * from Users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;
        const [result, _] = await db.execute(sql);
        // const user = { id: 1, name: "J Smith", email: "jsmith@example.com" }

        if (!result[0] || result.length === 0) {
          throw new Error("No User Found!");
        } else {
          return { name: result[0].name };
        }

        // if (user) {
        //   // Any object returned will be saved in `user` property of the JWT
        //   return user
        // } else {
        //   // If you return null then an error will be displayed advising the user to check their details.
        //   return null

        //   // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter
        // }
      },
    }),
  ],
});
