import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import NextHead from "../../src/components/defaultPage/NextHead";
import Menu from "../../src/components/defaultPage/Menu";
import { ToastContainer } from "react-toastify";

export default function Index({ auth }) {
    const router = useRouter();

    function HandleSubmit(e) {
        console.log(e);
    }

    useEffect(() => {
        !auth ? null : router.push("/login");
    }, [auth]);

    return (
        <>
            <NextHead title={"Piarq | Home"} />
            <Menu image={auth?.user?.image} />

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
                        <Typography
                            variant="body2"
                            fontSize={60}
                            fontFamily={"Pacifico"}
                        >
                            {" "}
                            Olá, {session?.user?.name}
                        </Typography>
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
    );
}

export async function getStaticProps(context) {
    try {
        const session = await getSession(context);
        var auth = false;
        session ? (auth = session) : (auth = false);
        return {
            props: { auth },
        };
    } catch (err) {
        console.error(err);
    }
}
