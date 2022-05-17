import {
    Card,
    CardMedia,
    CardContent,
    Typography,
    Grid,
    CardActionArea,
} from "@mui/material";
import Button from "../../Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useState, useEffect } from "react";

export default function CardCliente({ data, refresh }) {
    const [session, setSession] = useState(null);
    const router = useRouter();

    async function getSession() {
        const sessionJSON = JSON.parse(window.localStorage.getItem("session"));
        if (sessionJSON) {
            setSession(sessionJSON);
        } else {
            setSession(null);
        }
    }

    async function HandleDeleteCliente(id) {
        try {
            await axios.delete(
                `https://piarq.herokuapp.com/clientes/delete`,
                // `http://localhost:5000/clientes/delete`,
                {
                    headers: {
                        token: `Bearer ${session.token}`,
                        id: session._id,
                        client: id,
                    },
                }
            );
            toast.success("Cliente deletado com sucesso !!!");
            refresh();
        } catch (err) {
            console.log(err);
            toast.error("Houve um erro ao tentar excluir os cliente !!!");
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
                justifyContent: "center",
                flexDirection: "column",
                margin: "20px",
            }}
        >
            <CardActionArea
                style={{
                    width: "300px",
                    height: "220px",
                }}
                onClick={() => router.push("/clientes/" + data._id)}
            >
                <CardMedia
                    component="img"
                    image={data.image}
                    height={220}
                ></CardMedia>
            </CardActionArea>
            <CardContent
                style={{
                    display: "flex",
                    padding: "5px",
                    height: "80px",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    scrollbarWidth: "none",
                    flexWrap: "wrap",
                }}
            >
                <Grid
                    container
                    direction="column"
                    justifyContent="center"
                    alignItems="flex-start"
                    alignContent="flex-start"
                    wrap="wrap"
                    overflow="hidden"
                    style={{ width: "47.5%", marginLeft: "2.5%" }}
                >
                    <Typography fontSize={12} fontWeight="bold">
                        {data.name}
                    </Typography>
                    <Typography fontSize={12} fontWeight="bold">
                        {data.identity}
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                    style={{ width: "47.5%", marginLeft: "2.5%" }}
                >
                    <Button
                        variant="text"
                        f={() => router.push("/clientes/" + data.id)}
                        cor="#ffba08"
                    >
                        <EditIcon />
                    </Button>
                    <Button
                        variant="text"
                        f={() => HandleDeleteCliente(data._id)}
                        cor="#ffba08"
                    >
                        <DeleteForeverIcon />
                    </Button>
                </Grid>
            </CardContent>
        </Card>
    );
}
