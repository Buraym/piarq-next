import { useRouter } from "next/router";
import { Grid, Typography, Fade } from "@mui/material";
import { useEffect, useState } from "react";
import NextHead from "../../src/components/defaultPage/NextHead";
import Menu from "../../src/components/defaultPage/Menu";
import LinearLoading from "../../src/components/LinearLoading";

export default function Index() {
    const [session, setSession] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    function getSession() {
        setLoading(true);
        const sessionJSON = JSON.parse(window.localStorage.getItem("session"));
        console.log(sessionJSON);
        if (sessionJSON === null) {
            router.push("/");
        } else {
            setSession(sessionJSON);
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
                                        fontSize={60}
                                        fontFamily={"Pacifico"}
                                    >
                                        Olá, {session?.name}
                                    </Typography>
                                </Fade>
                            </Grid>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                            ></Grid>
                        </Grid>
                    </Grid>
                </>
            )}
        </>
    );
}
