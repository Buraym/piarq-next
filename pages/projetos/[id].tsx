import NextHead from "../../src/components/defaultPage/NextHead";
import { useSession } from "next-auth/react";
import { Grid, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import axios from "axios";
import LinearLoading from "../../src/components/LinearLoading";
import { projetos } from "../../testdata";
import ImageFrame from "../../src/components/ImageFrame";
import Clientes from "../clientes/index";

export default function Projeto({ projeto }) {
    const [clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    // async function GetClientes(id) {
    //     try {
    //         setLoading(true);
    //         const response = await axios.get(
    //             "http://localhost:3000/pages/api/ListaClientesId",
    //             { params: projetos.clients }
    //         );
    //         setClientes(response.data);
    //         console.log(response.data);
    //         setLoading(false);
    //     } catch (err) {
    //         console.log(err);
    //         setLoading(false);
    //     }
    // }

    // async function GetObra(id) {
    //     try {
    //         setLoading(true);
    //         const response = await axios.get(
    //             "http://localhost:3000/pages/api/projeto/" + id
    //         );
    //         setObra(response.data);
    //         console.log(response.data);
    //         setLoading(false);
    //     } catch (err) {
    //         console.log(err);
    //         setLoading(false);
    //     }
    // }

    // useEffect(() => {
    //     // const { pid } = router.query;
    //     // GetObra(pid);
    // }, []);
    return (
        <>
            <NextHead title="Piarq | Projetos" />
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
                        <>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                sx={{ width: 280, height: 280 }}
                            >
                                <Typography
                                    fontFamily={"Pacifico"}
                                    fontSize={50}
                                >
                                    {projeto.name}
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
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="center"
                                    alignItems="center"
                                    alignContent="center"
                                    wrap="wrap"
                                    xs={12}
                                    md={9}
                                >
                                    <ImageFrame
                                        src={projeto.image}
                                        alt="Imagem do Projetos"
                                    />
                                </Grid>
                                <Grid
                                    container
                                    direction="column"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    alignContent="flex-start"
                                    wrap="wrap"
                                    xs={12}
                                    md={3}
                                >
                                    <Paper
                                        sx={{ padding: "10px" }}
                                        variant="outlined"
                                    >
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            alignContent="center"
                                            wrap="wrap"
                                        >
                                            Nome: {projeto.name}
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            alignContent="center"
                                            wrap="wrap"
                                        >
                                            Endereço: {projeto.address}
                                        </Grid>
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="center"
                                            alignItems="center"
                                            alignContent="center"
                                            wrap="wrap"
                                        >
                                            Descrição: {projeto.description}
                                        </Grid>
                                    </Paper>
                                </Grid>
                            </Grid>
                        </>
                    </Grid>
                </>
            )}
        </>
    );
}

export async function getServerSideProps({ query }) {
    const queryId = query.id;
    try {
        const projeto = projetos.map((projeto) => (projeto.id = queryId));
        return {
            props: { projeto: projeto },
        };
    } catch (err) {
        console.error(err);
    }
}
