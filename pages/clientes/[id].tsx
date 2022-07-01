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
    Skeleton,
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
import { Add, Edit, Close, Send } from "@mui/icons-material/";
import CardContentItem from "../../src/components/CardContent";
import { format, parseISO } from "date-fns";

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
        <Button
            onClick={() => AddProject()}
            style={{ color: "#ffb703", fontWeight: "bold", fontSize: 14 }}
        >
            Criar projeto
        </Button>,
    ];

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
                                ) : loadingInfo ? (
                                    <Skeleton
                                        variant="text"
                                        height={40}
                                        width={245}
                                    ></Skeleton>
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
                                        <Typography sx={{ marginLeft: "5px" }}>
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
                                {loadingInfo ? (
                                    <Skeleton
                                        variant="text"
                                        height={40}
                                        width={245}
                                    >
                                        <Typography variant="body1"></Typography>
                                    </Skeleton>
                                ) : loadingInfo === false && editMode ? (
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
                                        <Typography sx={{ marginLeft: "5px" }}>
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
                                {loadingInfo ? (
                                    <Skeleton
                                        variant="text"
                                        height={40}
                                        width={245}
                                    >
                                        <Typography variant="body1"></Typography>
                                    </Skeleton>
                                ) : loadingInfo === false && editMode ? (
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
                                        <Typography sx={{ marginLeft: "5px" }}>
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
                                {loadingInfo ? (
                                    <Skeleton
                                        variant="text"
                                        height={40}
                                        width={245}
                                    >
                                        <Typography variant="body1"></Typography>
                                    </Skeleton>
                                ) : loadingInfo === false && editMode ? (
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
                                        <Typography sx={{ marginLeft: "5px" }}>
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
                                {loadingInfo ? (
                                    <Skeleton
                                        variant="text"
                                        height={40}
                                        width={245}
                                    >
                                        <Typography variant="body1"></Typography>
                                    </Skeleton>
                                ) : loadingInfo === false && editMode ? (
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
                                        <Typography sx={{ marginLeft: "5px" }}>
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
                                {loadingInfo ? (
                                    <>
                                        <Skeleton
                                            variant="rectangular"
                                            height={40}
                                            width={115}
                                            style={{ marginRight: 12 }}
                                        />
                                        <Skeleton
                                            variant="rectangular"
                                            height={40}
                                            width={115}
                                        />
                                    </>
                                ) : !editMode ? (
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
                                            onClick={() => setEditMode(false)}
                                            style={{
                                                width: "47.5%",
                                                marginLeft: "1.25%",
                                                marginRight: "1.25%",
                                                backgroundColor: "#d00000",
                                            }}
                                        >
                                            <Close style={{ color: "white" }} />
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
                                            <Send style={{ color: "white" }} />
                                        </Button>
                                    </>
                                )}
                            </Grid>
                        </Paper>
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
                    spacing={2}
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
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
                                    key={index}
                                    type="project"
                                    data={data}
                                    onRemoveOwner={() => HandleRemoveOwnership}
                                    onDelete={HandleDeleteProject}
                                    onEdit={() =>
                                        router.push(`/projetos/${project._id}`)
                                    }
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
                                <Add />
                            </CustomIconButton>
                        </Grid>
                    )}

                    <CustomModal
                        title={
                            <Typography fontWeight="bold">
                                Criar projeto para
                                <Chip
                                    sx={{ marginLeft: "5px" }}
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
                                    type="date"
                                    label="Data de Inicio do Projeto"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                                    type="date"
                                    label="Data de Fim do Projeto"
                                    value={form.dateFinish}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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

    async function HandleRemoveOwnership(projectId) {
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

    async function HandleDeleteProject(projectId) {
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

    async function AddProject() {
        if (
            form.name !== "" &&
            form.dateStart !== "" &&
            form.dateFinish !== "" &&
            form.address !== "" &&
            form.cep !== "" &&
            form.description !== ""
        ) {
            try {
                format(parseISO(form.dateFinish), "dd/MM/yyyy");
                format(parseISO(form.dateStart), "dd/MM/yyyy");
            } catch (err) {
                toast.error("Data de Início e/ou Fim inválida");
                return;
            }
            try {
                setLoading(true);
                setLoadingInfo(true);
                form.dateFinish = format(
                    parseISO(form.dateFinish),
                    "dd/MM/yyyy"
                );
                form.dateStart = format(parseISO(form.dateStart), "dd/MM/yyyy");
                const response = await axios.post(
                    // "https://piarq.herokuapp.com/projetos/create",
                    "http://localhost:5000/projetos/create",
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
                setLoadingInfo(false);
                setLoading(false);
            } catch (err) {
                setLoading(false);
                console.log(err);
            }
        } else {
            toast.error("Preencha todos os campos !!!");
        }
    }

    async function GetClient(session) {
        try {
            setLoading(true);
            setLoadingInfo(true);
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
            setLoadingInfo(false);
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

    return (
        <>
            <NextHead title="Piarq | Cliente" />
            <Menu image={session?.user?.image} />
            <ToastContainer autoClose={2000} position={"top-right"} />
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
                    justifyContent="flex-start"
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
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="center"
                        alignContent="center"
                    >
                        <Typography
                            variant="button"
                            fontWeight="bold"
                            fontSize={20}
                        >
                            Informações
                            {!editMode ? (
                                <IconButton onClick={() => setEditMode(true)}>
                                    <Edit style={{ color: "#ffba08" }} />
                                </IconButton>
                            ) : (
                                <>
                                    <IconButton
                                        onClick={() => setEditMode(false)}
                                    >
                                        <Close style={{ color: "#d00000" }} />
                                    </IconButton>
                                    <IconButton onClick={() => HandleEdit()}>
                                        <Send style={{ color: "#ffba08" }} />
                                    </IconButton>
                                </>
                            )}
                        </Typography>
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
                            ) : loadingInfo ? (
                                <Skeleton
                                    variant="text"
                                    height={40}
                                    width={245}
                                ></Skeleton>
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
                                    <Typography sx={{ marginLeft: "5px" }}>
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
                            {loadingInfo ? (
                                <Skeleton
                                    variant="text"
                                    height={40}
                                    width={245}
                                >
                                    <Typography variant="body1"></Typography>
                                </Skeleton>
                            ) : loadingInfo === false && editMode ? (
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
                                    <Typography sx={{ marginLeft: "5px" }}>
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
                            {loadingInfo ? (
                                <Skeleton
                                    variant="text"
                                    height={40}
                                    width={245}
                                >
                                    <Typography variant="body1"></Typography>
                                </Skeleton>
                            ) : loadingInfo === false && editMode ? (
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
                                    <Typography sx={{ marginLeft: "5px" }}>
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
                            {loadingInfo ? (
                                <Skeleton
                                    variant="text"
                                    height={40}
                                    width={245}
                                >
                                    <Typography variant="body1"></Typography>
                                </Skeleton>
                            ) : loadingInfo === false && editMode ? (
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
                                    <Typography sx={{ marginLeft: "5px" }}>
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
                            {loadingInfo ? (
                                <Skeleton
                                    variant="text"
                                    height={40}
                                    width={245}
                                >
                                    <Typography variant="body1"></Typography>
                                </Skeleton>
                            ) : loadingInfo === false && editMode ? (
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
                                    <Typography sx={{ marginLeft: "5px" }}>
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
                    </Grid>

                    <Grid
                        item
                        direction="column"
                        justifyContent="flex-start"
                        spacing={1}
                        alignItems="flex-start"
                        alignContent="center"
                        wrap="wrap"
                        overflow="scroll"
                    >
                        <Typography
                            variant="button"
                            fontWeight="bold"
                            fontSize={20}
                        >
                            Projetos
                            <IconButton onClick={() => setOpenModal(true)}>
                                <Add style={{ color: "#ffb703" }} />
                            </IconButton>
                        </Typography>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            overflow="scroll"
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
                                            key={index}
                                            type="project"
                                            data={data}
                                            onRemoveOwner={() =>
                                                HandleRemoveOwnership
                                            }
                                            onDelete={HandleDeleteProject}
                                            onEdit={() =>
                                                router.push(
                                                    `/projetos/${project._id}`
                                                )
                                            }
                                        />
                                    );
                                })
                            )}
                        </Grid>

                        <CustomModal
                            title={
                                <Typography fontWeight="bold">
                                    Criar projeto para
                                    <Chip
                                        sx={{ marginLeft: "5px" }}
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
                                        type="date"
                                        label="Data de Inicio do Projeto"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
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
                                        type="date"
                                        label="Data de Fim do Projeto"
                                        value={form.dateFinish}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
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
                                                description:
                                                    event?.target.value,
                                            })
                                        }
                                        sx={{ width: "100%" }}
                                        multiline
                                    />
                                </Grid>
                            </Grid>
                        </CustomModal>
                    </Grid>

                    {/* <CustomStepper
                        steps={steps}
                        step={step}
                        setStep={setStep}
                        orientation="vertical"
                    /> */}
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
