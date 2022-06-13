import NextHead from "../../src/components/defaultPage/NextHead/index";
import { Grid, Typography, TextField, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

export default function Perfil({}) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [profile, setProfile] = useState(null);

    async function getProfile() {
        try {
        } catch (err) {}
        const res = await fetch(`/api/user/profile/${router.query.id}`);
        const profile = await res.json();
        setProfile(profile);
    }

    async function getSession() {
        const sessionJSON = JSON.parse(window.localStorage.getItem("session"));
        setSession(sessionJSON);
        if (sessionJSON) {
            setLoading(false);
        } else {
            router.push("/");
        }
    }

    useEffect(() => {
        getSession();
    }, []);

    return (
        <>
            <NextHead title="Piarq | Perfil" />
            <Menu image={session?.user?.image} />
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
                >
                    <Typography fontFamily={"Pacifico"} fontSize={60}>
                        Perfil
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                    sx={{ width: "95vw" }}
                >
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                        wrap="wrap"
                    >
                        <Avatar
                            src={profile?.image}
                            sx={{ width: 70, height: 70 }}
                        />
                    </Grid>
                    <TextField
                        variant="outlined"
                        label="Nome Completo"
                        value={profile?.confirmNewPassword}
                        onChange={(ev) =>
                            setProfile({
                                ...profile,
                                name: ev.target.value,
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
                    <TextField
                        variant="outlined"
                        label="Email"
                        value={profile?.email}
                        onChange={(ev) =>
                            setProfile({
                                ...profile,
                                email: ev.target.value,
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
                    <TextField
                        variant="outlined"
                        label="Credencial (CPF)"
                        value={profile?.credentials}
                        onChange={(ev) =>
                            setProfile({
                                ...profile,
                                credentials: ev.target.value,
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
                    <TextField
                        variant="outlined"
                        label="Credencial (CNPJ)"
                        value={profile?.confirmNewPassword}
                        onChange={(ev) =>
                            setProfile({
                                ...profile,
                                name: ev.target.value,
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
                </Grid>
            </Grid>
        </>
    );
}
