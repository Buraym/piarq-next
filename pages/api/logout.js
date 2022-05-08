import cookie from "js-cookies";

export default async (req, res) => {
    cookie.removeItem("token");
    cookie.removeItem("id");
    cookie.removeItem("name");
    cookie.removeItem("image");
    res.status(200).json({
        message: "Desconectado com sucesso!",
    });
};
