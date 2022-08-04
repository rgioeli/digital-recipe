import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { mongodb } from "../../../src/library/mongodb";
export const authOptions = {
  // Configure one or more authentication providers
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ profile }) {
      // this triggers when the user logs in
      // we want to check if they're saved in the databse
      // if its a new user add them to the database
      const db = await mongodb();
      const user = await db
        .collection("users")
        .findOne({ email: profile.email });
      if (!user) {
        const name = profile.name;
        const email = profile.email;
        db.collection("users").insertOne({
          name,
          email,
        });
      }

      return true;
    },
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
};

export default NextAuth(authOptions);
