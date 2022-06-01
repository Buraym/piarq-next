import { useRouter } from "next/router";
import {
    Grid,
    Typography,
    Divider,
    Link,
    IconButton,
    TextField,
    Checkbox,
} from "@mui/material";
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
import CustomUncontrolledInput from "../src/components/Input/index";

export default function Login({ session }) {
    const [loading, setLoading] = useState(false);
    const [loadingRequest, setLoadingRequest] = useState(false);
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [form, setForm] = useState({
        email: "",
        password: "",
        remember: false,
    });
    const router = useRouter();

    async function HandleSubmit() {
        try {
            setLoadingRequest(true);
            const response = await axios.post(
                "https://piarq.herokuapp.com/auth/login",
                // "http://localhost:5000/auth/login",
                form
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
                        sx={{
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
                            <TextField
                                variant="outlined"
                                label="Login"
                                value={form.email}
                                fullWidth
                                onChange={(ev) =>
                                    setForm({
                                        ...form,
                                        email: ev?.target?.value,
                                    })
                                }
                                sx={{
                                    "& label.Mui-focused": {
                                        color: "#ffba08",
                                    },
                                    "& .MuiInput-underline:after": {
                                        borderBottomColor: "#ffba08",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#ffba08",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#ffba08",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#ffba08",
                                        },
                                    },
                                }}
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
                            <TextField
                                variant="outlined"
                                label="Senha"
                                value={form.password}
                                type={passwordVisible ? "text" : "password"}
                                onChange={(ev) =>
                                    setForm({
                                        ...form,
                                        password: ev?.target?.value,
                                    })
                                }
                                fullWidth
                                InputProps={{
                                    endAdornment: (
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
                                    ),
                                }}
                                sx={{
                                    "& label.Mui-focused": {
                                        color: "#ffba08",
                                    },
                                    "& .MuiInput-underline:after": {
                                        borderBottomColor: "#ffba08",
                                    },
                                    "& .MuiOutlinedInput-root": {
                                        "& fieldset": {
                                            borderColor: "#ffba08",
                                        },
                                        "&:hover fieldset": {
                                            borderColor: "#ffba08",
                                        },
                                        "&.Mui-focused fieldset": {
                                            borderColor: "#ffba08",
                                        },
                                    },
                                }}
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            sx={{ width: 300 }}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="space-evenly"
                                alignItems="center"
                                alignContent="center"
                                wrap="nowrap"
                                sx={{ width: 120 }}
                            >
                                <Checkbox
                                    value={form.remember}
                                    onChange={() =>
                                        setForm({
                                            ...form,
                                            remember: !form.remember,
                                        })
                                    }
                                    style={{ color: "#ffba08" }}
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
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="flex-start"
                                wrap="nowrap"
                                sx={{ width: 155, paddingLeft: "15px" }}
                            >
                                <Link
                                    href="/forgot"
                                    variant="body2"
                                    fontSize={12}
                                    fontWeight="bold"
                                    color={"#ffba08"}
                                    underline="hover"
                                >
                                    Esqueceu sua senha ?
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
                                    cor="#ffba08"
                                    f={() => HandleSubmit()}
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
