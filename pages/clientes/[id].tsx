import NextHead from "../../src/components/defaultPage/NextHead";
import {
    Grid,
    Typography,
    Paper,
    Divider,
    Avatar,
    TextField,
    Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import LinearLoading from "../../src/components/LinearLoading";
import CustomStepper from "../../src/components/Stepper";
import { BackupTable } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CustomModal from "../../src/components/Modal";
import CustomIconButton from "../../src/components/Button/IconButton";
import { AddBox, Face } from "@mui/icons-material/";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";

export default function Clientes() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openModal, setOpenModal] = useState(false);

    const [cliente, setCliente] = useState(null);
    const [step, setStep] = useState(0);
    const router = useRouter();
    const [form, setForm] = useState({
        name: "",
        image: "",
        clients: [router.query.id],
        dateStart: [],
        dateFinish: [],
        addressComplement: "",
        address: "",
        cep: "",
        localizationMap: "",
        description: "",
        subprojects: [],
    });
    const actions = [
        <CustomIconButton f={AddProject}>
            <AddBox sx={{ color: "#ffb703" }} />
        </CustomIconButton>,
    ];

    // mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
    // var map = new mapboxgl.Map({
    //     container: "mapbox-map",
    //     style: "mapbox://styles/mapbox/streets-v11",
    // });

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
                        <Typography sx={{ marginLeft: "5px" }}>
                            {cliente?.name}
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
                        <Typography fontWeight="bolder">Email:</Typography>
                        <Typography sx={{ marginLeft: "5px" }}>
                            {cliente?.email}
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
                        <Typography fontWeight="bolder">Contato:</Typography>
                        <Typography sx={{ marginLeft: "5px" }}>
                            {cliente?.contact
                                ? cliente.contact
                                : "nenhum contato disponível"}
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
                        <Typography fontWeight="bolder">Endereço:</Typography>
                        <Typography sx={{ marginLeft: "5px" }}>
                            {cliente?.address}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                        id="mapbox-map"
                    ></Grid>
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
                    wrap="nowrap"
                    sx={{
                        display: "flex",
                        width: "90vw",
                        height: "280px",
                        padding: "10px",
                        overflowX: "scroll",
                    }}
                >
                    {cliente?.projects?.map((project, index) => (
                        <Grid
                            key={index}
                            item
                            direction="column"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            alignContent="center"
                            overflow="hidden"
                            sx={{
                                width: "400px !important",
                                height: "200px",
                                padding: "15px",
                                margin: "10px",
                                borderRadius: "10px",
                                border: "1px solid #ffb703",
                            }}
                            onClick={() => {
                                router.push("/projetos/" + project?._id);
                            }}
                        >
                            <Grid
                                item
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="center"
                                alignContent="center"
                            >
                                <Typography fontWeight="bolder">
                                    {project?.name}
                                </Typography>
                                <Typography>
                                    {project?.dateStart} - {project?.dateFinish}
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                direction="row"
                                justifyContent="flex-start"
                                alignItems="flex-start"
                                alignContent="flex-start"
                                overflow="scroll"
                                wrap="nowrap"
                                sx={{
                                    width: "100%",
                                    height: "110px",
                                    marginTop: "10px",
                                    scrollbarWidth: "",
                                    "-ms-overflow-style": "none",
                                    "-webkit-scrollbar": {
                                        display: "none" /* Safari and Chrome */,
                                    },
                                    WebkitOverflowScrolling: "touch",
                                }}
                            >
                                <Typography variant="body2" align="justify">
                                    {project?.description}
                                </Typography>
                            </Grid>
                        </Grid>
                    ))}
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
                    >
                        <CustomIconButton f={() => setOpenModal(true)}>
                            <AddBox />
                        </CustomIconButton>
                    </Grid>
                    <CustomModal
                        title={
                            <Typography fontWeight="bold">
                                Criar projeto para
                                <Chip
                                    sx={{ marginLeft: "5px" }}
                                    icon={<Face />}
                                    label={cliente?.name}
                                />
                            </Typography>
                        }
                        handleClose={setOpenModal}
                        open={openModal}
                        actions={actions}
                    >
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            sx={{
                                padding: "10px",
                            }}
                        >
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                overflow="hidden"
                                style={{
                                    width: "47.5%",
                                    marginBottom: 10,
                                    marginTop: 15,
                                    paddingTop: 5,
                                    marginLeft: "1.5%",
                                    marginRight: "1%",
                                }}
                            >
                                <TextField
                                    label="Nome do Projeto"
                                    value={form.name}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            name: event?.target.value,
                                        })
                                    }
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                style={{
                                    width: "47.5%",
                                    marginBottom: 10,
                                    marginTop: 15,
                                    paddingTop: 5,
                                    marginLeft: "1%",
                                    marginRight: "1.5%",
                                }}
                            >
                                <TextField
                                    label="Data de Inicio do Projeto"
                                    value={form.dateStart}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            dateStart: event?.target.value,
                                        })
                                    }
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                style={{
                                    width: "47.5%",
                                    marginBottom: 10,
                                    marginTop: 10,
                                    marginLeft: "1.5%",
                                    marginRight: "1%",
                                }}
                            >
                                <TextField
                                    label="Data de Fim do Projeto"
                                    value={form.dateFinish}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            dateFinish: event?.target.value,
                                        })
                                    }
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                style={{
                                    width: "47.5%",
                                    marginBottom: 10,
                                    marginTop: 10,
                                    marginLeft: "1%",
                                    marginRight: "1.5%",
                                }}
                            >
                                <TextField
                                    label="Endereço do Projeto"
                                    value={form.address}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            address: event?.target.value,
                                        })
                                    }
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                style={{
                                    width: "47.5%",
                                    marginBottom: 10,
                                    marginTop: 10,
                                    marginLeft: "1.5%",
                                    marginRight: "1%",
                                }}
                            >
                                <TextField
                                    label="Complemento do Endereço"
                                    value={form.addressComplement}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            addressComplement:
                                                event?.target.value,
                                        })
                                    }
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                style={{
                                    width: "47.5%",
                                    marginBottom: 10,
                                    marginTop: 10,
                                    marginLeft: "1%",
                                    marginRight: "1.5%",
                                }}
                            >
                                <TextField
                                    label="Cep do Endereço"
                                    value={form.cep}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            cep: event?.target.value,
                                        })
                                    }
                                    sx={{ width: "100%" }}
                                />
                            </Grid>
                            <Grid
                                container
                                direction="row"
                                justifyContent="center"
                                alignItems="center"
                                alignContent="center"
                                wrap="wrap"
                                style={{
                                    width: "97%",
                                    marginBottom: 10,
                                    marginTop: 10,
                                    marginLeft: "1.5%",
                                    marginRight: "1.5%",
                                }}
                            >
                                <TextField
                                    label="Descrição do projeto"
                                    value={form.description}
                                    onChange={(event) =>
                                        setForm({
                                            ...form,
                                            description: event?.target.value,
                                        })
                                    }
                                    sx={{ width: "100%" }}
                                    multiline
                                />
                            </Grid>
                        </Grid>
                    </CustomModal>
                </Grid>
            ),
        },
    ];

    async function AddProject() {
        try {
            console.log(router.query.id);
            setLoading(true);
            const response = await axios.post(
                // "https://piarq.herokuapp.com/projetos/create",
                "http://localhost:5000/projetos/create",
                form,
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                    },
                }
            );
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    async function GetClient(session, idClient) {
        try {
            setLoading(true);
            console.log(router.query.id);
            const response = await axios.get(
                // "https://piarq.herokuapp.com/clientes/find",
                "http://localhost:5000/clientes/find",
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                        client: idClient,
                    },
                }
            );
            console.log(response.data);
            setCliente(response.data);
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
        const idClient = router.query.id;
        await GetClient(sessionJSON, idClient);
    }

    useEffect(() => {
        getSession();
    }, []);

    console.log(form);

    return (
        <>
            <NextHead title="Piarq | Cliente" />
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
                        src={cliente?.image}
                        sx={{ width: 72, height: 72 }}
                    />
                    <Divider
                        variant="middle"
                        // orientation="vertical"
                        sx={{ marginLeft: "10px", marginRight: "10px" }}
                    />
                    <Typography fontFamily={"Pacifico"} fontSize={"25px"}>
                        {cliente?.name}
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
    const queryId = await query.id;
    return {
        props: { id: queryId },
    };
}
