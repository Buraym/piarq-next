import NextHead from "../../src/components/defaultPage/NextHead";
import { useSession, signIn, signOut } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import FotoTeste1 from "../../src/assets/clienteFotoTeste1.jpg";
import FotoTeste2 from "../../src/assets/clienteFotoTeste2.jpg";
import FotoTeste3 from "../../src/assets/clienteFotoTeste3.jpg";
import CardCliente from "../../src/components/Cliente/Card";
import CardCriarCliente from "../../src/components/Cliente/CriarCliente";
import LinearLoading from "../../src/components/LinearLoading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Clientes({}) {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);
    const [loadingClients, setLoadingClients] = useState(false);
    const [listaClientes, setListaClientes] = useState([]);

    async function GetClients() {
        try {
            setLoadingClients(true);
            const response = await axios.get(
                "https://piarq.herokuapp.com/clientes/list"
            );
            console.log(response.data);
            setListaClientes(response.data);
            setLoadingClients(false);
        } catch (err) {
            toast.error("Houve um erro ao tentar retornar os clientes !!!");
            setLoadingClients(false);
        }
    }

    useEffect(() => {
        GetClients();
        session ? setLoading(false) : setLoading(false);
    }, [session]);

    return (
        <>
            <NextHead title="Piarq | Clientes" />

            {loading ? (
                <LinearLoading />
            ) : (
                <>
                    <Menu image={session?.user?.image} />
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                    >
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            sx={{ width: 280, height: 280 }}
                        >
                            <Typography fontFamily={"Pacifico"} fontSize={60}>
                                Clientes
                            </Typography>
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            alignContent="flex-start"
                            wrap="wrap"
                            sx={{ width: "90vw", height: "100%" }}
                        >
                            {loadingClients ? (
                                <LinearLoading />
                            ) : (
                                <>
                                    {listaClientes.map((item, index) => (
                                        <CardCliente
                                            data={item}
                                            key={index}
                                            refresh={GetClients}
                                        />
                                    ))}

                                    <CardCriarCliente refresh={GetClients} />
                                </>
                            )}
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
