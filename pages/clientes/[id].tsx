import NextHead from "../../src/components/defaultPage/NextHead";
import { useSession } from "next-auth/react";
import { Grid, Typography, Paper, Divider, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import { clientes } from "../../testdata";
import LinearLoading from "../../src/components/LinearLoading";
import { projetos } from "../../testdata";
import CustomStepper from "../../src/components/Stepper";
import {
    ImageRounded,
    DocumentScannerRounded,
    BackupTable,
} from "@mui/icons-material";
import fotoTeste from "../../src/assets/clienteFotoTeste1.jpg";

export default function Projetos({ cliente }) {
    const [projetos, setProjetos] = useState([]);
    const [step, setStep] = useState(0);
    const router = useRouter();
    const { data: session } = useSession();
    const steps = [
        {
            label: "Informação",
            content: (
                <Paper sx={{ padding: "10px" }} variant="outlined">
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                    >
                        <Typography fontWeight="bolder">Nome:</Typography>
                        <Typography>{cliente.name}</Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                    >
                        <Typography fontWeight="bolder">Email:</Typography>
                        <Typography>{cliente.email + " "}</Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                    >
                        <Typography fontWeight="bolder">Contato:</Typography>
                        <Typography>{cliente.contact}</Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                    >
                        <Typography fontWeight="bolder">Endereço:</Typography>
                        <Typography>{cliente.address}</Typography>
                    </Grid>
                </Paper>
            ),
        },
        {
            label: "Projetos",
            content: (
                <Grid
                    item
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                    sx={{
                        display: "flex",
                        width: "90vw",
                        height: "280px",
                        padding: "10px",
                        overflowY: "scroll",
                    }}
                >
                    {cliente.projects.map((project) => (
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            sx={{
                                width: "250px",
                                height: "200px",
                                padding: "15px",
                                margin: "30px",
                                borderRadius: "10px",
                                border: "1px solid #ffb703",
                            }}
                            onClick={() => {
                                router.push("/projetos/" + project.id);
                            }}
                        >
                            <BackupTable style={{ color: "#ffb703" }} />
                            <Typography fontWeight="bolder">
                                {project.name}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            ),
        },
    ];

    useEffect(() => {}, []);

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
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    sx={{ width: "90vw", height: "180px", marginTop: "20px" }}
                >
                    <Avatar
                        src={fotoTeste.src}
                        sx={{ width: 72, height: 72 }}
                    />
                    <Divider
                        variant="middle"
                        // orientation="vertical"
                        sx={{ marginLeft: "10px", marginRight: "10px" }}
                    />
                    <Typography fontFamily={"Pacifico"} fontSize={"25px"}>
                        {cliente.name}
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
                    <CustomStepper
                        steps={steps}
                        step={step}
                        setStep={setStep}
                        orientation="vertical"
                    />
                </Grid>
            </Grid>
        </>
    );
}

export async function getServerSideProps({ query }) {
    const queryId = query.id;
    try {
        const cliente = clientes.find((item) => item.id === queryId);
        return {
            props: { cliente: cliente },
        };
    } catch (err) {
        console.error(err);
    }
}
