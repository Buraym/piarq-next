import NextHead from "../components/defaultPage/NextHead/index";
import { useSession, signIn, signOut } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import Menu from "../components/defaultPage/Menu";
import { useRouter } from "next/router";
import CardCliente from "../components/Cliente/Card";

export default function Projetos({}) {
  const router = useRouter();
  const { id } = router.query;
  const { data: session } = useSession();

  return (
    <>
      <NextHead title="Piarq | Clientes" />
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
          <Typography variant="title" fontFamily={"Pacifico"} fontSize={60}>
            {"Cliente "}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
          wrap="wrap"
          sx={{ width: "90vw", height: "100%" }}
        ></Grid>
      </Grid>
    </>
  );
}
