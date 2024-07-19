import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import checkLogin from "../../../../../action/checkLogin";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Enter email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
				try {
					if (credentials?.email && credentials?.password) {
						const user = await checkLogin(credentials?.email, credentials?.password);
						if (user) {
							return user;
						}
					}
				} catch (e) {}

				return null;
			},
        }),
    ],
    pages: {
        signIn: '/login',
    },
    session: {
        jwt: true,
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
            }
            return token;
        },
        async session({ session, token }) {
            if (token) {
                session.id = token.id;
            }
            return session;
        }
    }
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
