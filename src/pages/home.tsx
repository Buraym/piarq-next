import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import NextHead from "../components/defaultPage/NextHead";
import Button from "../components/Button";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import Slider from "../components/defaultPage/Slider";

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
        sx={{
          position: "absolute",
          left: "7px",
          top: "7px",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <MenuIcon fontSize="medium" />
      </Button>
      <Slider
        open={open}
        trogle={() => setOpen(!open)}
        username={session?.user?.name}
        photo={session?.user?.image}
      />
      {/* <Button
        variant="text"
        onClick={() => setOpen(!open)}
        cor="#ffba08"
        sx={{
          position: "absolute",
          right: "7px",
          top: "7px",
          padding: "20px",
        }}
      >
        <ExitToAppIcon fontSize="medium" />
      </Button> */}

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
