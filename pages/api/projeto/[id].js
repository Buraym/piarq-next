import { projetos } from "../../../data";

export default function handler(request, response) {
    const { method } = request;

    if (method === "GET") {
        const { id } = request.params;

        const projeto = projetos.find((projeto) => projeto.id === id);
        console.log(projetos);
        console.log(projeto);

        if (projeto) {
            console.log(projetos);
            console.log(projeto);
            return response.status(200).json(projeto);
        } else {
            return response.status(404).json("User not found");
        }
    }
}
