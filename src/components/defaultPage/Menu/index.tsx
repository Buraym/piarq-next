import { Paper, Avatar } from "@mui/material";
import Button from "../../Button";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import { useState } from "react";
import { useRouter } from "next/router";

interface Params {
    image: string;
}

export default function Menu({ image }: Params) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    function HandleLogOut() {
        window.localStorage.removeItem("session");
        // signOut({ redirect: false });
        router.push("/");
    }

    return (
        <Paper
            elevation={4}
            style={{
                display: "flex",
                position: "absolute",
                zIndex: 999,
                flexDirection: "column",
                left: "7px",
                top: "7px",
                borderRadius: "10px",
            }}
        >
            <Button
                variant="text"
                f={() => setOpen(!open)}
                cor="#ffba08"
                style={{
                    padding: "20px",
                    borderRadius: "10px",
                }}
            >
                <MenuIcon fontSize="medium" />
            </Button>
            {open ? (
                <>
                    <Button
                        variant="text"
                        cor="#ffba08"
                        style={{
                            padding: "20px",
                            borderTop: "5px",
                            borderBottom: "5px",
                            borderRadius: "10px",
                        }}
                        f={() => router.push("/perfil")}
                    >
                        <Avatar src={image} sx={{ width: 30, height: 30 }} />
                    </Button>
                    <Button
                        variant="text"
                        cor="#ffba08"
                        f={() => router.push("/home")}
                        style={{
                            padding: "20px",
                            borderTop: "5px",
                            borderBottom: "5px",
                            borderRadius: "10px",
                        }}
                    >
                        <DashboardIcon fontSize="medium" />
                    </Button>
                    <Button
                        variant="text"
                        cor="#ffba08"
                        f={() => router.push("/clientes")}
                        style={{
                            padding: "20px",
                            borderTop: "5px",
                            borderBottom: "5px",
                            borderRadius: "10px",
                        }}
                    >
                        <PersonOutlineIcon fontSize="medium" />
                    </Button>
                    <Button
                        variant="text"
                        cor="#ffba08"
                        f={() => router.push("/projetos")}
                        style={{
                            padding: "20px",
                            borderTop: "5px",
                            borderBottom: "5px",
                            borderRadius: "10px",
                        }}
                    >
                        <HistoryEduIcon fontSize="medium" />
                    </Button>
                    <Button
                        variant="text"
                        cor="#ffba08"
                        style={{
                            padding: "20px",
                            borderTop: "5px",
                            borderBottom: "5px",
                            borderRadius: "10px",
                        }}
                    >
                        <SettingsIcon fontSize="medium" />
                    </Button>
                    <Button
                        variant="text"
                        f={() => HandleLogOut()}
                        cor="#ffba08"
                        style={{
                            padding: "20px",
                            borderTop: "5px",
                            borderBottom: "5px",
                            borderRadius: "10px",
                        }}
                    >
                        <ExitToAppIcon fontSize="medium" />
                    </Button>
                </>
            ) : (
                <></>
            )}
        </Paper>
    );
}
