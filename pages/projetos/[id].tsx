import NextHead from "../../src/components/defaultPage/NextHead";
import {
    Grid,
    Typography,
    Paper,
    Chip,
    Button,
    Skeleton,
    TextField,
    FormControl,
    InputLabel,
    Select,
    OutlinedInput,
    MenuItem,
} from "@mui/material";
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
    Edit,
    Close,
    Send,
    DeleteForever,
} from "@mui/icons-material";
import CustomModal from "../../src/components/Modal";

export default function Projeto() {
    const [session, setSession] = useState(null);
    const [projeto, setProjeto] = useState(null);
    const [loading, setLoading] = useState(false);
    const [loadingInfo, setLoadingInfo] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [formEdit, setFormEdit] = useState({
        name: "",
        email: "",
        identity: "",
        contact: "",
        address: "",
        clients: [],
        cep: "",
        dateFinish: "",
        description: "",
    });
    const [clients, setClients] = useState([]);
    const [allClients, setAllClients] = useState([]);
    const [step, setStep] = useState(0);
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const modalActions = [
        <Button
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#ffba08" }}
        >
            Criar
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
                                        width: "380px",
                                        marginBottom: "10px",
                                        marginTop: "10px",
                                    }}
                                >
                                    {editMode ? (
                                        <TextField
                                            label="Nome"
                                            defaultValue={projeto?.name}
                                            value={formEdit.name}
                                            onChange={(ev) => {
                                                setFormEdit({
                                                    ...formEdit,
                                                    name: ev.target.value,
                                                });
                                            }}
                                            fullWidth
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
                                            <Typography>
                                                {projeto?.name}
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
                                            defaultValue={projeto?.address}
                                            value={formEdit.address}
                                            onChange={(ev) => {
                                                setFormEdit({
                                                    ...formEdit,
                                                    address: ev.target.value,
                                                });
                                            }}
                                            fullWidth
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
                                            <Typography>
                                                {projeto?.address + " "}
                                                {projeto?.addresComplement
                                                    ? projeto?.addresComplement
                                                    : ""}
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
                                        <FormControl fullWidth>
                                            <InputLabel id="clientes">
                                                {`Cliente(s)`}
                                            </InputLabel>
                                            <Select
                                                multiple
                                                value={formEdit.clients}
                                                labelId="clientes"
                                                label={`Cliente(s)`}
                                                fullWidth
                                                onChange={(ev) => {
                                                    HandleChangeClient(
                                                        ev?.target.value
                                                    );
                                                }}
                                                input={
                                                    <OutlinedInput label="Chip" />
                                                }
                                                renderValue={(selected) => (
                                                    <Grid
                                                        container
                                                        spacing={1}
                                                        direction="row"
                                                        justifyContent="center"
                                                        alignItems="center"
                                                        alignContent="center"
                                                        wrap="wrap"
                                                    >
                                                        {selected?.map(
                                                            (value) => (
                                                                <Chip
                                                                    key={value}
                                                                    label={
                                                                        <Typography
                                                                            fontWeight="bold"
                                                                            fontSize={
                                                                                12
                                                                            }
                                                                        >
                                                                            {
                                                                                value?.name
                                                                            }
                                                                        </Typography>
                                                                    }
                                                                />
                                                            )
                                                        )}
                                                    </Grid>
                                                )}
                                            >
                                                {allClients.map(
                                                    (item, index) => (
                                                        <MenuItem
                                                            key={index}
                                                            value={item}
                                                        >
                                                            {item?.name}
                                                        </MenuItem>
                                                    )
                                                )}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            alignContent="center"
                                        >
                                            <Typography fontWeight="bolder">
                                                Cliente(s):{" "}
                                            </Typography>
                                            <Typography>
                                                {projeto?.clients?.map(
                                                    (cliente, index) =>
                                                        projeto.clients.length >
                                                        1 ? (
                                                            <Chip
                                                                key={index}
                                                                label={
                                                                    <Typography fontWeight="bold">
                                                                        {
                                                                            cliente?.name
                                                                        }
                                                                    </Typography>
                                                                }
                                                                sx={{
                                                                    backgroundColor:
                                                                        "lightgray",
                                                                    color: "white",
                                                                }}
                                                                size="medium"
                                                                onClick={() => {
                                                                    router.push(
                                                                        `/clientes/${cliente?._id}`
                                                                    );
                                                                }}
                                                                onDelete={() =>
                                                                    HandleRemoveOwnership(
                                                                        cliente?.id
                                                                    )
                                                                }
                                                                deleteIcon={
                                                                    <DeleteForever />
                                                                }
                                                                style={{
                                                                    marginLeft:
                                                                        "3px",
                                                                    marginRight:
                                                                        "3px",
                                                                }}
                                                            ></Chip>
                                                        ) : (
                                                            <Chip
                                                                key={index}
                                                                label={
                                                                    <Typography fontWeight="bold">
                                                                        {
                                                                            cliente?.name
                                                                        }
                                                                    </Typography>
                                                                }
                                                                sx={{
                                                                    backgroundColor:
                                                                        "lightgray",
                                                                    color: "white",
                                                                }}
                                                                size="medium"
                                                                onClick={() => {
                                                                    router.push(
                                                                        `/clientes/${cliente?._id}`
                                                                    );
                                                                }}
                                                            ></Chip>
                                                        )
                                                )}
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
                                            label="Cep"
                                            defaultValue={projeto?.cep}
                                            value={formEdit.cep}
                                            onChange={(ev) => {
                                                setFormEdit({
                                                    ...formEdit,
                                                    cep: ev.target.value,
                                                });
                                            }}
                                            fullWidth
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
                                                CEP:
                                            </Typography>
                                            <Typography>
                                                {projeto?.cep}
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
                                            label="Data de Entrega"
                                            defaultValue={projeto?.dateFinish}
                                            value={formEdit.dateFinish}
                                            onChange={(ev) => {
                                                setFormEdit({
                                                    ...formEdit,
                                                    dateFinish: ev.target.value,
                                                });
                                            }}
                                            fullWidth
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
                                                Data de Entrega:
                                            </Typography>
                                            <Typography>
                                                {projeto?.dateFinish}
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
                                            label="Data de Entrega"
                                            defaultValue={projeto?.description}
                                            value={formEdit.description}
                                            onChange={(ev) => {
                                                setFormEdit({
                                                    ...formEdit,
                                                    description:
                                                        ev.target.value,
                                                });
                                            }}
                                            fullWidth
                                            multiline
                                        />
                                    ) : (
                                        <Grid
                                            container
                                            direction="row"
                                            justifyContent="flex-start"
                                            alignItems="center"
                                            alignContent="center"
                                        >
                                            <Typography align="justify">
                                                <Typography fontWeight="bolder">
                                                    Descrição:
                                                </Typography>
                                                {projeto?.description}
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

    const id = router.query.id;

    async function GetProject(session) {
        try {
            setLoading(true);
            const response = await axios.get(
                "https://piarq.herokuapp.com/projetos/find",
                // "http://localhost:5000/projetos/find",
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                        project: String(id),
                    },
                }
            );
            setProjeto(response.data);
            setFormEdit({
                name: response.data.name,
                email: response.data.email,
                identity: response.data.identity,
                contact: response.data.contact,
                address: response.data.address,
                clients: response.data.clients,
                cep: response.data.cep,
                dateFinish: response.data.dateFinish,
                description: response.data.description,
            });
            const response2 = await axios.get(
                "https://piarq.herokuapp.com/clientes/list",
                // "http://localhost:5000/clientes/list",
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                    },
                }
            );
            setAllClients(response2.data);
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error(
                "Houve um erro ao tentar retornar os dados do projeto !!!"
            );
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

        await GetProject(sessionJSON);
    }

    function HandleChangeClient(value) {
        console.log(value);
        if (formEdit.clients.indexOf(value) === -1) {
            setFormEdit({
                ...formEdit,
                clients: value,
            });
        } else {
            setFormEdit({
                ...formEdit,
                clients: formEdit.clients.filter((item) => item !== value),
            });
        }
    }

    async function HandleEdit() {
        try {
            setLoadingInfo(true);
            setFormEdit({
                ...formEdit,
                clients: formEdit.clients.map((item) => item._id),
            });
            const response = await axios.put(
                // `https://piarq.herokuapp.com/projetos/update`,
                `http://localhost:5000/projetos/update`,
                formEdit,
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                        project: String(id),
                    },
                }
            );
            setProjeto(response.data);
            setFormEdit({
                name: response?.data?.name,
                email: response?.data?.email,
                identity: response?.data?.identity,
                contact: response?.data?.contact,
                address: response?.data?.address,
                clients: response?.data?.clients,
                cep: response?.data?.cep,
                dateFinish: response?.data?.dateFinish,
                description: response?.data?.description,
            });
            setEditMode(false);
            setLoadingInfo(false);
            toast.success("Projeto atualizado com sucesso !!!");
        } catch (err) {
            setLoadingInfo(false);
            console.log(err);
            toast.error("Erro ao atualizar projeto !!!");
        }
    }

    async function HandleRemoveOwnership(clientId) {
        try {
            setLoading(true);

            await axios.put(
                // `https://piarq.herokuapp.com/clientes/removeownership`,
                `http://localhost:5000/clientes/removeownership`,
                {},
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                        project: String(id),
                        client: String(clientId),
                    },
                }
            );
            GetProject(session);
            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
            toast.error("Erro ao retirar cliente de projeto !!!");
        }
    }

    useEffect(() => {
        getSession();
    }, []);

    console.log(formEdit.clients);
    console.log(formEdit);

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
