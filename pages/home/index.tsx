import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import NextHead from "../../src/components/defaultPage/NextHead";
import Menu from "../../src/components/defaultPage/Menu";
import { ToastContainer } from "react-toastify";
import LinearLoading from "../../src/components/LinearLoading";

export default function Index() {
    const router = useRouter();
    const { data: session } = useSession();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        session ? setLoading(false) : router.push("/login");
    }, [session]);

    return (
        <>
            <NextHead title={"Piarq | Home"} />

            {loading ? (
                <LinearLoading />
            ) : (
                <>
                    <Menu image={session?.user?.image} />

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
            )}
        </>
    );
}
