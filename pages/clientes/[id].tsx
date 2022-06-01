/* eslint-disable react-hooks/exhaustive-deps */
import NextHead from "../../src/components/defaultPage/NextHead";
import {
    Grid,
    Typography,
    Paper,
    Divider,
    Avatar,
    TextField,
    Chip,
    IconButton,
    Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import LinearLoading from "../../src/components/LinearLoading";
import CustomStepper from "../../src/components/Stepper";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import CustomModal from "../../src/components/Modal";
import CustomIconButton from "../../src/components/Button/IconButton";
import {
    AddBox,
    Face,
    Edit,
    Close,
    BackupTable,
    Send,
    PersonRemove,
} from "@mui/icons-material/";
import mapboxgl from "mapbox-gl/dist/mapbox-gl.js";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CardContentItem from "../../src/components/CardContent";

export default function Clientes() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [loadingProjects, setLoadingProjects] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formEdit, setFormEdit] = useState({
        name: "",
        email: "",
        identity: "",
        contact: "",
        address: "",
    });

    const [cliente, setCliente] = useState(null);
    const [step, setStep] = useState(0);
    const router = useRouter();
    const id = router.query.id;
    const [form, setForm] = useState({
        name: "",
        image: "",
        clients: [router.query.id],
        dateStart: "",
        dateFinish: "",
        addressComplement: "",
        address: "",
        cep: "",
        localizationMap: "",
        description: "",
        subprojects: [],
    });
    const actions = [
        <CustomIconButton f={AddProject} key={0}>
            <AddBox sx={{ color: "#ffb703" }} />
        </CustomIconButton>,
    ];

    async function HandleEdit() {
        try {
            setLoadingInfo(true);
            const idClient = router.query.id;
            const response = await axios.put(
                `https://piarq.herokuapp.com/clientes/update`,
                // `http://localhost:5000/clientes/update`,
                formEdit,
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                        client: String(idClient),
                    },
                }
            );
            setCliente(response.data);
            setFormEdit({
                name: response?.data?.name,
                email: response?.data?.email,
                identity: response?.data?.identity,
                contact: response?.data?.contact,
                address: response?.data?.address,
            });
            setEditMode(false);
            setLoadingInfo(false);
            toast.success("Cliente atualizado com sucesso !!!");
        } catch (err) {
            setLoadingInfo(false);
            console.log(err);
            toast.error("Erro ao atualizar cliente !!!");
        }
    }

    async function HandleRemoveOwnership(projectId: any) {
        try {
            setLoadingProjects(true);

            await axios.put(
                `https://piarq.herokuapp.com/clientes/removeownership`,
                // `http://localhost:5000/clientes/removeownership`,
                {},
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                        project: String(projectId),
                        client: String(id),
                    },
                }
            );
            GetClient(session);
            setLoadingProjects(false);
        } catch (err) {
            setLoadingProjects(false);
            console.log(err);
            toast.error("Erro ao retirar cliente de projeto !!!");
        }
    }

    async function HandleDeleteProject(projectId: any) {
        try {
            setLoadingProjects(true);
            await axios.delete(
                `https://piarq.herokuapp.com/projetos/delete`,
                // `http://localhost:5000/projetos/delete`,
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                        project: String(projectId),
                    },
                }
            );
            toast.success("Projeto deletado com sucesso !!!");
            GetClient(session);
            setLoadingProjects(false);
        } catch (err) {
            setLoadingProjects(false);
            console.log(err);
            toast.error("Erro ao deletar projeto !!!");
        }
    }

    // mapboxgl.accessToken = process.env.MAPBOX_TOKEN;
    // var map = new mapboxgl.Map({
    //     container: "mapbox-map",
    //     style: "mapbox://styles/mapbox/streets-v11",
    // });

    const steps = [
        {
            label: "Informação",
            content: (
                <>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        alignContent="center"
                    >
                        {loadingInfo ? (
                            <LinearLoading />
                        ) : (
                            <Paper sx={{ padding: "10px" }} variant="outlined">
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    alignContent="flex-start"
                                    style={{
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                    }}
                                >
                                    {editMode ? (
                                        <TextField
                                            label="Nome"
                                            defaultValue={cliente?.name}
                                            value={formEdit.name}
                                            onChange={(ev) => {
                                                setFormEdit({
                                                    ...formEdit,
                                                    name: ev.target.value,
                                                });
                                            }}
                                        />
                                    ) : (
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            alignContent="center"
                                        >
                                            <Typography fontWeight="bolder">
                                                Nome:
                                            </Typography>
                                            <Typography
                                                sx={{ marginLeft: "5px" }}
                                            >
                                                {cliente?.name}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    alignContent="flex-start"
                                    style={{
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                    }}
                                >
                                    {editMode ? (
                                        <TextField
                                            label="Email"
                                            defaultValue={cliente?.email}
                                            value={formEdit.email}
                                            onChange={(ev) => {
                                                setFormEdit({
                                                    ...formEdit,
                                                    email: ev.target.value,
                                                });
                                            }}
                                        />
                                    ) : (
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            alignContent="center"
                                        >
                                            <Typography fontWeight="bolder">
                                                Email:
                                            </Typography>
                                            <Typography
                                                sx={{ marginLeft: "5px" }}
                                            >
                                                {cliente?.email}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    alignContent="flex-start"
                                    style={{
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                    }}
                                >
                                    {editMode ? (
                                        <TextField
                                            label="Email"
                                            defaultValue={cliente?.identity}
                                            value={formEdit.identity}
                                            onChange={(ev) => {
                                                setFormEdit({
                                                    ...formEdit,
                                                    identity: ev.target.value,
                                                });
                                            }}
                                        />
                                    ) : (
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            alignContent="center"
                                        >
                                            <Typography fontWeight="bolder">
                                                Identidade:
                                            </Typography>
                                            <Typography
                                                sx={{ marginLeft: "5px" }}
                                            >
                                                {cliente?.identity}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    alignContent="flex-start"
                                    style={{
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                    }}
                                >
                                    {editMode ? (
                                        <TextField
                                            label="Contato"
                                            defaultValue={cliente?.contact}
                                            value={formEdit.contact}
                                            onChange={(ev) => {
                                                setFormEdit({
                                                    ...formEdit,
                                                    contact: ev.target.value,
                                                });
                                            }}
                                        />
                                    ) : (
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            alignContent="center"
                                        >
                                            <Typography fontWeight="bolder">
                                                Contato:
                                            </Typography>
                                            <Typography
                                                sx={{ marginLeft: "5px" }}
                                            >
                                                {cliente?.contact
                                                    ? cliente.contact
                                                    : "nenhum contato disponível"}
                                            </Typography>
                                        </Grid>
                                    )}
                                </Grid>
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    alignContent="flex-start"
                                    style={{
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                    }}
                                >
                                    {editMode ? (
                                        <TextField
                                            label="Endereço"
                                            defaultValue={cliente?.address}
                                            value={formEdit.address}
                                            onChange={(ev) => {
                                                setFormEdit({
                                                    ...formEdit,
                                                    address: ev.target.value,
                                                });
                                            }}
                                        />
                                    ) : (
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            alignContent="center"
                                        >
                                            <Typography fontWeight="bolder">
                                                Endereço:
                                            </Typography>
                                            <Typography
                                                sx={{ marginLeft: "5px" }}
                                            >
                                                {cliente?.address}
                                            </Typography>
                                        </Grid>
                                    )}
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
                                <Grid
                                    container
                                    direction="row"
                                    justifyContent="flex-start"
                                    alignItems="flex-start"
                                    alignContent="flex-start"
                                    style={{ marginTop: "10px" }}
                                >
                                    {!editMode ? (
                                        <Button
                                            onClick={() => setEditMode(true)}
                                            style={{
                                                backgroundColor: "#ffba08",
                                            }}
                                            fullWidth
                                        >
                                            <Edit style={{ color: "white" }} />
                                        </Button>
                                    ) : (
                                        <>
                                            <Button
                                                onClick={() =>
                                                    setEditMode(false)
                                                }
                                                style={{
                                                    width: "47.5%",
                                                    marginLeft: "1.25%",
                                                    marginRight: "1.25%",
                                                    backgroundColor: "#d00000",
                                                }}
                                            >
                                                <Close
                                                    style={{ color: "white" }}
                                                />
                                            </Button>
                                            <Button
                                                onClick={() => HandleEdit()}
                                                style={{
                                                    width: "47.5%",
                                                    marginLeft: "1.25%",
                                                    marginRight: "1.25%",
                                                    backgroundColor: "#ffba08",
                                                }}
                                            >
                                                <Send
                                                    style={{ color: "white" }}
                                                />
                                            </Button>
                                        </>
                                    )}
                                </Grid>
                            </Paper>
                        )}
                    </Grid>
                </>
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
                        height: "320px",
                        padding: "10px",
                        overflowX: "scroll",
                    }}
                >
                    {loadingProjects ? (
                        <Grid
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            overflow="hidden"
                            sx={{
                                width: "400px !important",
                                height: "25px",
                                padding: "15px",
                                margin: "10px",
                                borderRadius: "10px",
                                border: "1px solid #ffb703",
                            }}
                        >
                            <LinearLoading />
                        </Grid>
                    ) : (
                        cliente?.projects?.map((project, index) => {
                            const data = {
                                _id: project._id,
                                name: project?.name,
                                dateStart: project?.dateStart,
                                dateFinish: project?.dateFinish,
                                description: project?.description,
                                route: `/projetos/${project?._id}`,
                            };
                            return (
                                <CardContentItem
                                    type="project"
                                    data={data}
                                    onRemoveOwner={() => HandleRemoveOwnership}
                                    onDelete={HandleDeleteProject}
                                />
                            );
                        })
                    )}
                    {!loadingProjects && (
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
                    )}

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
                "https://piarq.herokuapp.com/projetos/create",
                // "http://localhost:5000/projetos/create",
                { ...form, user: session._id },
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                    },
                }
            );
            toast.success("Projeto criado com sucesso!");
            setOpenModal(false);
            setForm({
                name: "",
                image: "",
                clients: [router.query.id],
                dateStart: "",
                dateFinish: "",
                addressComplement: "",
                address: "",
                cep: "",
                localizationMap: "",
                description: "",
                subprojects: [],
            });
            GetClient(session);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    async function GetClient(session) {
        try {
            setLoading(true);
            console.log(router.query.id);
            const response = await axios.get(
                "https://piarq.herokuapp.com/clientes/find",
                // "http://localhost:5000/clientes/find",
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                        client: String(id),
                    },
                }
            );
            console.log(response.data);
            setCliente(response.data);
            setFormEdit({
                name: response?.data?.name,
                email: response?.data?.email,
                identity: response?.data?.identity,
                contact: response?.data?.contact,
                address: response?.data?.address,
            });
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
        await GetClient(sessionJSON);
    }

    useEffect(() => {
        getSession();
    }, []);

    console.log(cliente);

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
