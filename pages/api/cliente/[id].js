import { clientes } from "../../../data";

export default function handler(request, response) {
    const { method } = request;

    if (method === "GET") {
        const { id } = request.query;

        const cliente = clientes.find(
            (cliente) => cliente.id.toString() === id
        );

        if (!cliente) {
            return response.status(400).json("User not found");
        }

        return response.status(200).json(cliente);
    }
}
