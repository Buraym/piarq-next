import { withIronSessionApiRoute } from "iron-session/next";

export default withIronSessionApiRoute(
    function userRoute(req, res) {
        res.send({ user: req?.session?.user });
    },
    {
        cookieName: "piarq-session",
        password: process.env.SESSION_SECRET,
        cookieOptions: {
            secure: process.env.NODE_ENV === "production",
        },
    }
);
