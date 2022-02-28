import Head from "next/head";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Typography, Divider, Link } from "@mui/material";
import { Form } from "@unform/web";
import { useRef } from "react";
import Input from "../components/Unform/Input";
import CustomCheckbox from "../components/Checkbox/Controlled/";
import Button from "../components/Button";
import NextHead from "../components/defaultPage/NextHead/index";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  const form = useRef(null);

  function HandleSubmit(e) {
    console.log(e);
  }

  if (session) {
    router.push("/home");
  } else {
    const obj = (
      <>
        <NextHead title="Piarq | Login" />
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
            <Typography
              variant="title"
              fontFamily={"Pacifico"}
              fontSize={60}
              color="#fb5607"
            >
              {" "}
              Piarq{" "}
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
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                wrap="wrap"
                sx={{ width: 135, paddingLeft: "10px" }}
              >
                <Button
                  variant="primary"
                  type="submit"
                  onClick={() => form.current.submitForm()}
                  cor="#ffba08"
                  style={{ padding: "10px" }}
                >
                  Login
                </Button>
              </Grid>
            </Form>
          </Grid>
        </Grid>
      </>
    );
    return obj;
  }
}
