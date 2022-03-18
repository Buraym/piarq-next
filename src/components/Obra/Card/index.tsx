import {
    Card,
    CardHeader,
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

interface Params {
    data: any;
}
export default function CardObra({ data }: Params) {
    const router = useRouter();

    function HandleDeleteObra(id) {
        console.log(id);
    }

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
                onClick={() =>
                    console.log(
                        "O Card de " +
                            data.name +
                            " foi clicado eserá levado para a página 'http://localhost:3000/cliente/" +
                            data.id
                    )
                }
            >
                <CardMedia
                    component="img"
                    image={data.image}
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
                    style={{ width: "47.5%", marginLeft: "2.5%" }}
                >
                    <Typography fontSize={12} fontWeight="bold">
                        {"CLIENTE: "}
                        {data.clientName}
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
                        {"ENTREGA: "}
                        {data.finishDate}
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
                        overflow: "hidden",
                    }}
                    overflow="-moz-hidden-unscrollable"
                >
                    <Typography fontSize={12} fontWeight="bold">
                        {data.description}
                    </Typography>
                </Grid>
            </CardContent>
            <CardActions
                style={{
                    width: "280px",
                    height: "40px",
                    justifyContent: "flex-start",
                    flexDirection: "row",
                    alignContent: "center",
                    alignItems: "center",
                }}
            >
                <Button
                    variant="text"
                    f={() => HandleDeleteObra(data.id)}
                    cor="#ffba08"
                >
                    <DeleteForeverIcon />
                </Button>
                <Button
                    variant="text"
                    f={() => router.push("/obra/" + data.id)}
                    cor="#ffba08"
                >
                    <EditIcon />
                </Button>
            </CardActions>
        </Card>
    );
}
