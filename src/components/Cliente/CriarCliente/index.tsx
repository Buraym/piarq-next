import {
    Card,
    Grid,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    TextField,
} from "@mui/material";
import Button from "../../Button";
import {
    ExpandMoreOutlined,
    PhotoCameraBackTwoTone,
    Person,
} from "@mui/icons-material";
import CustomIconButton from "../../Button/IconButton";
import { useState, useEffect } from "react";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function CardCriarCliente({ refresh }) {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");
    const [image, setImage] = useState("");
    const [address, setAddress] = useState("");
    const [documents, setDocuments] = useState("");
    const [email, setEmail] = useState("");
    const [contact, setContact] = useState("");

    async function Handlesubmit() {
        try {
            setLoading(true);
            const data = {
                image,
                name,
                identity,
                documents,
                address,
                email,
                contact,
                user: session._id,
                projects: [],
            };
            console.log(data);
            const response = await axios.post(
                // "https://piarq.herokuapp.com/clientes/create",
                "http://localhost:5000/clientes/create",
                data,
                {
                    headers: {
                        id: session._id,
                        token: `Bearer ${session?.token}`,
                    },
                }
            );
            console.log(response.data);
            toast.success("Cliente Cadastrado com sucesso !!!", {
                toastId: "0283028",
            });
            refresh();
            setLoading(false);
        } catch (err) {
            console.log(err);
            toast.error("Houve um erro ao tentar realizar o cadastro !!!");
            refresh();
            setLoading(false);
        }
    }

    async function getSession() {
        const sessionJSON = JSON.parse(window.localStorage.getItem("session"));
        if (sessionJSON) {
            setSession(sessionJSON);
        } else {
            setSession(null);
        }
    }

    useEffect(() => {
        getSession();
    }, []);

    return (
        <Card
            style={{
                display: "flex",
                width: "300px",
                height: "300px",
                justifyContent: "flex-start",
                alignContent: "center",
                alignItems: "center",
                flexDirection: "column",
                overflowY: "scroll",
                margin: "20px",
            }}
        >
            <ToastContainer autoClose={2000} position={"top-right"} />
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
                <Accordion
                    sx={{
                        width: 250,
                    }}
                >
                    <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                        <Typography>Imagem do Cliente</Typography>
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
                </Accordion>

                <Accordion sx={{ width: 250 }}>
                    <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                        <Typography>Atributos do Cliente</Typography>
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
                                paddingTop: 5,
                                marginBottom: 10,
                            }}
                        >
                            <TextField
                                label="Nome do Cliente"
                                value={name}
                                onChange={(event) =>
                                    setName(event?.target.value)
                                }
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            style={{ width: "100%", marginBottom: 10 }}
                        >
                            {/* <CustomUncontrolledInput
                                cor="ffba08"
                                label="Email do Cliente"
                                value={email}
                                setValue={setEmail}
                                variant="outlined"
                            /> */}
                            <TextField
                                label="Email do Cliente"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event?.target.value)
                                }
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            style={{ width: "100%", marginBottom: 10 }}
                        >
                            <TextField
                                label="Endereço do Cliente"
                                value={address}
                                onChange={(event) =>
                                    setAddress(event?.target.value)
                                }
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            style={{ width: "100%", marginBottom: 10 }}
                        >
                            <TextField
                                label="Identidade"
                                value={identity}
                                onChange={(event) =>
                                    setIdentity(event?.target.value)
                                }
                            />
                        </Grid>
                        <Grid
                            container
                            direction="row"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            wrap="wrap"
                            style={{ width: "100%", marginBottom: 10 }}
                        >
                            <TextField
                                label="Contato"
                                value={contact}
                                onChange={(event) =>
                                    setContact(event?.target.value)
                                }
                            />
                        </Grid>
                    </AccordionDetails>
                </Accordion>

                <Accordion sx={{ width: 250, marginBottom: 2 }}>
                    <AccordionSummary expandIcon={<ExpandMoreOutlined />}>
                        <Typography>Documentos do Cliente</Typography>
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
                            <TextField
                                label="Documentos"
                                value={documents}
                                onChange={(event) =>
                                    setDocuments(event?.target?.value)
                                }
                            />
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
                    f={() => Handlesubmit()}
                    cor="#ffba08"
                >
                    <Person style={{ color: "#ffba08" }} />
                    Cadastrar Cliente
                </Button>
            </Grid>
        </Card>
    );
}
