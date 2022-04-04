import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Grid,
    CardActionArea,
} from "@mui/material";
import Button from "../../Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

export default function CardCliente({ data }) {
    const router = useRouter();

    function HandleDeleteCliente(id) {}

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
                    height: "200px",
                }}
                onClick={() => router.push("/clientes/" + data.id)}
            >
                <CardMedia
                    component="img"
                    image={data.image}
                    height={200}
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
                    style={{ width: "47.5%", marginLeft: "2.5%" }}
                >
                    <Typography fontSize={12} fontWeight="bold">
                        {"NOME: "}
                        {data.name}
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
                    <Typography fontSize={12} fontWeight="bold">
                        {"CPF/CNPJ: "}
                        {data.document}
                    </Typography>
                </Grid>
            </CardContent>
            <CardActions
                style={{
                    height: "40px",
                    justifyContent: "space-evenly",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                    marginBottom: "10px",
                }}
            >
                <Button
                    variant="text"
                    f={() => HandleDeleteCliente(data.id)}
                    cor="#ffba08"
                >
                    <DeleteForeverIcon />
                </Button>
                <Button
                    variant="text"
                    f={() => router.push("/clientes/" + data.id)}
                    cor="#ffba08"
                >
                    <EditIcon />
                </Button>
            </CardActions>
        </Card>
    );
}
