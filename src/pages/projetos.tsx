import NextHead from "../components/defaultPage/NextHead/index";
import {
  useSession,
  signIn,
  signOut,
  SessionProvider,
  getSession,
} from "next-auth/react";
import { Grid, Typography, Divider, Link, Paper } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import Menu from "../components/defaultPage/Menu";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";

export default function Projetos({}) {
  const router = useRouter();
  const { data: session } = useSession();

  return (
    <>
      <NextHead title="Piarq | Projetos" />
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
            Projetos
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="flex-start"
          alignItems="flex-start"
          alignContent="flex-start"
          wrap="wrap"
          sx={{ width: "95vw" }}
        ></Grid>
      </Grid>
    </>
  );
}

// export async function getServerSideProps(context) {
//   const session = getSession();
// }
