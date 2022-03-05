import NextHead from "../components/defaultPage/NextHead/index";
import { useSession, signIn, signOut } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import Menu from "../components/defaultPage/Menu";
import { useRouter } from "next/router";
import CardObra from "../components/Obra/Card";
import FotoTeste1 from "../assets/pexels-andrea-piacquadio-774909.jpg";
import FotoTeste2 from "../assets/pexels-creation-hill-1681010.jpg";
import FotoTeste3 from "../assets/pexels-pixabay-220453.jpg";
import CardCliente from "../components/Cliente/Card";

export default function Projetos({}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [listaClientes, setListaClientes] = useState([
    {
      id: "1283b12b391263c23",
      name: "Antonieta Vasconcellos",
      image: FotoTeste1.src,
      document: "XXX.XXX.XXX-XX",
    },
    {
      id: "89273b8ja0ja0sd9j0a",
      name: "Paulo Antonio Guedes",
      image: FotoTeste2.src,
      document: "XXX.XXX.XXX-XX",
    },
    {
      id: "9574q9dj90a8da088903",
      name: "Diego Carlos Mendez",
      image: FotoTeste3.src,
      document: "XXX.XXX.XXX-XX",
    },
  ]);

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
            Clientes
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
        >
          {listaClientes.map((item) => (
            <CardCliente data={item} />
          ))}
        </Grid>
      </Grid>
    </>
  );
}
