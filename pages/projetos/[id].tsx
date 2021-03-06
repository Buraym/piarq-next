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
    IconButton,
    Fade,
} from "@mui/material";
import InputMask from "react-input-mask";
import { Key, useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomStepper from "../../src/components/Stepper";
import dynamic from "next/dynamic";
import {
    ImageRounded,
    DocumentScannerRounded,
    AddCircle,
    Edit,
    Close,
    Send,
    DeleteForever,
    QuestionMark,
} from "@mui/icons-material";
import CustomModal from "../../src/components/Modal";
import CardContentItem from "../../src/components/CardContent";
import { format, parseISO } from "date-fns";
const Map = dynamic(() => import("../../src/components/Map"), {
    ssr: false,
});

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
    const [localization, setLocalization] = useState({
        lat: -25.4317,
        long: -54.4559,
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
            label: "Informa????o",
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
                                    width: "100%",
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
                                ) : editMode ? (
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
                                        <Typography>{projeto?.name}</Typography>
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
                                ) : editMode ? (
                                    <TextField
                                        label="Endere??o"
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
                                            Endere??o:
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
                                {loadingInfo ? (
                                    <Skeleton
                                        variant="text"
                                        height={40}
                                        width={245}
                                    >
                                        <Typography variant="body1"></Typography>
                                    </Skeleton>
                                ) : editMode ? (
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
                                                    {selected?.map((value) => (
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
                                                    ))}
                                                </Grid>
                                            )}
                                        >
                                            {allClients.map((item, index) => (
                                                <MenuItem
                                                    key={index}
                                                    value={item}
                                                >
                                                    {item?.name}
                                                </MenuItem>
                                            ))}
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
                                {loadingInfo ? (
                                    <Skeleton
                                        variant="text"
                                        height={40}
                                        width={245}
                                    >
                                        <Typography variant="body1"></Typography>
                                    </Skeleton>
                                ) : editMode ? (
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
                                        <Typography>{projeto?.cep}</Typography>
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
                                ) : editMode ? (
                                    <TextField
                                        label="Data de Entrega"
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
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
                                {loadingInfo ? (
                                    <Skeleton
                                        variant="text"
                                        height={40}
                                        width={245}
                                    >
                                        <Typography variant="body1"></Typography>
                                    </Skeleton>
                                ) : editMode ? (
                                    <TextField
                                        label="Descri????o"
                                        defaultValue={projeto?.description}
                                        value={formEdit.description}
                                        onChange={(ev) => {
                                            setFormEdit({
                                                ...formEdit,
                                                description: ev.target.value,
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
                                                Descri????o:
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
                                {loadingInfo ? (
                                    <>
                                        <Skeleton
                                            variant="rectangular"
                                            width={117.5}
                                            height={50}
                                            style={{ marginRight: 10 }}
                                        ></Skeleton>
                                        <Skeleton
                                            variant="rectangular"
                                            width={117.5}
                                            height={50}
                                        ></Skeleton>
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
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Latitude"
                            value={localization.lat}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Longitude"
                            value={localization.long}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Map
                            localization={{ ...localization, zoom: 13 }}
                            setLocalization={setLocalization}
                        />
                    </Grid>
                </Grid>
            ),
        },
        // {
        //     label: "Documentos",
        //     content: (
        //         <Grid
        //             item
        //             direction="row"
        //             justifyContent="flex-start"
        //             alignItems="center"
        //             alignContent="center"
        //             wrap="wrap"
        //             sx={{
        //                 display: "flex",
        //                 width: "90vw",
        //                 height: "150px",
        //                 padding: "10px",
        //                 overflowY: "scroll",
        //             }}
        //         >
        //             {projeto?.docs?.map((doc, index) => (
        //                 <Grid
        //                     key={index}
        //                     container
        //                     direction="column"
        //                     justifyContent="center"
        //                     alignItems="center"
        //                     alignContent="center"
        //                     sx={{
        //                         width: "250px",
        //                         height: "150px",
        //                         marginRight: "30px",
        //                     }}
        //                 >
        //                     <DocumentScannerRounded />
        //                     <Typography fontWeight="bolder">
        //                         {doc?.label}
        //                     </Typography>
        //                 </Grid>
        //             ))}
        //         </Grid>
        //     ),
        // },
        {
            label: "Conte??do",
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
                        minWidth: 295,
                        minHeight: 320,
                        padding: 10,
                    }}
                >
                    {projeto?.subprojects?.map(
                        (
                            item: {
                                date: string | number | Date;
                                name: any;
                                type: any;
                                ProjectionPriceValue: any;
                                EstimatedConstructionArea: any;
                                Reductor: any;
                                MarketCorrectionValue: any;
                                FeesBase: any;
                                _id: any;
                            },
                            index: Key
                        ) => {
                            const date = `${new Date(
                                item?.date
                            ).getDay()}/${new Date(
                                item?.date
                            ).getMonth()}/${new Date(
                                item?.date
                            ).getFullYear()}`;
                            const data = {
                                name: item.name,
                                date: date,
                                type: item.type,
                                price: item.ProjectionPriceValue,
                                areaContructed: item.EstimatedConstructionArea,
                                reductor: item.Reductor,
                                marketCorrection: item.MarketCorrectionValue,
                                baseFees: item.FeesBase,
                            };
                            return (
                                <CardContentItem
                                    key={index}
                                    data={data}
                                    type={"subproject"}
                                    onDelete={() =>
                                        HandleDeleteSubProject(item._id)
                                    }
                                    onEdit={() =>
                                        console.log(
                                            "Ainda preciso fazer isso tamb??m !!!"
                                        )
                                    }
                                    onRemoveOwner={() =>
                                        console.log(
                                            "Ufff ! muita coisa pra fazer"
                                        )
                                    }
                                />
                            );
                        }
                    )}

                    <IconButton
                        style={{ marginLeft: 50 }}
                        onClick={() => setOpenModal(!openModal)}
                    >
                        <AddCircle />
                    </IconButton>

                    {openModal && (
                        <CustomModal
                            title={`Cria????o de ${
                                formAdd.type === "projectionCost"
                                    ? "Custeio de Honorario de proje????o"
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
                                            label="Area Estimada de constru????o do Projeto"
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
                                                        m??
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
                                            label="??ndice de Complexidade"
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
                                            <MenuItem value="M??dio">
                                                M??dio
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
                                            label="Fator de Redu????o"
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
                                            label="Area de constru????o repetida"
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
                                                        m??
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
                                            label="Area de Constru????o ??nica"
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
                                                        m??
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
                                            <MenuItem value="Amap??" disabled>
                                                Amap?? ( AP )
                                            </MenuItem>
                                            <MenuItem value="Amazonas" disabled>
                                                Amazonas ( AM )
                                            </MenuItem>
                                            <MenuItem value="Bahia" disabled>
                                                Bahia ( BA )
                                            </MenuItem>
                                            <MenuItem value="Cear??" disabled>
                                                Cear?? ( CE )
                                            </MenuItem>
                                            <MenuItem
                                                value="Esp??rito Santo"
                                                disabled
                                            >
                                                Esp??rito Santo ( ES )
                                            </MenuItem>
                                            <MenuItem value="Goi??s" disabled>
                                                Goi??s ( GO )
                                            </MenuItem>
                                            <MenuItem value="Maranh??o" disabled>
                                                Maranh??o ( MA )
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
                                            <MenuItem value="Par??" disabled>
                                                Par?? ( PA )
                                            </MenuItem>
                                            <MenuItem value="Para??ba" disabled>
                                                Para??ba ( PB )
                                            </MenuItem>
                                            <MenuItem value="Paran??">
                                                Paran?? ( PR )
                                            </MenuItem>
                                            <MenuItem
                                                value="Pernambuco"
                                                disabled
                                            >
                                                Pernambuco ( PE )
                                            </MenuItem>
                                            <MenuItem value="Piau??" disabled>
                                                Piau?? ( PI )
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
                                            <MenuItem value="Rond??nia" disabled>
                                                Rond??nia ( RO )
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
                                                value="S??o Paulo"
                                                disabled
                                            >
                                                S??o Paulo ( SP )
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
                                            label="Valor de Corre????o de Mercado"
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
            setLoadingInfo(true);
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
            setLoadingInfo(false);
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
        const clients = value
            .map((item) => {
                if (formEdit.clients.includes(item)) {
                    return item;
                } else {
                    return null;
                }
            })
            .filter((item) => item !== null);

        console.log(clients);
        setFormEdit({
            ...formEdit,
            clients: clients,
        });
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
                setOpenModal(false);
                setLoadingInfo(false);
                toast.success("Custeio criado com sucesso !!!");
                getSession();
            }
        } catch (err) {
            console.log(err);
            toast.error("Erro ao criar conte??do de projeto !!!");
        }
    }

    async function HandleRemoveOwnership(clientId) {
        try {
            setLoading(true);

            await axios.put(
                `https://piarq.herokuapp.com/clientes/removeownership`,
                // `http://localhost:5000/clientes/removeownership`,
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

    async function HandleDeleteSubProject(subProjectId) {
        try {
            await axios.post(
                `https://piarq.herokuapp.com/projetos/projectioncost/delete`,
                // `http://localhost:5000/projetos/projectioncost/delete`,
                {},
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        project: String(id),
                        projectioncost: String(subProjectId),
                        id: session._id,
                    },
                }
            );
            getSession();
        } catch (err) {
            console.log(err);
            toast.error("Erro ao remover subprojeto !!!");
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
        } else if (value === "M??dio") {
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
        if (value === "Paran??") {
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
            <ToastContainer autoClose={2000} position={"top-right"} />
            <Menu image={session?.user?.image} />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
                spacing={1}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    alignContent="flex-start"
                    wrap="wrap"
                    sx={{ width: "90vw", height: 200 }}
                >
                    {projeto?.name ? (
                        <Typography fontFamily={"Pacifico"} fontSize={40}>
                            {projeto?.name + " "}
                            {/* <ImageRounded
                                    style={{
                                        color: "#ffb703",
                                        textShadow: "4px 4px #ffb703",
                                    }}
                                /> */}
                        </Typography>
                    ) : (
                        <Skeleton height={70} width={280}>
                            <Typography
                                fontFamily={"Pacifico"}
                                fontSize={40}
                            ></Typography>
                        </Skeleton>
                    )}
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    alignContent="flex-start"
                    wrap="wrap"
                    overflow="scroll"
                    sx={{ width: "90vw" }}
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
                            Informa????es
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
                                width: "100%",
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
                            ) : editMode ? (
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
                                    <Typography>{projeto?.name}</Typography>
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
                            ) : editMode ? (
                                <TextField
                                    label="Endere??o"
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
                                        Endere??o:
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
                            {loadingInfo ? (
                                <Skeleton
                                    variant="text"
                                    height={40}
                                    width={245}
                                >
                                    <Typography variant="body1"></Typography>
                                </Skeleton>
                            ) : editMode ? (
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
                                        {allClients.map((item, index) => (
                                            <MenuItem key={index} value={item}>
                                                {item?.name}
                                            </MenuItem>
                                        ))}
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
                                                projeto.clients.length > 1 ? (
                                                    <Chip
                                                        key={index}
                                                        label={
                                                            <Typography fontWeight="bold">
                                                                {cliente?.name}
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
                                                            marginLeft: "3px",
                                                            marginRight: "3px",
                                                        }}
                                                    ></Chip>
                                                ) : (
                                                    <Chip
                                                        key={index}
                                                        label={
                                                            <Typography fontWeight="bold">
                                                                {cliente?.name}
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
                            {loadingInfo ? (
                                <Skeleton
                                    variant="text"
                                    height={40}
                                    width={245}
                                >
                                    <Typography variant="body1"></Typography>
                                </Skeleton>
                            ) : editMode ? (
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
                                    <Typography>{projeto?.cep}</Typography>
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
                            ) : editMode ? (
                                <TextField
                                    label="Data de Entrega"
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
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
                            {loadingInfo ? (
                                <Skeleton
                                    variant="text"
                                    height={40}
                                    width={245}
                                >
                                    <Typography variant="body1"></Typography>
                                </Skeleton>
                            ) : editMode ? (
                                <TextField
                                    label="Descri????o"
                                    defaultValue={projeto?.description}
                                    value={formEdit.description}
                                    onChange={(ev) => {
                                        setFormEdit({
                                            ...formEdit,
                                            description: ev.target.value,
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
                                    wrap="nowrap"
                                >
                                    <Typography
                                        align="justify"
                                        style={{ wordBreak: "break-word" }}
                                    >
                                        {projeto?.description}
                                    </Typography>
                                </Grid>
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    alignContent="flex-start"
                    wrap="wrap"
                    spacing={1}
                    overflow="scroll"
                    sx={{ width: "90vw" }}
                >
                    <Typography
                        variant="button"
                        fontWeight="bold"
                        fontSize={20}
                    >
                        Localiza????o
                    </Typography>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Latitude"
                            value={localization.lat}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Longitude"
                            value={localization.long}
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Map
                            localization={{ ...localization, zoom: 13 }}
                            setLocalization={setLocalization}
                        />
                    </Grid>
                </Grid>
                <Grid
                    item
                    direction="column"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    alignContent="flex-start"
                    wrap="nowrap"
                    sx={{
                        width: "90vw",
                    }}
                >
                    <Typography
                        variant="button"
                        fontWeight="bold"
                        fontSize={20}
                    >
                        Projetos
                        <IconButton onClick={() => setOpenModal(!openModal)}>
                            <AddCircle />
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
                        style={{ height: 400 }}
                    >
                        {projeto?.subprojects?.map(
                            (
                                item: {
                                    date: string | number | Date;
                                    name: any;
                                    type: any;
                                    ProjectionPriceValue: any;
                                    EstimatedConstructionArea: any;
                                    Reductor: any;
                                    MarketCorrectionValue: any;
                                    FeesBase: any;
                                    _id: any;
                                },
                                index: Key
                            ) => {
                                const date = `${new Date(
                                    item?.date
                                ).getDay()}/${new Date(
                                    item?.date
                                ).getMonth()}/${new Date(
                                    item?.date
                                ).getFullYear()}`;
                                const data = {
                                    name: item.name,
                                    date: date,
                                    type: item.type,
                                    price: item.ProjectionPriceValue,
                                    areaContructed:
                                        item.EstimatedConstructionArea,
                                    reductor: item.Reductor,
                                    marketCorrection:
                                        item.MarketCorrectionValue,
                                    baseFees: item.FeesBase,
                                };
                                return (
                                    <CardContentItem
                                        key={index}
                                        data={data}
                                        type={"subproject"}
                                        onDelete={() =>
                                            HandleDeleteSubProject(item._id)
                                        }
                                        onEdit={() =>
                                            console.log(
                                                "Ainda preciso fazer isso tamb??m !!!"
                                            )
                                        }
                                        onRemoveOwner={() =>
                                            console.log(
                                                "Ufff ! muita coisa pra fazer"
                                            )
                                        }
                                    />
                                );
                            }
                        )}

                        {openModal && (
                            <CustomModal
                                title={`Cria????o de ${
                                    formAdd.type === "projectionCost"
                                        ? "Custeio de Honorario de proje????o"
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
                                                label="Area Estimada de constru????o do Projeto"
                                                type="number"
                                                value={
                                                    formAdd.EstimatedConstructionArea
                                                }
                                                onChange={(event) =>
                                                    Number(
                                                        event?.target.value
                                                    ) >= 0
                                                        ? setFormAdd({
                                                              ...formAdd,
                                                              EstimatedConstructionArea:
                                                                  Number(
                                                                      event
                                                                          ?.target
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
                                                            m??
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
                                                    Number(ev?.target.value) >=
                                                    0
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
                                                label="??ndice de Complexidade"
                                                type="number"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
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
                                                <MenuItem value="M??dio">
                                                    M??dio
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
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={repeatedAreaQuantity}
                                                onChange={(ev) =>
                                                    Number(ev?.target.value) >=
                                                    0
                                                        ? setRepeatedAreaQuantity(
                                                              Number(
                                                                  ev?.target
                                                                      .value
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
                                                label="Fator de Redu????o"
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
                                                label="Area de constru????o repetida"
                                                type="number"
                                                value={
                                                    formAdd.RepeatedConstructionArea
                                                }
                                                onChange={(event) =>
                                                    setFormAdd({
                                                        ...formAdd,
                                                        RepeatedConstructionArea:
                                                            Number(
                                                                event?.target
                                                                    .value
                                                            ),
                                                    })
                                                }
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            m??
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
                                                label="Area de Constru????o ??nica"
                                                value={
                                                    formAdd.UniqueContructionArea
                                                }
                                                onChange={(event) =>
                                                    Number(
                                                        event?.target.value
                                                    ) >= 0
                                                        ? setFormAdd({
                                                              ...formAdd,
                                                              UniqueContructionArea:
                                                                  Number(
                                                                      event
                                                                          ?.target
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
                                                            m??
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
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                value={
                                                    projectRegionLocalization
                                                }
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
                                                <MenuItem
                                                    value="Alagoas"
                                                    disabled
                                                >
                                                    Alagoas ( AL )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Amap??"
                                                    disabled
                                                >
                                                    Amap?? ( AP )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Amazonas"
                                                    disabled
                                                >
                                                    Amazonas ( AM )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Bahia"
                                                    disabled
                                                >
                                                    Bahia ( BA )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Cear??"
                                                    disabled
                                                >
                                                    Cear?? ( CE )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Esp??rito Santo"
                                                    disabled
                                                >
                                                    Esp??rito Santo ( ES )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Goi??s"
                                                    disabled
                                                >
                                                    Goi??s ( GO )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Maranh??o"
                                                    disabled
                                                >
                                                    Maranh??o ( MA )
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
                                                <MenuItem value="Par??" disabled>
                                                    Par?? ( PA )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Para??ba"
                                                    disabled
                                                >
                                                    Para??ba ( PB )
                                                </MenuItem>
                                                <MenuItem value="Paran??">
                                                    Paran?? ( PR )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Pernambuco"
                                                    disabled
                                                >
                                                    Pernambuco ( PE )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Piau??"
                                                    disabled
                                                >
                                                    Piau?? ( PI )
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
                                                <MenuItem
                                                    value="Rond??nia"
                                                    disabled
                                                >
                                                    Rond??nia ( RO )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Roraima"
                                                    disabled
                                                >
                                                    Roraima ( RR )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Santa Catarina"
                                                    disabled
                                                >
                                                    Santa Catarina ( SC )
                                                </MenuItem>
                                                <MenuItem
                                                    value="S??o Paulo"
                                                    disabled
                                                >
                                                    S??o Paulo ( SP )
                                                </MenuItem>
                                                <MenuItem
                                                    value="Sergipe"
                                                    disabled
                                                >
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
                                                label="Valor de Corre????o de Mercado"
                                                value={
                                                    (
                                                        formAdd.MarketCorrectionValue *
                                                        100
                                                    ).toFixed(2) + "%"
                                                }
                                                onChange={(ev) =>
                                                    Number(ev?.target.value) >=
                                                    0
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
                </Grid>
                {/* <CustomStepper
                            steps={steps}
                            step={step}
                            setStep={setStep}
                            orientation="vertical"
                        /> */}
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
