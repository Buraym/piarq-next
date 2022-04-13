import { randomUUID } from "crypto";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        EmailProvider({
            server: {
                host: process.env.EMAIL_SERVER_HOST,
                port: process.env.EMAIL_SERVER_PORT,
                auth: {
                    user: process.env.EMAIL_SERVER_USER,
                    pass: process.env.EMAIL_SERVER_PASSWORD,
                },
            },
            from: process.env.EMAIL_FROM,
            sendVerificationRequest({
                identifier: email,
                url,
                provider: { server, from },
            }) {
                /* your function */
            },
            async generateVerificationToken() {
                return "ABC123";
            },
        }),
    ],
    secret: "wtCkGFZOJrTyzZ5KUQe9d5ZwiYGhZUTV",
});
