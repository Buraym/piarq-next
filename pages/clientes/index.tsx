import NextHead from "../../src/components/defaultPage/NextHead";
import { useSession, signIn, signOut } from "next-auth/react";
import { Grid, Typography } from "@mui/material";
import { useRef, useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import CardObra from "../../src/components/Obra/Card";
import FotoTeste1 from "../../src/assets/clienteFotoTeste1.jpg";
import FotoTeste2 from "../../src/assets/clienteFotoTeste2.jpg";
import FotoTeste3 from "../../src/assets/clienteFotoTeste3.jpg";
import CardCliente from "../../src/components/Cliente/Card";

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
                    <Typography
                        variant="title"
                        fontFamily={"Pacifico"}
                        fontSize={60}
                    >
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
