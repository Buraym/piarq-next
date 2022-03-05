import NextHead from "../components/defaultPage/NextHead/index";
import { useSession, signIn, signOut } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import Menu from "../components/defaultPage/Menu";
import { useRouter } from "next/router";
import CardObra from "../components/Obra/Card";
import FotoTeste1 from "../assets/0a36c30f8e9a5bbc3c98521cbfd5d105.png";
import FotoTeste2 from "../assets/0a36c30f8e9a5bbc3c98521cbfd5d105.png";

export default function Projetos({}) {
  const router = useRouter();
  const { data: session } = useSession();
  const [listaObras, setListaObras] = useState([
    {
      id: "1283b12b391263c23",
      // name: "Planejamento Arquitêtonico  Prédio Rebouças",
      image: FotoTeste1.src,
      clientName: "Andre Rebouças Avelino",
      // clientId: "XXX.XXX.XXX-XX",
      address: "Avenida Andradina, rua Cassio Meiras, 4156",
      finishDate: "12/05/2022",
      description:
        "Projeto arquitetonico do prédio Rebouças, que deverá conter 15 andares de 300 M², 2 piscinas de 50 M² e 3 lounges ao lado direito do prédio ",
    },
    {
      id: "1283b12b391263c23",
      // name: "Planejamento Arquitêtonico  Prédio Rebouças",
      image: FotoTeste1.src,
      clientName: "Andre Rebouças Avelino",
      // clientId: "XXX.XXX.XXX-XX",
      address: "Avenida Andradina, rua Cassio Meiras, 4156",
      finishDate: "12/05/2022",
      description:
        "Projeto arquitetonico do prédio Rebouças, que deverá conter 15 andares de 300 M², 2 piscinas de 50 M² e 3 lounges ao lado direito do prédio ",
    },
    {
      id: "1283b12b391263c23",
      // name: "Planejamento Arquitêtonico  Prédio Rebouças",
      image: FotoTeste1.src,
      clientName: "Andre Rebouças Avelino",
      // clientId: "XXX.XXX.XXX-XX",
      address: "Avenida Andradina, rua Cassio Meiras, 4156",
      finishDate: "12/05/2022",
      description:
        "Projeto arquitetonico do prédio Rebouças, que deverá conter 15 andares de 300 M², 2 piscinas de 50 M² e 3 lounges ao lado direito do prédio ",
    },
    {
      id: "1283b12b391263c23",
      // name: "Planejamento Arquitêtonico  Prédio Rebouças",
      image: FotoTeste1.src,
      clientName: "Andre Rebouças Avelino",
      // clientId: "XXX.XXX.XXX-XX",
      address: "Avenida Andradina, rua Cassio Meiras, 4156",
      finishDate: "12/05/2022",
      description:
        "Projeto arquitetonico do prédio Rebouças, que deverá conter 15 andares de 300 M², 2 piscinas de 50 M² e 3 lounges ao lado direito do prédio ",
    },
    {
      id: "1283b12b391263c23",
      // name: "Planejamento Arquitêtonico  Prédio Rebouças",
      image: FotoTeste1.src,
      clientName: "Andre Rebouças Avelino",
      // clientId: "XXX.XXX.XXX-XX",
      address: "Avenida Andradina, rua Cassio Meiras, 4156",
      finishDate: "12/05/2022",
      description:
        "Projeto arquitetonico do prédio Rebouças, que deverá conter 15 andares de 300 M², 2 piscinas de 50 M² e 3 lounges ao lado direito do prédio ",
    },
    {
      id: "1283b12b391263c23",
      // name: "Planejamento Arquitêtonico  Prédio Rebouças",
      image: FotoTeste1.src,
      clientName: "Andre Rebouças Avelino",
      // clientId: "XXX.XXX.XXX-XX",
      address: "Avenida Andradina, rua Cassio Meiras, 4156",
      finishDate: "12/05/2022",
      description:
        "Projeto arquitetonico do prédio Rebouças, que deverá conter 15 andares de 300 M², 2 piscinas de 50 M² e 3 lounges ao lado direito do prédio ",
    },
  ]);

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
          sx={{ width: "90vw", height: "100%" }}
        >
          {listaObras.map((item) => (
            <CardObra data={item} />
          ))}
        </Grid>
      </Grid>
    </>
  );
}
