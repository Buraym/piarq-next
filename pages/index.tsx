import { useRouter } from "next/router";
import { Grid, Typography, Divider, Link, IconButton } from "@mui/material";
import { Form } from "@unform/web";
import { useRef, useEffect, useState } from "react";
import Input from "../src/components/Unform/Input";
import CustomCheckbox from "../src/components/Checkbox/Controlled/";
import Button from "../src/components/Button";
import NextHead from "../src/components/defaultPage/NextHead/index";
import GoogleIcon from "@mui/icons-material/Google";
import LinearLoading from "../src/components/LinearLoading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Visibility } from "@mui/icons-material";

export default function Login({ session }) {
    const [loading, setLoading] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const form = useRef(null);
    const router = useRouter();

    async function HandleSubmit(formData) {
        try {
            setLoadingRequest(true);
            const response = await axios.post(
                // "https://piarq.herokuapp.com/auth/login",
                "http://localhost:5000/auth/login",
                formData
            );
            window.localStorage.setItem(
                "session",
                JSON.stringify({
                    token: response.data.accessToken,
                    _id: response.data._id,
                    name: response.data.username,
                    image: response.data.image,
                })
            );
            setLoadingRequest(false);
            router.push("/home");
        } catch (error) {
            console.log(error);
            toast.error("Senha e/ou email errados", {});
            setLoadingRequest(false);
        }
    }

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
                    <ToastContainer autoClose={2000} position={"top-right"} />
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
                                    name="email"
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
                                    type={passwordVisible ? "text" : "password"}
                                    endAction={
                                        <IconButton
                                            onClick={() =>
                                                setPasswordVisible(
                                                    !passwordVisible
                                                )
                                            }
                                            style={{ color: "#ffba08" }}
                                        >
                                            <Visibility />
                                        </IconButton>
                                    }
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
                                {loadingRequest ? (
                                    <LinearLoading />
                                ) : (
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        cor="#ffba08"
                                    >
                                        Login
                                    </Button>
                                )}

                                {/* <Button
                                    variant="contained"
                                    f={() => signIn("google")}
                                    cor="#ffba08"
                                >
                                    <GoogleIcon />
                                </Button> */}
                            </Grid>
                        </Form>
                    </Grid>
                </Grid>
            )}
        </>
    );
}

export function getServerSideProps({ req, res }) {
    console.log(req.header);
    if (req?.cookie?.accessToken && req?.cookie?.accessToken !== "") {
        res.writeHead(302, {
            Location: "/home",
        });
        res.end();
    } else {
        return { props: { session: null } };
    }
}
