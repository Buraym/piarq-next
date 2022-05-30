/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/exhaustive-deps */
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
    InputAdornment,
    Tooltip,
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
    QuestionMark,
} from "@mui/icons-material";
import CustomModal from "../../src/components/Modal";
import CardContentItem from "../../src/components/CardContent";

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
    const [addType, setAddType] = useState("projectionCost");
    const [formAdd, setFormAdd] = useState({
        type: "projectionCost",
        EstimatedConstructionArea: 0,
        FeesBase: 0,
        PercentualFactor: 0,
        UniqueContructionArea: 0,
        RepeatedConstructionArea: 0,
        Reductor: 0,
        MarketCorrectionValue: 0,
    });
    const [projectComplexity, setProjectComplexity] = useState("");
    const [repeatedAreaQuantity, setRepeatedAreaQuantity] = useState(0);
    const [projectRegionLocalization, setProjectRegionLocalization] =
        useState("");
    const [allClients, setAllClients] = useState([]);
    const [step, setStep] = useState(0);
    const router = useRouter();
    const [openModal, setOpenModal] = useState(false);
    const modalActions = [
        <Button
            key={0}
            variant="contained"
            type="submit"
            style={{ backgroundColor: "#ffba08" }}
            onClick={() => HandleCreateSubProject(formAdd.type)}
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
            label: "Conteúdo",
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
                        height: "320px",
                        padding: 10,
                    }}
                >
                    {projeto?.subprojects?.map((item, index) => {
                        const date = `${new Date(
                            item?.date
                        ).getDay()}/${new Date(
                            item?.date
                        ).getMonth()}/${new Date(item?.date).getFullYear()}`;
                        const data = {
                            name: item.name,
                            date: date,
                            type: item.type,
                            price: projeto.ProjectionPriceValue,
                            areaContructed: projeto.EstimatedConstructionArea,
                            reductor: projeto.Reductor,
                            marketCorrection: projeto.MarketCorrectionValue,
                            baseFees: projeto.FeesBase,
                        };
                        return (
                            <CardContentItem data={data} type={"subproject"} />
                        );
                    })}

                    <AddCircle
                        style={{ marginLeft: 50 }}
                        onClick={() => setOpenModal(!openModal)}
                    />
                    {openModal && (
                        <CustomModal
                            title={`Criação de ${
                                formAdd.type === "projectionCost"
                                    ? "Custeio de Honorario de projeção"
                                    : "Subprojeto"
                            }`}
                            open={openModal}
                            handleClose={setOpenModal}
                            actions={modalActions}
                        >
                            {formAdd.type === "projectionCost" && (
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
                                            label="Area Estimada de construção do Projeto"
                                            type="number"
                                            value={
                                                formAdd.EstimatedConstructionArea
                                            }
                                            onChange={(event) =>
                                                Number(event?.target.value) >= 0
                                                    ? setFormAdd({
                                                          ...formAdd,
                                                          EstimatedConstructionArea:
                                                              Number(
                                                                  event?.target
                                                                      .value
                                                              ),
                                                      })
                                                    : setFormAdd({
                                                          ...formAdd,
                                                          EstimatedConstructionArea:
                                                              Number(0),
                                                      })
                                            }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        m²
                                                    </InputAdornment>
                                                ),
                                            }}
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
                                            label="Base de Honorarios"
                                            type="number"
                                            value={formAdd.FeesBase}
                                            onChange={(ev) =>
                                                Number(ev?.target.value) >= 0
                                                    ? setFormAdd({
                                                          ...formAdd,
                                                          FeesBase: Number(
                                                              Number(
                                                                  ev?.target
                                                                      .value
                                                              )
                                                          ),
                                                      })
                                                    : setFormAdd({
                                                          ...formAdd,
                                                          FeesBase: Number(
                                                              Number(0)
                                                          ),
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
                                        overflow="hidden"
                                        style={{
                                            width: "23%",
                                            marginBottom: 10,
                                            marginTop: 15,
                                            paddingTop: 5,
                                            marginLeft: "1.5%",
                                            marginRight: "0.5%",
                                        }}
                                    >
                                        <TextField
                                            label="Índice de Complexidade"
                                            type="number"
                                            InputLabelProps={{ shrink: true }}
                                            value={projectComplexity}
                                            onChange={(ev) =>
                                                setProjectComplexity(
                                                    ev.target.value
                                                )
                                            }
                                            sx={{ width: "100%" }}
                                            select
                                        >
                                            <MenuItem value="Baixo">
                                                Baixo
                                            </MenuItem>
                                            <MenuItem value="Médio">
                                                Médio
                                            </MenuItem>
                                            <MenuItem value="Alto">
                                                Alto
                                            </MenuItem>
                                            <MenuItem value="Especial">
                                                Especial
                                            </MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid
                                        container
                                        direction="row"
                                        justifyContent="center"
                                        alignItems="center"
                                        alignContent="center"
                                        wrap="wrap"
                                        overflow="hidden"
                                        style={{
                                            width: "23%",
                                            marginBottom: 10,
                                            marginTop: 15,
                                            paddingTop: 5,
                                            marginLeft: "0.5%",
                                            marginRight: "1.5%",
                                        }}
                                    >
                                        <TextField
                                            label="Fator percentual"
                                            type="text"
                                            value={
                                                (
                                                    formAdd.PercentualFactor *
                                                    100
                                                ).toFixed(2) + "%"
                                            }
                                            InputProps={{
                                                readOnly: true,
                                            }}
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
                                        overflow="hidden"
                                        style={{
                                            width: "23%",
                                            marginBottom: 10,
                                            marginTop: 15,
                                            paddingTop: 5,
                                            marginLeft: "1.5%",
                                            marginRight: "0.5%",
                                        }}
                                    >
                                        <TextField
                                            label="Quantidade de Areas Repetidas em unidade"
                                            type="number"
                                            InputLabelProps={{ shrink: true }}
                                            value={repeatedAreaQuantity}
                                            onChange={(ev) =>
                                                Number(ev?.target.value) >= 0
                                                    ? setRepeatedAreaQuantity(
                                                          Number(
                                                              ev?.target.value
                                                          )
                                                      )
                                                    : setRepeatedAreaQuantity(
                                                          Number(0)
                                                      )
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
                                        overflow="hidden"
                                        style={{
                                            width: "23%",
                                            marginBottom: 10,
                                            marginTop: 15,
                                            paddingTop: 5,
                                            marginLeft: "0.5%",
                                            marginRight: "1.5%",
                                        }}
                                    >
                                        <TextField
                                            label="Fator de Redução"
                                            type="text"
                                            value={
                                                (
                                                    formAdd.Reductor * 100
                                                ).toFixed(2) + "%"
                                            }
                                            InputProps={{
                                                readOnly: true,
                                            }}
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
                                            label="Area de construção repetida"
                                            type="number"
                                            value={
                                                formAdd.RepeatedConstructionArea
                                            }
                                            onChange={(event) =>
                                                setFormAdd({
                                                    ...formAdd,
                                                    RepeatedConstructionArea:
                                                        Number(
                                                            event?.target.value
                                                        ),
                                                })
                                            }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        m²
                                                    </InputAdornment>
                                                ),
                                            }}
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
                                            label="Area de Construção única"
                                            value={
                                                formAdd.UniqueContructionArea
                                            }
                                            onChange={(event) =>
                                                Number(event?.target.value) >= 0
                                                    ? setFormAdd({
                                                          ...formAdd,
                                                          UniqueContructionArea:
                                                              Number(
                                                                  event?.target
                                                                      .value
                                                              ),
                                                      })
                                                    : setFormAdd({
                                                          ...formAdd,
                                                          UniqueContructionArea:
                                                              Number(0),
                                                      })
                                            }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="start">
                                                        m²
                                                    </InputAdornment>
                                                ),
                                            }}
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
                                            label="Estado Regional do projeto"
                                            type="number"
                                            InputLabelProps={{ shrink: true }}
                                            value={projectRegionLocalization}
                                            onChange={(ev) =>
                                                setProjectRegionLocalization(
                                                    ev.target.value
                                                )
                                            }
                                            sx={{ width: "100%" }}
                                            select
                                        >
                                            <MenuItem value="Acre" disabled>
                                                Acre ( AC )
                                            </MenuItem>
                                            <MenuItem value="Alagoas" disabled>
                                                Alagoas ( AL )
                                            </MenuItem>
                                            <MenuItem value="Amapá" disabled>
                                                Amapá ( AP )
                                            </MenuItem>
                                            <MenuItem value="Amazonas" disabled>
                                                Amazonas ( AM )
                                            </MenuItem>
                                            <MenuItem value="Bahia" disabled>
                                                Bahia ( BA )
                                            </MenuItem>
                                            <MenuItem value="Ceará" disabled>
                                                Ceará ( CE )
                                            </MenuItem>
                                            <MenuItem
                                                value="Espírito Santo"
                                                disabled
                                            >
                                                Espírito Santo ( ES )
                                            </MenuItem>
                                            <MenuItem value="Goiás" disabled>
                                                Goiás ( GO )
                                            </MenuItem>
                                            <MenuItem value="Maranhão" disabled>
                                                Maranhão ( MA )
                                            </MenuItem>
                                            <MenuItem
                                                value="Mato Grosso"
                                                disabled
                                            >
                                                Mato Grosso ( MT )
                                            </MenuItem>
                                            <MenuItem
                                                value="Mato Grosso do Sul"
                                                disabled
                                            >
                                                Mato Grosso do Sul ( MS )
                                            </MenuItem>
                                            <MenuItem
                                                value="Minas Gerais"
                                                disabled
                                            >
                                                Minas Gerais ( MG )
                                            </MenuItem>
                                            <MenuItem value="Pará" disabled>
                                                Pará ( PA )
                                            </MenuItem>
                                            <MenuItem value="Paraíba" disabled>
                                                Paraíba ( PB )
                                            </MenuItem>
                                            <MenuItem value="Paraná">
                                                Paraná ( PR )
                                            </MenuItem>
                                            <MenuItem
                                                value="Pernambuco"
                                                disabled
                                            >
                                                Pernambuco ( PE )
                                            </MenuItem>
                                            <MenuItem value="Piauí" disabled>
                                                Piauí ( PI )
                                            </MenuItem>
                                            <MenuItem
                                                value="Rio Grande do Norte"
                                                disabled
                                            >
                                                Rio Grande do Norte ( RN )
                                            </MenuItem>
                                            <MenuItem
                                                value="Rio Grande do Sul"
                                                disabled
                                            >
                                                Rio Grande do Sul ( RS )
                                            </MenuItem>
                                            <MenuItem value="Rondônia" disabled>
                                                Rondônia ( RO )
                                            </MenuItem>
                                            <MenuItem value="Roraima" disabled>
                                                Roraima ( RR )
                                            </MenuItem>
                                            <MenuItem
                                                value="Santa Catarina"
                                                disabled
                                            >
                                                Santa Catarina ( SC )
                                            </MenuItem>
                                            <MenuItem
                                                value="São Paulo"
                                                disabled
                                            >
                                                São Paulo ( SP )
                                            </MenuItem>
                                            <MenuItem value="Sergipe" disabled>
                                                Sergipe ( SE )
                                            </MenuItem>
                                            <MenuItem
                                                value="Tocantins"
                                                disabled
                                            >
                                                Tocantins ( TO )
                                            </MenuItem>
                                            <MenuItem
                                                value="Distrito Federal"
                                                disabled
                                            >
                                                Distrito Federal ( DF )
                                            </MenuItem>
                                        </TextField>
                                    </Grid>
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
                                            marginRight: "1%",
                                            marginLeft: "1.5%",
                                        }}
                                    >
                                        <TextField
                                            label="Valor de Correção de Mercado"
                                            value={
                                                (
                                                    formAdd.MarketCorrectionValue *
                                                    100
                                                ).toFixed(2) + "%"
                                            }
                                            onChange={(ev) =>
                                                Number(ev?.target.value) >= 0
                                                    ? setFormAdd({
                                                          ...formAdd,
                                                          MarketCorrectionValue:
                                                              Number(
                                                                  ev.target
                                                                      .value
                                                              ),
                                                      })
                                                    : setFormAdd({
                                                          ...formAdd,
                                                          MarketCorrectionValue:
                                                              Number(0),
                                                      })
                                            }
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <Tooltip
                                                            title="Porcentagem do valor total a ser descontada"
                                                            placement="left-start"
                                                            arrow
                                                            followCursor
                                                        >
                                                            <QuestionMark />
                                                        </Tooltip>
                                                    </InputAdornment>
                                                ),
                                            }}
                                            sx={{ width: "100%" }}
                                        />
                                    </Grid>
                                </Grid>
                            )}
                        </CustomModal>
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
                `https://piarq.herokuapp.com/projetos/update`,
                // `http://localhost:5000/projetos/update`,
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

    async function HandleCreateSubProject(type) {
        try {
            if (type === "projectionCost") {
                setLoadingInfo(true);
                const response = await axios.post(
                    `https://piarq.herokuapp.com/projetos/projectioncost`,
                    // `http://localhost:5000/projetos/projectioncost`,
                    {
                        date: new Date(
                            new Date().getFullYear(),
                            new Date().getMonth(),
                            new Date().getDate()
                        ).getTime(),
                        estimatedConstructionArea:
                            formAdd.EstimatedConstructionArea,
                        feesBase: formAdd.FeesBase,
                        percentalFactor: formAdd.PercentualFactor,
                        uniqueContructionArea: formAdd.UniqueContructionArea,
                        repeatedConstructionArea:
                            formAdd.RepeatedConstructionArea,
                        reductor: formAdd.Reductor,
                        marketCorrectionValue: formAdd.MarketCorrectionValue,
                    },
                    {
                        headers: {
                            token: `Bearer ${session.token}`,
                            id: session._id,
                            project: String(id),
                        },
                    }
                );
                setProjeto(response.data);
                setFormAdd({
                    type: "projectionCost",
                    EstimatedConstructionArea: 0,
                    FeesBase: 0,
                    PercentualFactor: 0,
                    UniqueContructionArea: 0,
                    RepeatedConstructionArea: 0,
                    Reductor: 0,
                    MarketCorrectionValue: 0,
                });
                setLoadingInfo(false);
                toast.success("Custeio criado com sucesso !!!");
            }
        } catch (err) {
            console.log(err);
            toast.error("Erro ao criar SubProjeto !!!");
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

    function CalculatePercentualFactor(value) {
        if (value === "Baixo") {
            if (formAdd.EstimatedConstructionArea <= 250) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0733,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 251 &&
                formAdd.EstimatedConstructionArea <= 500
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0644,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 501 &&
                formAdd.EstimatedConstructionArea <= 1000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0566,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 1001 &&
                formAdd.EstimatedConstructionArea <= 2000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0497,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 2001 &&
                formAdd.EstimatedConstructionArea <= 4000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0436,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 4001 &&
                formAdd.EstimatedConstructionArea <= 8000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0383,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 8001 &&
                formAdd.EstimatedConstructionArea <= 16000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0336,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 16001 &&
                formAdd.EstimatedConstructionArea <= 32000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0295,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 32001 &&
                formAdd.EstimatedConstructionArea <= 64000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0259,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 64001 &&
                formAdd.EstimatedConstructionArea <= 128000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0228,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 128001 &&
                formAdd.EstimatedConstructionArea <= 256000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.2,
                });
            } else {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.02,
                });
            }
        } else if (value === "Médio") {
            if (formAdd.EstimatedConstructionArea <= 250) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0839,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 251 &&
                formAdd.EstimatedConstructionArea <= 500
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0737,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 501 &&
                formAdd.EstimatedConstructionArea <= 1000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0647,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 1001 &&
                formAdd.EstimatedConstructionArea <= 2000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0568,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 2001 &&
                formAdd.EstimatedConstructionArea <= 4000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0499,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 4001 &&
                formAdd.EstimatedConstructionArea <= 8000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0438,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 8001 &&
                formAdd.EstimatedConstructionArea <= 16000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0385,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 16001 &&
                formAdd.EstimatedConstructionArea <= 32000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0338,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 32001 &&
                formAdd.EstimatedConstructionArea <= 64000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0297,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 64001 &&
                formAdd.EstimatedConstructionArea <= 128000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0261,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 128001 &&
                formAdd.EstimatedConstructionArea <= 256000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0229,
                });
            } else {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0229,
                });
            }
        } else if (value === "Alto") {
            if (formAdd.EstimatedConstructionArea <= 250) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0961,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 251 &&
                formAdd.EstimatedConstructionArea <= 500
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0844,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 501 &&
                formAdd.EstimatedConstructionArea <= 1000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0741,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 1001 &&
                formAdd.EstimatedConstructionArea <= 2000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0651,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 2001 &&
                formAdd.EstimatedConstructionArea <= 4000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0571,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 4001 &&
                formAdd.EstimatedConstructionArea <= 8000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0502,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 8001 &&
                formAdd.EstimatedConstructionArea <= 16000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0441,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 16001 &&
                formAdd.EstimatedConstructionArea <= 32000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0387,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 32001 &&
                formAdd.EstimatedConstructionArea <= 64000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.034,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 64001 &&
                formAdd.EstimatedConstructionArea <= 128000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0298,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 128001 &&
                formAdd.EstimatedConstructionArea <= 256000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0262,
                });
            } else {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0262,
                });
            }
        } else if (value === "Especial") {
            if (formAdd.EstimatedConstructionArea <= 250) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.11,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 251 &&
                formAdd.EstimatedConstructionArea <= 500
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0966,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 501 &&
                formAdd.EstimatedConstructionArea <= 1000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0848,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 1001 &&
                formAdd.EstimatedConstructionArea <= 2000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0745,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 2001 &&
                formAdd.EstimatedConstructionArea <= 4000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0654,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 4001 &&
                formAdd.EstimatedConstructionArea <= 8000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0574,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 8001 &&
                formAdd.EstimatedConstructionArea <= 16000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0504,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 16001 &&
                formAdd.EstimatedConstructionArea <= 32000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0443,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 32001 &&
                formAdd.EstimatedConstructionArea <= 64000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0389,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 64001 &&
                formAdd.EstimatedConstructionArea <= 128000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.0342,
                });
            } else if (
                formAdd.EstimatedConstructionArea > 128001 &&
                formAdd.EstimatedConstructionArea <= 256000
            ) {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.03,
                });
            } else {
                setFormAdd({
                    ...formAdd,
                    PercentualFactor: 0.03,
                });
            }
        }
    }

    function CalculateReductionPercentage(value) {
        if (value === 0) {
            setFormAdd({
                ...formAdd,
                Reductor: 1,
            });
        } else if (value === 1) {
            setFormAdd({
                ...formAdd,
                Reductor: 0.98,
            });
        } else if (value === 2 || value === 3) {
            setFormAdd({
                ...formAdd,
                Reductor: 0.94,
            });
        } else if (value >= 4 && value < 8) {
            setFormAdd({
                ...formAdd,
                Reductor: 0.84,
            });
        } else if (value >= 8 && value < 16) {
            setFormAdd({
                ...formAdd,
                Reductor: 0.76,
            });
        } else if (value >= 16 && value < 32) {
            setFormAdd({
                ...formAdd,
                Reductor: 0.64,
            });
        } else if (value >= 32 && value < 64) {
            setFormAdd({
                ...formAdd,
                Reductor: 0.5,
            });
        } else if (value >= 64 && value < 128) {
            setFormAdd({
                ...formAdd,
                Reductor: 0.25,
            });
        } else {
            setFormAdd({
                ...formAdd,
                Reductor: 0.125,
            });
        }
    }

    function CalculateMarketValueCorrection(value) {
        if (value === "Paraná") {
            setFormAdd({
                ...formAdd,
                MarketCorrectionValue: 0.34,
            });
        }
    }

    useEffect(() => {
        CalculatePercentualFactor(projectComplexity);
    }, [projectComplexity, formAdd.EstimatedConstructionArea]);

    useEffect(() => {
        CalculateReductionPercentage(repeatedAreaQuantity);
    }, [repeatedAreaQuantity]);

    useEffect(() => {
        CalculateMarketValueCorrection(projectRegionLocalization);
    }, [projectRegionLocalization]);

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
