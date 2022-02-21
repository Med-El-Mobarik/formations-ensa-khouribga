import NextAuth from "next-auth";
// import Providers from "next-auth/providers";
import Providers from "next-auth/providers";
import db from "../../../config/db";

export default NextAuth({
  callbacks: {
    jwt: async (token, user, account, profile, isNewUser) => {
      user && (token.user = user);
      return Promise.resolve(token); // ...here
    },
    session: async (session, user, sessionToken) => {
      session.user = user.user;
      return Promise.resolve(session);
    },
  },
  session: {
    jwt: true,
  },
  providers: [
    Providers.Credentials({
      name: "credentials",
      async authorize(credentials) {
        const sql = `Select * from Users WHERE username = '${credentials.username}' AND password = '${credentials.password}'`;

        const [result, _] = await db.execute(sql);

        if (!result[0] || result.length === 0) {
          throw new Error("No User Found!");
        } else {
          return { name: result[0].name };
        }
      },
    }),
  ],
});
