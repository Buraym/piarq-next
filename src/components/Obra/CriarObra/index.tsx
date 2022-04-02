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
import Input from "../../Unform/Input";
import {
    ExpandMoreOutlined,
    PhotoCameraBackTwoTone,
    MapsHomeWorkTwoTone,
} from "@mui/icons-material";
import CustomIconButton from "../../Button/IconButton";
import { useState, useEffect } from "react";
import CustomAutocomplete from "../../Input/AutoComplete";
import axios from "axios";
import CustomUncontrolledInput from "../../Input";
import { ClassNames } from "@emotion/react";

interface Params {
    userEmail: string;
}

export default function CardCriarObra({ userEmail }: Params) {
    const router = useRouter();

    const [image, setImage] = useState(null);
    const [client, setClient] = useState(null);
    const [name, setName] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateFinish, setDateFinish] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");

    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(true);

    function Handlesubmit() {
        if (image && client) {
            try {
                const data = {
                    ...image,
                    ...client,
                    name,
                    dateStart,
                    dateFinish,
                    address,
                    description,
                };
                // setLoading(true);
                console.log(data);
                // setLoading(false);
            } catch (err) {
                console.log(err);
                // setLoading(false);
            }
        } else {
            window.alert("você deve preencher todos os campos !!!");
        }
    }

    async function getClients() {
        try {
            // setLoading(true);
            // const response = await axios.get(
            //     "dominio da requisição para pegar os clientes",
            //     {
            //         params: { user: userEmail },
            //     }
            // );
            // setLoading(false);
            // setOptions(response.data);
        } catch (err) {
            // setLoading(false);
            console.log(err);
        }
    }

    useEffect(() => {
        getClients();
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
                <Accordion
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
                                <img src={image} />
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
                            style={{ width: "100%", marginTop: 20 }}
                        >
                            <CustomUncontrolledInput
                                cor="ffba08"
                                label="Nome do projeto"
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
                            style={{ width: "100%" }}
                        >
                            <CustomUncontrolledInput
                                cor="ffba08"
                                label="Endereço do projeto"
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
                            style={{ width: "100%" }}
                        >
                            <CustomUncontrolledInput
                                cor="ffba08"
                                label="Data de Começo"
                                value={dateStart}
                                setValue={setDateStart}
                                variant="outlined"
                            />
                            <CustomUncontrolledInput
                                cor="ffba08"
                                label="Data de Entrega"
                                value={dateFinish}
                                setValue={setDateFinish}
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
                            style={{ width: "100%" }}
                        >
                            <CustomUncontrolledInput
                                cor="ffba08"
                                label="Descrição breve do projeto"
                                value={description}
                                setValue={setDescription}
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
                            <CustomAutocomplete
                                label="Cliente do Projeto"
                                value={client}
                                setValue={setClient}
                                options={options}
                                width={250}
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
                    <MapsHomeWorkTwoTone style={{ color: "#ffba08" }} />
                    Cadastrar Obra
                </Button>
            </Grid>
        </Card>
    );
}
