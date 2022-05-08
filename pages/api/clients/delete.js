import axios from "axios";

export default async function login(req, res) {
    try {
        const { email, password } = req.body;
        const response = await axios.post(
            "https://piarq.herokuapp.com/auth/login",
            { email, password }
        );
        req.token = response.data.accessToken;
        res.status(200).json({
            name: response.data._doc.username,
            email: response.data._doc.email,
            clients: response.data._doc.clients,
        });
    } catch (err) {
        res.status(500).json({
            message: "Não foi possivel fazer o login !",
        });
    }
}
