import { useSession, getSession } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import { Form } from "@unform/web";
import { useRef, useEffect } from "react";
import Input from "../../src/components/Unform/Input";
import CustomCheckbox from "../../src/components/Checkbox/Controlled";
import Button from "../../src/components/Button";
import NextHead from "../../src/components/defaultPage/NextHead";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Cadastro({}) {
    const { data: session } = useSession();
    const form = useRef(null);

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

    return (
        <>
            <NextHead title="Piarq | Cadastro" />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
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
                    >
                        Cadastro
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
                            width: "80vw",
                            maxWidth: "450px",
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
                        >
                            <Input
                                label="Nome Completo"
                                cor="#ffba08"
                                fullWidth={true}
                                name="username"
                                required
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                        >
                            <Input
                                label="Email"
                                cor="#ffba08"
                                fullWidth
                                name="email"
                                required
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                        >
                            <Input
                                label="Senha"
                                cor="#ffba08"
                                fullWidth
                                name="password"
                                required
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            alignContent="center"
                            wrap="nowrap"
                        >
                            <CustomCheckbox name="termsAgreed" />
                            <Typography
                                variant="body2"
                                fontSize={12}
                                fontWeight="bold"
                            >
                                Concordo com os termos de Privacidade e de Uso
                                do software Piarq
                            </Typography>
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
                                cor="#ffba08"
                                fullWidth={true}
                            >
                                <Typography fontWeight="bolder" color="#ffba08">
                                    Cadastrar Usuario
                                </Typography>
                            </Button>
                        </Grid>
                    </Form>
                </Grid>
            </Grid>
        </>
    );
}

export async function getServerSideProps({ context }) {
    try {
        const session = await getSession(context);
        return {
            props: { session },
        };
    } catch (err) {
        console.error(err);
    }
}
