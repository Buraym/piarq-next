import axios from "axios";

export default async function register(req, res) {
    try {
        const { username, email, password } = req.body;
        const response = await axios.post(
            "https://piarq.herokuapp.com/auth/register",
            { username, email, password }
        );
        res.status(200).json({
            name: response.data._doc.username,
            email: response.data._doc.email,
            clients: response.data._doc.clients,
        });
    } catch (err) {
        res.status(500).json({
            message: "Não foi possivel fazer o registro de usuario !",
        });
    }
}
