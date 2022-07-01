import { useRouter } from "next/router";
import { Grid, Typography, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import NextHead from "../../src/components/defaultPage/NextHead";
import Menu from "../../src/components/defaultPage/Menu";
import LinearLoading from "../../src/components/LinearLoading";
import List from "../../src/components/List";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";

export default function Index() {
    const [session, setSession] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [clientRows, setClientRows] = useState([]);
    const [projectRows, setProjectRows] = useState([]);

    const clientColumns = [
        {
            field: "identity",
            headerName: "Identidade",
            width: 150,
        },
        {
            field: "name",
            headerName: "Nome",
            width: 400,
        },

        {
            field: "contact",
            headerName: "Contato",
            width: 250,
        },
        {
            field: "address",
            headerName: "Endereço",
            width: 400,
        },
        {
            field: "projects",
            headerName: "Projetos",
            width: 400,
        },
    ];

    const projectColumns = [
        {
            field: "name",
            headerName: "Nome",
        },
        {
            field: "address",
            headerName: "Endereço",
        },
        {
            field: "dateStart",
            headerName: "Data de Início",
        },

        {
            field: "dateFinish",
            headerName: "Data de Entrega",
        },
        {
            field: "cep",
            headerName: "CEP",
        },
        {
            field: "clients",
            headerName: "Clientes",
            width: 400,
        },
    ];

    async function getDashboard() {
        try {
            const response = await axios.get(
                // `https://piarq.herokuapp.com/usuarios/dashboard`,
                `http://localhost:5000/usuarios/dashboard`,
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                    },
                }
            );
            setClientRows(response.data.clients);
            setProjectRows(response.data.projects);
        } catch (err) {
            toast.error("Erro ao retornar Menu !!!");
        }
    }

    function getSession() {
        setLoading(true);
        const sessionJSON = JSON.parse(window.localStorage.getItem("session"));
        console.log(sessionJSON);
        if (sessionJSON === null) {
            router.push("/");
        } else {
            setSession(sessionJSON);
            getDashboard();
            setLoading(false);
        }
    }

    useEffect(() => {
        getSession();
    }, []);

    return (
        <>
            <NextHead title={"Piarq | Home"} />

            {loading ? (
                <LinearLoading />
            ) : (
                <>
                    <Menu image={null} />

                    <Grid
                        container
                        spacing={1}
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                        wrap="wrap"
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                        >
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                sx={{ height: 280 }}
                            >
                                <Fade in={true} timeout={1500}>
                                    <Typography
                                        variant="body2"
                                        fontSize={40}
                                        fontFamily={"Pacifico"}
                                    >
                                        Olá, {session?.name}
                                    </Typography>
                                </Fade>
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                justifyContent="flex-start"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                spacing={2}
                                style={{ width: "90vw" }}
                            >
                                <Fade in={true} timeout={2500}>
                                    <Grid
                                        container
                                        spacing={1}
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        alignContent="center"
                                        wrap="wrap"
                                    >
                                        <Typography
                                            variant="button"
                                            fontWeight="bold"
                                            fontSize={16}
                                            style={{ marginLeft: 25 }}
                                        >
                                            Clientes
                                        </Typography>
                                        <List
                                            columns={clientColumns}
                                            rows={clientRows}
                                        />
                                    </Grid>
                                </Fade>
                                <Fade in={true} timeout={3500}>
                                    <Grid
                                        container
                                        spacing={1}
                                        direction="row"
                                        justifyContent="flex-start"
                                        alignItems="center"
                                        alignContent="center"
                                        wrap="wrap"
                                    >
                                        <Typography
                                            variant="button"
                                            fontWeight="bold"
                                            fontSize={16}
                                            style={{ marginLeft: 25 }}
                                        >
                                            Projetos
                                        </Typography>
                                        <List
                                            columns={projectColumns}
                                            rows={projectRows}
                                        />
                                    </Grid>
                                </Fade>
                            </Grid>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
