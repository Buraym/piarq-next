import { useSession, signIn, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Typography, Divider, Link } from "@mui/material";
import { Form } from "@unform/web";
import { useRef, useEffect, useState } from "react";
import Input from "../src/components/Unform/Input";
import CustomCheckbox from "../src/components/Checkbox/Controlled/";
import Button from "../src/components/Button";
import NextHead from "../src/components/defaultPage/NextHead/index";
import GoogleIcon from "@mui/icons-material/Google";
import LinearLoading from "../src/components/LinearLoading";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

export default function Login({ session }) {
    const [loading, setLoading] = useState(false);
    const form = useRef(null);
    const router = useRouter();
    // const { data: session } = useSession();

    async function HandleSubmit(formData) {
        if (formData.termsAgreed) {
            try {
                const response = await axios.post(
                    "http://localhost:5000/auth/register",
                    formData
                );
                toast.success(response.data.message, {
                    toastId: "0283028",
                });
            } catch (error) {
                toast.error("Houve um erro ao tentar realizar o cadastro !!!", {
                    toastId: "0283028",
                });
            }
        } else {
            toast.error("Você precisa aceitar os termos de uso !!!", {
                toastId: "0283028",
            });
        }
    }

    useEffect(() => {
        session ? router.push("/home") : setLoading(false);
    }, [session]);

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
                        <ToastContainer autoClose={2000} />
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
                                    <CustomCheckbox name="continueLogged" />
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
                                    f={
                                        () => signIn("google")
                                        // "google"
                                        // // , {
                                        // //     callbackUrl:
                                        // //         // "http://localhost:3000/",
                                        // //     // process.env.NEXTAUTH_URL,
                                        // // }
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

export async function getServerSideProps({ context }) {
    try {
        const session = await getSession();
        if (session) {
            return {
                props: { session },
            };
        }
        return {
            props: { session: null },
        };
    } catch (err) {
        console.error(`ERRO DE CONEXÂO: ${err}`);
    }
}
