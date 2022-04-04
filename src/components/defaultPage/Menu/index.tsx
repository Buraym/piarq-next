import { Paper, Avatar } from "@mui/material";
import { signOut } from "next-auth/react";
import Button from "../../Button";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import AccountBalance from "@mui/icons-material/AccountBalance";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import { useState } from "react";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

interface Params {
    image: string;
}

export default function Menu({ image }: Params) {
    const [open, setOpen] = useState(false);
    const router = useRouter();

    function HandleLogOut() {
        signOut({ redirect: false });
        router.push("/login");
        // toast("🦄 Wow so easy!", {
        //   closeOnClick: false,
        //   toastId: "my_toast",
        //   autoClose: 5000,
        //   closeButton: false,
        // });]
    }

    return (
        <Paper
            elevation={4}
            style={{
                display: "flex",
                position: "absolute",
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
                        f={() => router.push("/")}
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
                        <AccountBalance fontSize="medium" />
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
