import NextAuth from "next-auth"
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import GithubProvider from "next-auth/providers/github"
import clientPromise from "../../../util/mongodb"

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  // pages:{
  //   signIn:"/login"
  // }
  callbacks: {
    // called after sucessful signin
    jwt: async ({ token, user }) => {
      if (user) token.id = user.email
      return token
    }, 
    // called whenever session is checked
    session: async ({ session, token }) => {
      if (token) {
        session.token = token
      }
      return session
    },
  },
  secret: 'memories22',
  session: {
    strategy: 'jwt',
    maxAge: 1 * 24 * 60 * 60, // 1d
  },
  jwt: {
    secret: 'memories22',
    encryption: true,
  },
})