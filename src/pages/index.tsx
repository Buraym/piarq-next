import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Typography, Divider, Link, Paper } from "@mui/material";
import { Form } from "@unform/web";
import { useRef, useEffect, useState } from "react";
import Input from "../components/Unform/Input";
import CustomCheckbox from "../components/Checkbox/Controlled/";
import Button from "../components/Button";
import NextHead from "../components/defaultPage/NextHead/index";
import GoogleIcon from "@mui/icons-material/Google";
import Menu from "../components/defaultPage/Menu";
import { ToastContainer } from "react-toastify";

export default function Index() {
  const { data: session } = useSession();
  const form = useRef(null);
  const router = useRouter();

  function HandleSubmit(e) {
    console.log(e);
  }

  useEffect(() => {
    session ? null : router.push("/");
  }, [session]);

  return (
    <>
      <NextHead title={session ? "Piarq | Home" : "Piarq | Login"} />
      {session ? (
        <>
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
            <ToastContainer
              style={{
                background: "#f8ffe5 !important",
                color: "white !important",
                fontWeight: "bold",
              }}
              position="top-right"
            />
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
                <Typography
                  variant="body2"
                  fontSize={60}
                  fontFamily={"Pacifico"}
                >
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
      ) : (
        <Grid
          container
          direction="column"
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
            sx={{ width: 280, height: 280 }}
            style={{ textShadow: "4px 4px #ffb703" }}
          >
            <Typography fontFamily={"Pacifico"} fontSize={60} color="#fb5607">
              Piarq
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
            <Form
              ref={form}
              onSubmit={HandleSubmit}
              style={{
                display: "flex",
                width: 280,
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
                sx={{ width: 280 }}
              >
                <Input
                  label="Login"
                  cor="#ffba08"
                  fullWidth={true}
                  name="login"
                />
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                wrap="wrap"
                sx={{ width: 280 }}
              >
                <Input label="Senha" cor="#ffba08" fullWidth name="password" />
              </Grid>
              <Grid
                container
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                alignContent="center"
                wrap="wrap"
                sx={{ width: 280 }}
              >
                <Grid
                  container
                  direction="row"
                  justifyContent="space-evenly"
                  alignItems="center"
                  alignContent="center"
                  wrap="wrap"
                  sx={{ width: 125 }}
                >
                  <CustomCheckbox
                    label="Continuar Logado"
                    name="continueLogged"
                    cor="#ffba08"
                    checked={false}
                  />
                  <Typography variant="body2" fontSize={12}>
                    Lembrar-me ?
                  </Typography>
                </Grid>
                <Divider
                  orientation="vertical"
                  flexItem
                  style={{ marginLeft: "15px" }}
                  color="#ffba08"
                />
                <Grid
                  container
                  direction="row"
                  justifyContent="flex-start"
                  alignItems="center"
                  alignContent="flex-start"
                  wrap="wrap"
                  sx={{ width: 135, paddingLeft: "15px" }}
                >
                  {/* <Typography variant="body2" fontSize={12} fontWeight="bold">Redefinir senha ?</Typography> */}
                  <Link
                    href="#"
                    variant="body2"
                    fontSize={12}
                    fontWeight="bold"
                    color={"#ffba08"}
                    underline="hover"
                  >
                    Redefinir senha ?
                  </Link>
                  <Link
                    href="/cadastro"
                    variant="body2"
                    fontSize={12}
                    fontWeight="bold"
                    color={"#ffba08"}
                    underline="hover"
                  >
                    Criar conta ?
                  </Link>
                  {/* <Typography variant="body2" fontSize={12} fontWeight="bold" onClick={() => navigate("/cadastro")}>Criar conta ?</Typography> */}
                </Grid>
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
                  onClick={() => form.current.submitForm()}
                  cor="#ffba08"
                  style={{
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    signIn("google", { callbackUrl: "https://localhost:3000" })
                  }
                  cor="#ffba08"
                  style={{
                    padding: "20px",
                    borderRadius: "10px",
                  }}
                >
                  <GoogleIcon />
                </Button>
              </Grid>
            </Form>
          </Grid>
        </Grid>
      )}
    </>
  );
}
