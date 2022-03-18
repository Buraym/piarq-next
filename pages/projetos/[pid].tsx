import NextHead from "../../src/components/defaultPage/NextHead";
import { useSession, signIn, signOut } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import axios from "axios";

export default function Projeto({}) {
    const [obra, setObra] = useState(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    async function GetObra(id) {
        try {
            setLoading(true);
            const response = await axios.get(
                "http://localhost:3000/pages/api/projeto/" + id
            );
            setObra(response.data);
            console.log(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    useEffect(() => {
        const { pid } = router.query;
        GetObra(pid);
    }, []);
    return (
        <>
            <NextHead title="Piarq | Projetos" />
            <Menu image={session?.user?.image} />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
            >
                {obra ? (
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
                            <Typography fontFamily={"Pacifico"} fontSize={60}>
                                Projeto
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
                        ></Grid>
                    </>
                ) : (
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                        wrap="wrap"
                        sx={{ width: "80%", height: 280 }}
                    >
                        <Typography fontFamily={"Pacifico"} fontSize={40}>
                            Projeto não foi Encontrado
                        </Typography>
                    </Grid>
                )}
            </Grid>
        </>
    );
}
