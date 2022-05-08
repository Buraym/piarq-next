import cookie from "cookie";

export default async function login(req, res) {
    try {
        const { AccessToken, _id, name, image } = req.body;
        console.log(req.body);

        // // Cookie with AccessToken, _id, name, image
        res.setHeader(
            "Set-Cookie",
            cookie.serialize(
                "accessToken",
                // `{token:${AccessToken},id:${_id},name:${name},image:${image}}`,
                `${AccessToken}`,
                {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === "production",
                    expires: new Date(0),
                    maxAge: 60 * 60 * 24 * 14,
                    sameSite: "strict",
                    path: "/",
                }
            )
        );

        res.statusCode = 200;
        res.json({ success: true });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: err,
        });
    }
}
