import React from "react";
import { slide as Menu } from "react-burger-menu";
import { Grid, Typography, Avatar, Paper } from "@mui/material";
import { useRouter } from "next/router";
import { signOut } from "next-auth/react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import SettingsIcon from "@mui/icons-material/Settings";
import ExitToApp from "@mui/icons-material/ExitToApp";
import AccountBalance from "@mui/icons-material/AccountBalance";
import Button from "../../Button";
import { Router } from "@mui/icons-material";

interface Params {
  open: boolean;
  trogle: Function;
  username: string;
  photo: string;
}

export default function SliderMenu(props) {
  return (
    <Menu
      sx={{
        width: 200,
        height: "100%",
        marginLeft: "50px",
        position: "fixed",
      }}
    >
      <Grid
        container
        direction="column"
        justifyContent="flex-start"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
        sx={{ width: 200, height: 480 }}
      >
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
          sx={{ width: 200, height: 150 }}
        >
          <Avatar alt="Brayan Wilis" />
          {props.name !== null ? (
            <Typography
              className="nome-user"
              style={{ marginLeft: "10px" }}
              fontSize={15}
              fontWeight="bold"
            >
              {props.name}
            </Typography>
          ) : (
            <></>
          )}
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
          sx={{ width: 200, height: 50 }}
        >
          <Link href="/" style={{ textDecoration: "none", color: "lightgray" }}>
            <Typography variant="body2" fontSize={15} fontWeight="bold">
              <DashboardIcon style={{ marginRight: "10px" }} />
              INICIO
            </Typography>
          </Link>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
          sx={{ width: 200, height: 50 }}
        >
          <Link
            href="/obras"
            style={{ textDecoration: "none", color: "lightgray" }}
          >
            <Typography variant="body2" fontSize={15} fontWeight="bold">
              <AccountBalance style={{ marginRight: "10px" }} />
              OBRAS
            </Typography>
          </Link>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="flex-start"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
          sx={{ width: 200, height: 50 }}
        >
          <Link
            href="/config"
            style={{ textDecoration: "none", color: "lightgray" }}
          >
            <Typography variant="body2" fontSize={15} fontWeight="bold">
              <SettingsIcon style={{ marginRight: "10px" }} />
              CONFIGURAÇÕES
            </Typography>
          </Link>
        </Grid>
        <Grid
          container
          spacing={1}
          direction="row"
          justifyContent="flex-start"
          alignItems="baseline"
          alignContent="center"
          wrap="wrap"
          sx={{ width: 200, height: 50 }}
          onClick={() => signOut()}
        >
          <Typography
            variant="body2"
            fontSize={15}
            fontWeight="bold"
            sx={{ color: "lightgray" }}
          >
            <ExitToApp style={{ marginRight: "10px" }} />
            SAIR
          </Typography>
        </Grid>
      </Grid>
    </Menu>
  );
}
