import {
    Card,
    Grid,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
} from "@mui/material";
import Button from "../../Button";
import { useRouter } from "next/router";
import {
    ExpandMoreOutlined,
    PhotoCameraBackTwoTone,
    Person,
} from "@mui/icons-material";
import CustomIconButton from "../../Button/IconButton";
import { useState, useEffect } from "react";
import CustomUncontrolledInput from "../../Input";
import Image from "next/image";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function CardCriarCliente() {
    const router = useRouter();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);
    const [name, setName] = useState("");
    const [identity, setIdentity] = useState("");
    const [image, setImage] = useState("");
    const [address, setAddress] = useState("");
    const [documents, setDocuments] = useState([]);
    const [email, setEmail] = useState("");

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
                projects: [],
            };
            const response = await axios.post(
                "http://localhost:5000/cliente/create",
                data
            );
            toast.success("Cliente Cadastrado com sucesso !!!", {
                toastId: "0283028",
            });
            setLoading(false);
        } catch (err) {
            toast.error("Houve um erro ao tentar realizar o cadastro !!!");
            setLoading(false);
        }
    }

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
                                marginBottom: 10,
                            }}
                        >
                            <CustomUncontrolledInput
                                cor="ffba08"
                                label="Nome do Cliente"
                                value={name}
                                setValue={setName}
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
                            style={{ width: "100%", marginBottom: 10 }}
                        >
                            <CustomUncontrolledInput
                                cor="ffba08"
                                label="Email do Cliente"
                                value={email}
                                setValue={setEmail}
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
                            style={{ width: "100%", marginBottom: 10 }}
                        >
                            <CustomUncontrolledInput
                                cor="ffba08"
                                label="Endereço do Cliente"
                                value={address}
                                setValue={setAddress}
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
                            style={{ width: "100%", marginBottom: 10 }}
                        >
                            <CustomUncontrolledInput
                                cor="ffba08"
                                label="Identidade"
                                value={identity}
                                setValue={setIdentity}
                                variant="outlined"
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
                            <CustomUncontrolledInput
                                cor="ffba08"
                                label="Documentos"
                                value={documents}
                                setValue={setDocuments}
                                variant="outlined"
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
                    type="submit"
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
