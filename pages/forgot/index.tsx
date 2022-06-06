import { useRouter } from "next/router";
import { Grid, Typography, IconButton, TextField } from "@mui/material";
import NextHead from "../../src/components/defaultPage/NextHead/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { Send } from "@mui/icons-material";
import axios from "axios";
import Button from "@mui/material/Button";

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [form, setForm] = useState({
        email: "",
        code: "",
        newPassword: "",
        confirmNewPassword: "",
    });
    const [step, setStep] = useState(0);

    const [loading, setLoading] = useState(false);

    async function HandleSendEmail() {
        if (form.email !== "") {
            try {
                setLoading(true);
                await axios.post(
                    // "http://localhost:5000/auth/forgot"
                    "https://piarq-next.herokuapp.com/auth/redefine",
                    form
                );
                setStep(1);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        } else {
            toast.error("Preencha o campo email");
        }
    }

    async function HandleSendCode() {
        try {
            setLoading(true);
            const response = await axios.post(
                // "http://localhost:5000/auth/verify",
                "https://piarq-next.herokuapp.com/auth/verify",
                form
            );
            toast.success(response.data.message);
            setStep(2);
        } catch (err) {
            console.log(err);
            toast.error("Código Inválido");
        }
    }

    async function HandleChangePassword() {
        console.log(form);
        if (form.newPassword !== form.confirmNewPassword) {
            try {
                setLoading(true);
                const response = await axios.post(
                    // "http://localhost:5000/auth/redefine",
                    "https://piarq-next.herokuapp.com/auth/redefine",
                    form
                );
                toast.success(response.data.message);
                setStep(0);
                router.push("/");
            } catch (err) {
                console.log(err);
                toast.error("Código Inválido");
            }
        } else {
            toast.error("As senhas não são iguais !!!");
        }
    }

    console.log(form);
    return (
        <>
            <NextHead title={"Piarq | Esqueceu senha"} />
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
                    sx={{ width: "70vw", height: 280 }}
                >
                    <Typography
                        fontFamily={"Pacifico"}
                        fontSize={60}
                        textAlign={"center"}
                    >
                        Esqueceu sua senha ?
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
                        width: "70vw",
                        maxWidth: "500px",
                        height: 320,
                        justifyContent: "space-evenly",
                        flexDirection: "column",
                        alignContent: "center",
                        alignItems: "center",
                    }}
                >
                    {step === 0 || step === 1 ? (
                        <TextField
                            variant="outlined"
                            label="Coloque o E-mail da sua conta"
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
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => HandleSendEmail()}
                                        style={{ color: "#ffba08" }}
                                    >
                                        <Send />
                                    </IconButton>
                                ),
                            }}
                        />
                    ) : (
                        <></>
                    )}

                    {step === 1 && (
                        <TextField
                            variant="outlined"
                            label="Digite o código que foi enviado para o seu"
                            value={form.code}
                            fullWidth
                            onChange={(ev) =>
                                setForm({
                                    ...form,
                                    code: ev?.target?.value,
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
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        onClick={() => HandleSendCode()}
                                        style={{ color: "#ffba08" }}
                                    >
                                        <Send />
                                    </IconButton>
                                ),
                            }}
                        />
                    )}
                    {step === 2 && (
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                        >
                            <TextField
                                variant="outlined"
                                label="Sua nova senha"
                                value={form.newPassword}
                                fullWidth
                                onChange={(ev) =>
                                    setForm({
                                        ...form,
                                        newPassword: ev.target.value,
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
                            <TextField
                                variant="outlined"
                                label="Confirme sua nova senha"
                                value={form.confirmNewPassword}
                                fullWidth
                                onChange={(ev) =>
                                    setForm({
                                        ...form,
                                        confirmNewPassword: ev.target.value,
                                    })
                                }
                                sx={{
                                    marginTop: 2,
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
                            {loading && (
                                <Button
                                    onClick={() => HandleChangePassword()}
                                    style={{
                                        backgroundColor: "#ffba08",
                                        color: "white",
                                        fontWeight: "bold",
                                        marginTop: 15,
                                    }}
                                >
                                    Redefinir Senha
                                </Button>
                            )}
                        </Grid>
                    )}

                    {/* <Button onClick={() => HandleConfig()}>TESTE CONFIG</Button> */}
                </Grid>
            </Grid>
        </>
    );
}
