import Head from "next/head";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { Grid, Typography, Divider, Link, Paper } from "@mui/material";
import { Form } from "@unform/web";
import { useRef, useEffect, useState } from "react";
import Input from "../components/Unform/Input";
import CustomCheckbox from "../components/Checkbox/Controlled";
import Button from "../components/Button";
import NextHead from "../components/defaultPage/NextHead/index";
import { toast } from "react-toastify";

export default function Cadastro({}) {
  const { data: session } = useSession();
  const form = useRef(null);
  function HandleSubmit(e) {
    console.log(e);
    toast.success("Usuario Cadastrado com sucesso !!!");
  }

  useEffect(() => {
    console.log(session);
  }, [session]);
  return (
    <>
      <NextHead title="Piarq | Cadastro" />
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
          style={{ textShadow: "4px 4px #D3D9D3" }}
        >
          <Typography
            variant="title"
            fontFamily={"Pacifico"}
            fontSize={60}
            color="#E9ECE9"
          >
            {" "}
            Cadastro{" "}
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
              width: "80vw",
              maxWidth: "450px",
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
            >
              <Input
                label="Nome Completo"
                cor="#ffba08"
                fullWidth={true}
                name="fullName"
              />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              wrap="wrap"
            >
              <Input label="Email" cor="#ffba08" fullWidth name="email" />
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              alignContent="center"
              wrap="wrap"
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
            >
              <CustomCheckbox name="termsAgreed" cor="#ffba08" />
              <Typography variant="body2" fontSize={12} fontWeight="bold">
                Concordo Com os termos de Privacidade e de Uso do software Piarq
              </Typography>
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
                fullWidth
                style={{
                  padding: "15px",
                  borderRadius: "10px",
                }}
              >
                Cadastrar Usuario
              </Button>
            </Grid>
          </Form>
        </Grid>
      </Grid>
    </>
  );
}
