import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import NextHead from "../../src/components/defaultPage/NextHead";
import Menu from "../../src/components/defaultPage/Menu";
import { ToastContainer } from "react-toastify";

export default function Index() {
  const { data: session } = useSession();
  const router = useRouter();

  function HandleSubmit(e) {
    console.log(e);
  }

  useEffect(() => {
    session ? null : router.push("/login");
  }, [session]);

  return (
    <>
      <NextHead title={"Piarq | Home"} />
      <Menu image={session?.user?.image} />

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
