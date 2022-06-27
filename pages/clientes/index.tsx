import NextHead from "../../src/components/defaultPage/NextHead";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import CardCliente from "../../src/components/Cliente/Card";
import CardCriarCliente from "../../src/components/Cliente/CriarCliente";
import LinearLoading from "../../src/components/LinearLoading";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Clientes({}) {
    const [session, setSession] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [loadingClients, setLoadingClients] = useState(false);
    const [listaClientes, setListaClientes] = useState([]);

    async function GetClients(session) {
        try {
            setLoadingClients(true);
            const response = await axios.get(
                "https://piarq.herokuapp.com/clientes/list",
                // "http://localhost:5000/clientes/list",
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                    },
                }
            );
            console.log(response.data);
            setListaClientes(response.data);
            setLoadingClients(false);
        } catch (err) {
            console.log(err);
            toast.error("Houve um erro ao tentar retornar os clientes !!!");
            setLoadingClients(false);
        }
    }

    async function getSession() {
        const sessionJSON = JSON.parse(window.localStorage.getItem("session"));
        setSession(sessionJSON);
        if (sessionJSON) {
            setLoading(false);
        } else {
            router.push("/");
        }
        await GetClients(sessionJSON);
    }

    useEffect(() => {
        getSession();
    }, []);

    return (
        <>
            <NextHead title="Piarq | Clientes" />
            <ToastContainer autoClose={2000} position={"top-right"} />

            {loading ? (
                <LinearLoading />
            ) : (
                <>
                    <Menu image={session?.image} />
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
                                            refresh={getSession}
                                        />
                                    ))}

                                    <CardCriarCliente refresh={getSession} />
                                </>
                            )}
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
