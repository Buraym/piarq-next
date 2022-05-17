import NextHead from "../../src/components/defaultPage/NextHead";
import { Grid, Typography, Paper, Chip, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import axios from "axios";
import LinearLoading from "../../src/components/LinearLoading";
import { ToastContainer, toast } from "react-toastify";
import CustomStepper from "../../src/components/Stepper";
import {
    ImageRounded,
    DocumentScannerRounded,
    BackupTable,
    AddCircle,
} from "@mui/icons-material";
import CustomModal from "../../src/components/Modal";
import Button from "../../src/components/Button";

export default function Projeto({ id }) {
    const [session, setSession] = useState(null);
    const [projeto, setProjeto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [step, setStep] = useState(0);
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const modalActions = [
        <Button
            key={"createbutton"}
            variant="contained"
            type="submit"
            cor="#ffba08"
        >
            Criar
        </Button>,
    ];

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
                        <Typography>{projeto?.name}</Typography>
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
                        <Typography>
                            {projeto?.address + " "}
                            {projeto?.addresComplement
                                ? projeto?.addresComplement
                                : ""}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                    >
                        <Typography fontWeight="bolder">
                            Cliente(s):{" "}
                        </Typography>
                        <Typography>
                            {projeto?.clients?.map((cliente, index) => (
                                <Chip
                                    key={index}
                                    label={
                                        <Typography fontWeight="bold">
                                            {cliente?.name}
                                        </Typography>
                                    }
                                    sx={{
                                        backgroundColor: "lightgray",
                                        color: "white",
                                    }}
                                    size="small"
                                    onClick={() => {
                                        router.push(
                                            `/clientes/${cliente?._id}`
                                        );
                                    }}
                                ></Chip>
                            ))}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                    >
                        <Typography fontWeight="bolder">CEP :</Typography>
                        <Typography>{projeto?.cep}</Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                    >
                        <Typography fontWeight="bolder">
                            Data de Entrega:
                        </Typography>
                        <Typography>{projeto?.dateFinish}</Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                    >
                        <Typography align="justify">
                            <Typography fontWeight="bolder">
                                Descrição:
                            </Typography>
                            {projeto?.description}
                        </Typography>
                    </Grid>
                </Paper>
            ),
        },
        {
            label: "Localidade",
            content: (
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                >
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3839.1064155231543!2d-47.87772808514496!3d-15.798341889048794!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a3b224c1f9a91%3A0x55fbb231e9698d19!2sCatedral%20Metropolitana%20Nossa%20Senhora%20Aparecida!5e0!3m2!1spt-BR!2sbr!4v1649012590302!5m2!1spt-BR!2sbr"
                        width="600"
                        height="450"
                        style={{ border: 0 }}
                        allowFullScreen={true}
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </Grid>
            ),
        },
        {
            label: "Documentos",
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
                        height: "150px",
                        padding: "10px",
                        overflowY: "scroll",
                    }}
                >
                    {projeto?.docs?.map((doc, index) => (
                        <Grid
                            key={index}
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            sx={{
                                width: "250px",
                                height: "150px",
                                marginRight: "30px",
                            }}
                        >
                            <DocumentScannerRounded />
                            <Typography fontWeight="bolder">
                                {doc?.label}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            ),
        },
        {
            label: "Subprojetos",
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
                    {projeto?.subProjects?.map((subProject, index) => (
                        <Grid
                            key={index}
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            sx={{
                                width: "200px",
                                height: "160px",
                                padding: "10px",
                                margin: "20px",
                                borderRadius: "10px",
                                border: "1px solid #ffb703",
                            }}
                        >
                            <BackupTable style={{ color: "#fb5607" }} />
                            <Typography>Tipo: {subProject?.type}</Typography>
                            <Typography>Nome: {subProject?.name}</Typography>
                        </Grid>
                    ))}
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                        sx={{
                            width: "200px",
                            height: "160px",
                            padding: "10px",
                            margin: "30px",
                            borderRadius: "10px",
                            border: "1px solid #ffb703",
                        }}
                    >
                        <AddCircle onClick={() => setOpenModal(!openModal)} />
                        <Typography> Subprojeto</Typography>
                    </Grid>
                    {openModal ? (
                        <CustomModal
                            title="Subprojeto"
                            open={openModal}
                            handleClose={setOpenModal}
                            actions={modalActions}
                        >
                            <></>
                        </CustomModal>
                    ) : (
                        <></>
                    )}
                </Grid>
            ),
        },
    ];

    async function GetProject(session, idProject) {
        try {
            setLoading(true);
            console.log(router.query.id);
            const response = await axios.get(
                "https://piarq.herokuapp.com/projetos/find",
                // "http://localhost:5000/projetos/find",
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                        project: idProject,
                    },
                }
            );
            console.log(response.data);
            setProjeto(response.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error("Houve um erro ao tentar retornar os clientes !!!");
            setLoading(false);
        }
    }

    async function getSession() {
        const sessionJSON = JSON.parse(window.localStorage.getItem("session"));
        setSession(sessionJSON);
        if (sessionJSON) {
            setLoading(false);
        } else {
            router.push("/");
        }
        const idProject = router.query.id;
        await GetProject(sessionJSON, idProject);
    }

    useEffect(() => {
        getSession();
    }, []);

    return (
        <>
            <NextHead title="Piarq | Projetos" />
            {loading ? (
                <LinearLoading />
            ) : (
                <>
                    <Menu image={session?.user?.image} />
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                    >
                        <>
                            <Grid
                                container
                                direction="column"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                sx={{ width: "80vw", height: 200 }}
                            >
                                <Typography
                                    fontFamily={"Pacifico"}
                                    fontSize={40}
                                >
                                    {projeto?.name + " "}
                                    <ImageRounded
                                        style={{
                                            color: "#ffb703",
                                            textShadow: "4px 4px #ffb703",
                                        }}
                                    />
                                </Typography>
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                alignContent="flex-start"
                                wrap="wrap"
                                overflow="scroll"
                                sx={{ width: "90vw", height: "100vh" }}
                            >
                                <CustomStepper
                                    steps={steps}
                                    step={step}
                                    setStep={setStep}
                                    orientation="vertical"
                                />
                            </Grid>
                        </>
                    </Grid>
                </>
            )}
        </>
    );
}

export async function getServerSideProps({ query }) {
    const queryId = await query.id;
    return {
        props: { id: queryId },
    };
}
