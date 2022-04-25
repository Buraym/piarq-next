import {
    Card,
    CardMedia,
    CardContent,
    CardActions,
    Typography,
    Grid,
    CardActionArea,
    CardHeader,
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
                    height: "220px",
                }}
                onClick={() => router.push("/clientes/" + data.id)}
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
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                    overflow="hidden"
                    style={{ width: "47.5%", marginLeft: "2.5%" }}
                >
                    <Typography fontSize={12} fontWeight="bold">
                        {data.name}
                    </Typography>
                    <Typography fontSize={12} fontWeight="bold">
                        {data.document}
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
                        f={() => HandleDeleteCliente(data.id)}
                        cor="#ffba08"
                    >
                        <DeleteForeverIcon />
                    </Button>
                </Grid>
            </CardContent>
        </Card>
    );
}
