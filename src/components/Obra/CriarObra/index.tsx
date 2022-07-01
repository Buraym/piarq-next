import {
    Card,
    Grid,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
    FormControl,
    MenuItem,
    Chip,
    OutlinedInput,
    Select,
    InputLabel,
} from "@mui/material";
import Button from "../../Button";
import { useRouter } from "next/router";
import { ExpandMoreOutlined, MapsHomeWorkTwoTone } from "@mui/icons-material";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function CardCriarObra({ refresh }) {
    const router = useRouter();
    const [session, setSession] = useState(null);

    const [image, setImage] = useState(null);
    const [client, setClient] = useState([]);
    const [clients, setClients] = useState([]);
    const [name, setName] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateFinish, setDateFinish] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    function HandleChangeClient(value) {
        console.log(value);
        if (client.indexOf(value) === -1) {
            setClient(value);
        } else {
            setClient([client.filter((item) => item !== value)]);
        }
    }

    async function Handlesubmit() {
        if (
            name === "" ||
            dateStart === "" ||
            dateFinish === "" ||
            address === "" ||
            description === "" ||
            client.length === 0
        ) {
            toast.error("Preencha todos os campos !!!");
        } else {
            if (client) {
                try {
                    setLoading(true);
                    const data = {
                        ...image,
                        clients: client.map((item) => item?._id),
                        name,
                        user: session?._id,
                        dateStart,
                        dateFinish,
                        address,
                        description,
                    };
                    const response = await axios.post(
                        "https://piarq.herokuapp.com/projetos/create",
                        // "http://localhost:5000/projetos/create",
                        data,
                        {
                            headers: {
                                id: session._id,
                                token: `Bearer ${session?.token}`,
                            },
                        }
                    );
                    toast.success("Projeto criada com sucesso!");
                    refresh();
                    setLoading(false);
                } catch (err) {
                    console.log(err);
                    setLoading(false);
                }
            }
        }
    }

    async function getClients(session) {
        try {
            setLoading(true);
            const response = await axios.get(
                "https://piarq.herokuapp.com/clientes/list",
                // "http://localhost:5000/clientes/list",
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                    },
                }
            );
            console.log(response.data);
            setClients(response.data);
            setLoading(false);
            setOptions(response.data);
        } catch (err) {
            setLoading(false);
            console.log(err);
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
        await getClients(sessionJSON);
    }

    useEffect(() => {
        getSession();
    }, []);

    return (
        <Card
            style={{
                display: "flex",
                width: "300px",
                height: "360px",
                justifyContent: "flex-start",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflowY: "scroll",
                margin: "20px",
            }}
        >
            <Grid
                container
                spacing={1}
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                wrap="wrap"
                sx={{ width: 250, marginBottom: 5, marginTop: 2 }}
            >
                {/* <Accordion
                    sx={{
                        width: 250,
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                        <Typography>Imagem da Projeto</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
                            spacing={1}
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                        >
                            {image ? (
                                <Image
                                    src={image}
                                    alt="Landscape picture"
                                    width={500}
                                    height={500}
                                />
                            ) : (
                                <CustomIconButton ariaLabel="Botão de upload de foto">
                                    <PhotoCameraBackTwoTone
                                        style={{ color: "#ffba08" }}
                                    />
                                </CustomIconButton>
                            )}
                        </Grid>
                    </AccordionDetails>
                </Accordion> */}

                <Accordion sx={{ width: 250 }}>
                    <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                        <Typography>Atributos do projeto</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            overflow="hidden"
                            style={{
                                width: "100%",
                                marginTop: 20,
                                paddingTop: "10px",
                            }}
                        >
                            <TextField
                                label="Nome do projeto"
                                value={name}
                                onChange={(ev) => setName(ev?.target?.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            style={{ width: "100%", paddingTop: "10px" }}
                        >
                            <TextField
                                label="Endereço do projeto"
                                value={address}
                                onChange={(ev) => setAddress(ev?.target.value)}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            style={{ width: "100%", paddingTop: "10px" }}
                        >
                            <TextField
                                label="Data de Começo"
                                value={dateStart}
                                onChange={(ev) =>
                                    setDateStart(ev?.target?.value)
                                }
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            style={{ width: "100%", paddingTop: "10px" }}
                        >
                            <TextField
                                label="Data de Entrega"
                                value={dateFinish}
                                onChange={(ev) =>
                                    setDateFinish(ev?.target?.value)
                                }
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            style={{ width: "100%", paddingTop: "10px" }}
                        >
                            <TextField
                                label="Descrição breve do projeto"
                                value={description}
                                fullWidth
                                onChange={(ev) =>
                                    setDescription(ev?.target?.value)
                                }
                                variant="outlined"
                                multiline
                            />
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{ width: 250, marginBottom: 6 }}>
                    <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                        <Typography>Atributos do Cliente do projeto</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            style={{ width: "100%" }}
                        >
                            <FormControl fullWidth>
                                <InputLabel id="clientes">
                                    {`Cliente(s)`}
                                </InputLabel>
                                <Select
                                    multiple
                                    value={client}
                                    labelId="clientes"
                                    label={`Cliente(s)`}
                                    fullWidth
                                    onChange={(ev) =>
                                        HandleChangeClient(ev?.target?.value)
                                    }
                                    input={<OutlinedInput label="Chip" />}
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
                                            {selected?.map((value) => (
                                                <Chip
                                                    key={value}
                                                    label={
                                                        <Typography
                                                            fontWeight="bold"
                                                            fontSize={12}
                                                        >
                                                            {value?.name}
                                                        </Typography>
                                                    }
                                                />
                                            ))}
                                        </Grid>
                                    )}
                                >
                                    {clients?.map((item, index) => (
                                        <MenuItem key={index} value={item}>
                                            {item?.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    </AccordionDetails>
                </Accordion>
            </Grid>
            <Grid
                container
                direction="row"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                wrap="wrap"
                sx={{ width: 250, marginBottom: 2 }}
            >
                <Button
                    variant="contained"
                    type="submit"
                    f={() => Handlesubmit()}
                    cor="#ffba08"
                >
                    <MapsHomeWorkTwoTone style={{ color: "#ffba08" }} />
                    Cadastrar Projeto
                </Button>
            </Grid>
        </Card>
    );
}
