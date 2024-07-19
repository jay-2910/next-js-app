import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import checkLogin from "../../../../../action/checkLogin";

const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "you@example.com" },
                password: { label: "Password", type: "password" }
            },
            authorize: async (credentials) => {
                try {
                    // Replace this with your actual user authentication logic
                    const user = await checkLogin(credentials.email, credentials.password);
                    if (user) {
                        return user;
                    }
                    return null;
                } catch (error) {
                    console.error('Authorization error:', error);
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/auth/signin',
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

export const GET = async (req, res) => {
    try {
        await NextAuth(req, res, authOptions);
    } catch (error) {
        console.error('GET error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export const POST = async (req, res) => {
    try {
        await NextAuth(req, res, authOptions);
    } catch (error) {
        console.error('POST error:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

export default { GET, POST };


/* 
export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                    placeholder: "Enter email",
                },
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
                } catch (e) { }

                return null;
            },
        })
    ],
} */

