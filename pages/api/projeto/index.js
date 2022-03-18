import { projetos } from "../../../data";
const uuidv4 = require("uuid/v4");

export default function handler(request, response) {
    const { method } = request;

    if (method === "GET") {
        return response.status(200).json(projetos);
    }

    if (method === "POST") {
        const { body } = request;
        const id = uuidv4();
        projetos.push({ ...body, id: id });
        return response.status(200).json(projetos);
    }
}
