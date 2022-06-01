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
import NextHead from "../../src/components/defaultPage/NextHead/index";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LinearLoading from "../../src/components/LinearLoading";
import { useState } from "react";
import { Send } from "@mui/icons-material";
import axios from "axios";

export default function ForgotPasswordPage() {
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
                await axios.post("http://localhost:5000/auth/forgot", form);
                setStep(1);
                setLoading(false);
            } catch (err) {
                setLoading(false);
            }
        } else {
            toast.error("Preencha o campo email");
        }
    }

    async function HandleSendCode() {}

    async function HandleChangePassword() {}

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
                    {step > 0 && (
                        <TextField
                            variant="outlined"
                            label="Digite o código que foi enviado para o seu"
                            value={form.code}
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
                                        onClick={() => setStep(1)}
                                        style={{ color: "#ffba08" }}
                                    >
                                        <Send />
                                    </IconButton>
                                ),
                            }}
                        />
                    )}
                </Grid>
            </Grid>
        </>
    );
}
