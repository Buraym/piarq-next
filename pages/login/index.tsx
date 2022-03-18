import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Typography, Divider, Link } from "@mui/material";
import { Form } from "@unform/web";
import { useRef, useEffect, useState } from "react";
import Input from "../../src/components/Unform/Input";
import CustomCheckbox from "../../src/components/Checkbox/Controlled/";
import Button from "../../src/components/Button";
import NextHead from "../../src/components/defaultPage/NextHead/index";
import GoogleIcon from "@mui/icons-material/Google";
import LinearLoading from "../../src/components/LinearLoading";

export default function Index() {
    const { data: session, status } = useSession({ required: true });
    const [loading, setLoading] = useState(true);
    const form = useRef(null);
    const router = useRouter();

    function HandleSubmit(e) {
        console.log(e);
    }

    useEffect(() => {
        status === "loading"
            ? null
            : status === "authenticated"
            ? router.push("/home")
            : setLoading(false);
    }, []);

    return (
        <>
            <NextHead title={"Piarq | Login"} />
            {loading ? (
                <LinearLoading />
            ) : (
                <Grid
                    container
                    direction="column"
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
                        sx={{ width: 280, height: 280 }}
                        style={{ textShadow: "4px 4px #ffb703" }}
                    >
                        <Typography
                            fontFamily={"Pacifico"}
                            fontSize={60}
                            color="#fb5607"
                            textAlign={"center"}
                        >
                            Piarq
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="center"
                        alignContent="center"
                        wrap="wrap"
                        sx={{ width: 280, height: 320 }}
                    >
                        <Form
                            ref={form}
                            onSubmit={HandleSubmit}
                            style={{
                                display: "flex",
                                width: 280,
                                height: 320,
                                justifyContent: "space-evenly",
                                flexDirection: "column",
                                alignContent: "center",
                                alignItems: "center",
                            }}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                sx={{ width: 280 }}
                            >
                                <Input
                                    label="Login"
                                    cor="#ffba08"
                                    fullWidth={true}
                                    name="login"
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                sx={{ width: 280 }}
                            >
                                <Input
                                    label="Senha"
                                    cor="#ffba08"
                                    fullWidth
                                    name="password"
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                sx={{ width: 280 }}
                            >
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="space-evenly"
                                    alignItems="center"
                                    alignContent="center"
                                    wrap="wrap"
                                    sx={{ width: 125 }}
                                >
                                    <CustomCheckbox
                                        name="continueLogged"
                                        checked={false}
                                    />
                                    <Typography variant="body2" fontSize={12}>
                                        Lembrar-me ?
                                    </Typography>
                                </Grid>
                                <Divider
                                    orientation="vertical"
                                    flexItem
                                    style={{ marginLeft: "15px" }}
                                    color="#ffba08"
                                />
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="center"
                                    alignContent="flex-start"
                                    wrap="wrap"
                                    sx={{ width: 135, paddingLeft: "15px" }}
                                >
                                    {/* <Typography variant="body2" fontSize={12} fontWeight="bold">Redefinir senha ?</Typography> */}
                                    <Link
                                        href="#"
                                        variant="body2"
                                        fontSize={12}
                                        fontWeight="bold"
                                        color={"#ffba08"}
                                        underline="hover"
                                    >
                                        Redefinir senha ?
                                    </Link>
                                    <Link
                                        href="/cadastro"
                                        variant="body2"
                                        fontSize={12}
                                        fontWeight="bold"
                                        color={"#ffba08"}
                                        underline="hover"
                                    >
                                        Criar conta ?
                                    </Link>
                                    {/* <Typography variant="body2" fontSize={12} fontWeight="bold" onClick={() => navigate("/cadastro")}>Criar conta ?</Typography> */}
                                </Grid>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                            >
                                <Button
                                    variant="contained"
                                    type="submit"
                                    f={() => form.current.submitForm()}
                                    cor="#ffba08"
                                >
                                    Login
                                </Button>
                                <Button
                                    variant="contained"
                                    f={() =>
                                        signIn("google", {
                                            callbackUrl:
                                                process.env.PROD_CALLBACK_URL,
                                        })
                                    }
                                    cor="#ffba08"
                                >
                                    <GoogleIcon />
                                </Button>
                            </Grid>
                        </Form>
                    </Grid>
                </Grid>
            )}
        </>
    );
}
