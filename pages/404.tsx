import { Grid, Typography, Fade } from "@mui/material";
import { useRouter } from "next/router";
import NextHead from "../src/components/defaultPage/NextHead";

export default function Custom404() {
    const router = useRouter();
    return (
        <>
            <NextHead title={"Piarq | Home"} />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                wrap="wrap"
                sx={{ height: "100vh" }}
            >
                <Fade in={true} timeout={1500}>
                    <Typography fontSize={30} fontFamily={"Pacifico"}>
                        Desculpe, página não foi encontrada !
                    </Typography>
                </Fade>
                <Fade in={true} timeout={1500}>
                    <Typography
                        fontSize={30}
                        fontFamily={"Pacifico"}
                        onClick={() => router.push("/")}
                    >
                        &larr;
                    </Typography>
                </Fade>
            </Grid>
        </>
    );
}
