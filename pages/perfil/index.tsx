import NextHead from "../../src/components/defaultPage/NextHead/index";
import { useSession } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";

export default function Perfil({}) {
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        session ? null : router.push("/login");
    }, [session]);

    return (
        <>
            <NextHead title="Piarq | Perfil" />
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
                        Perfil
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    alignContent="flex-start"
                    wrap="wrap"
                    sx={{ width: "95vw" }}
                ></Grid>
            </Grid>
        </>
    );
}
