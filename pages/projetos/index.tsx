import NextHead from "../../src/components/defaultPage/NextHead";
import { getSession, useSession } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import CardObra from "../../src/components/Obra/Card";
import { projetos } from "../../testdata";
import LinearLoading from "../../src/components/LinearLoading";
import CardCriarObra from "../../src/components/Obra/CriarObra";

export default function Projetos({ session }) {
    const [loading, setLoading] = useState(true);
    const [listaObras, setListaObras] = useState(projetos);
    const router = useRouter();

    useEffect(() => {
        session ? setLoading(false) : setLoading(false);
    }, [session]);

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
                            <CardCriarObra userEmail={session?.user?.email} />
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}

export async function getServerSideProps({ context }) {
    try {
        const session = await getSession();
        return {
            props: { session },
        };
    } catch (err) {
        console.error(err);
    }
}
