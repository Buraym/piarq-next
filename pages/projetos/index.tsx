import NextHead from "../../src/components/defaultPage/NextHead";
import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import CardObra from "../../src/components/Obra/Card";
import { projetos } from "../../testdata";
import LinearLoading from "../../src/components/LinearLoading";
import CardCriarObra from "../../src/components/Obra/CriarObra";
import { toast } from "react-toastify";
import axios from "axios";

export default function Projetos() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [listaObras, setListaObras] = useState([]);
    const [loadingObras, setLoadingObras] = useState(true);
    const router = useRouter();

    async function GetProjects(session) {
        try {
            setLoadingObras(true);
            const response = await axios.get(
                // "https://piarq.herokuapp.com/projetos/list",
                "http://localhost:5000/projetos/list",
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                    },
                }
            );
            console.log(response.data);
            setListaObras(response.data);
            setLoadingObras(false);
        } catch (err) {
            console.log(err);
            toast.error("Houve um erro ao tentar retornar os clientes !!!");
            setLoadingObras(false);
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
        await GetProjects(sessionJSON);
    }

    useEffect(() => {
        getSession();
    }, []);

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
                                Projetos
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
                            {listaObras.map((item, index) => (
                                <CardObra data={item} key={index} />
                            ))}
                            <CardCriarObra refresh={getSession} />
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
