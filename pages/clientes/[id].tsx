import NextHead from "../../src/components/defaultPage/NextHead";
import { useSession } from "next-auth/react";
import { Grid, Typography, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import ImageFrame from "../../src/components/ImageFrame";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import { clientes } from "../../testdata";

export default function Projetos({ cliente }) {
    const [projetos, setProjetos] = useState([]);
    const router = useRouter();
    const { data: session } = useSession();

    // async function GetClient(id) {
    //     try {
    //     } catch (err) {
    //         console.log("ERR: " + err.message);
    //     }
    // }

    useEffect(() => {}, []);

    return (
        <>
            <NextHead title="Piarq | Clientes" />
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
                        {cliente.name}
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
                            src={cliente.image}
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
                        <Paper sx={{ padding: "10px" }} variant="outlined">
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                            >
                                Nome: {cliente.name}
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                            >
                                Documento: {cliente.address}
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                            >
                                Documento: {cliente.contact}
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                            >
                                Descrição: {cliente.description}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
}

export async function getServerSideProps({ query }) {
    const queryId = query.id;
    try {
        const cliente = clientes.map((cliente) => (cliente.id = queryId));
        return {
            props: { cliente },
        };
    } catch (err) {
        console.error(err);
    }
}
