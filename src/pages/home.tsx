import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Grid, Typography, Paper } from "@mui/material";
import NextHead from "../components/defaultPage/NextHead";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToApp from "@mui/icons-material/ExitToApp";
import AccountBalance from "@mui/icons-material/AccountBalance";

export default function Home({}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!session) {
      router.push("/");
    }
  }, [session]);

  return (
    <>
      <NextHead title="Piarq | Home" />

      <Button
        variant="contained"
        onClick={() => setOpen(!open)}
        cor="#ffba08"
        style={{
          position: "absolute",
          left: "7px",
          top: "7px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <MenuIcon fontSize="medium" />
      </Button>
      <Button
        variant="contained"
        onClick={() => setOpen(!open)}
        cor="#ffba08"
        style={{
          position: "absolute",
          right: "7px",
          top: "7px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <ExitToAppIcon fontSize="medium" />
      </Button>

      {open ? (
        <Paper
          elevation={2}
          style={{
            display: "flex",
            position: "absolute",
            left: "7px",
            top: "150px",
            width: "65px",
            borderRadius: "10px",
            flexDirection: "column",
          }}
        >
          <Button
            variant="text"
            onClick={() => setOpen(!open)}
            cor="#ffba08"
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
            onClick={() => setOpen(!open)}
            cor="#ffba08"
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
            onClick={() => setOpen(!open)}
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
            onClick={() => setOpen(!open)}
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
        </Paper>
      ) : (
        <></>
      )}

      <Grid
        container
        spacing={1}
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
      >
        <Grid
          container
          direction="row"
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
            sx={{ height: 280 }}
          >
            <Typography variant="body2" fontSize={60} fontFamily={"Pacifico"}>
              {" "}
              Olá, {session?.user?.name}
            </Typography>
          </Grid>
          <Grid
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
          ></Grid>
        </Grid>
      </Grid>
    </>
  );
}
