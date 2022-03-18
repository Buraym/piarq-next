import NextHead from "../../src/components/defaultPage/NextHead";
import { useSession } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import { useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import CardObra from "../../src/components/Obra/Card";
import { projetos } from "../../testdata";

export default function Projetos({}) {
    const router = useRouter();
    const { data: session } = useSession();
    const [listaObras, setListaObras] = useState(projetos);

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
                    {listaObras.map((item) => (
                        <CardObra data={item} />
                    ))}
                </Grid>
            </Grid>
        </>
    );
}
