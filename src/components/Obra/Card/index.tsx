import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Chip,
    Typography,
    Grid,
    CardActionArea,
    Avatar,
    Divider,
} from "@mui/material";
import Button from "../../Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import axios from "axios";
import {
    useState,
    useEffect,
    ReactChild,
    ReactFragment,
    ReactPortal,
} from "react";
import { clientes } from "../../../../testdata";

export default function CardObra({ data, refresh }) {
    const router = useRouter();
    const [session, setSession] = useState(null);

    async function HandleDeleteObra(id) {
        console.log(id);
        try {
            await axios.delete(
                "https://piarq.herokuapp.com//projetos/delete",
                // "http://localhost:5000/projetos/delete",
                {
                    headers: {
                        token: `Bearer ${session?.token}`,
                        id: session?._id,
                        project: id,
                    },
                }
            );
            toast.success("Obra deletada com sucesso!");
            refresh();
        } catch (err) {
            console.log(err);
            toast.error("Houve um erro ao tentar deletar a obra !!!");
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

    console.log(data);

    return (
        <Card
            style={{
                display: "flex",
                width: "300px",
                height: "360px",
                justifyContent: "center",
                flexDirection: "column",
                margin: "20px",
            }}
        >
            <CardActionArea
                style={{
                    width: "300px",
                    height: "180px",
                }}
                onClick={() => router.push("/projetos/" + data?._id)}
            >
                <CardMedia
                    component="img"
                    image={data?.image}
                    height={180}
                ></CardMedia>
            </CardActionArea>
            <CardContent
                style={{
                    display: "flex",
                    padding: "10px",
                    height: "170px",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    scrollbarWidth: "none",
                    flexWrap: "wrap",
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
                        width: "62.5%",
                        marginLeft: "2.5%",
                        fontWeight: "bold",
                    }}
                >
                    <Chip label={data?.name} size="small" />
                </Grid>

                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                    style={{ width: "32.5%", marginLeft: "2.5%" }}
                >
                    <Typography fontSize={12} fontWeight="bold">
                        <Chip label={data.dateFinish} size="small" />
                    </Typography>
                </Grid>

                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    wrap="wrap"
                    sx={{
                        height: "70px",
                        marginTop: "10px",
                        scrollbarWidth: "none",
                    }}
                    overflow="scroll"
                >
                    <Typography fontSize={12} fontWeight="bold">
                        {`Demandantes: ${data?.clients.map(
                            (client, clientIndex) =>
                                ` ${client?.name}${
                                    clientIndex >= 0 ? "" : ", "
                                }`
                        )}`}
                    </Typography>
                    <Divider
                        flexItem
                        orientation="horizontal"
                        variant="fullWidth"
                        style={{
                            height: 2,
                            width: 300,
                            marginTop: 5,
                            marginBottom: 5,
                        }}
                    />
                    <Typography fontSize={12} fontWeight="bold">
                        {data.description}
                    </Typography>
                </Grid>
            </CardContent>
            <CardActions
                style={{
                    width: "280px",
                    height: "35px",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    variant="text"
                    f={() => HandleDeleteObra(data._id)}
                    cor="#ffba08"
                >
                    <DeleteForeverIcon />
                </Button>
            </CardActions>
        </Card>
    );
}
