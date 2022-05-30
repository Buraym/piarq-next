import {
    Grid,
    Typography,
    Chip,
    Button,
    Skeleton,
    InputAdornment,
    Tooltip,
    IconButton,
    Card,
    Box,
    CardContent,
    CardActions,
} from "@mui/material";
import { DeleteForever, Refresh, Close } from "@mui/icons-material";

export default function CardContentItem({ data, type }) {
    const bull = (
        <Box
            component="span"
            sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
        >
            •
        </Box>
    );
    console.log(data);

    return type === "subproject" ? (
        <Card variant="elevation" style={{ padding: 10, width: 320 }}>
            <CardContent>
                <Typography
                    sx={{ fontSize: 15 }}
                    color="text.secondary"
                    gutterBottom
                >
                    {data.type === "projectionCost" ? "Custeio" : ""}
                    {bull}
                    {data.date}
                </Typography>
                <Typography variant="h5" component="div" fontWeight="bold">
                    {data.name}
                </Typography>
                {data.type === "projectionCost" && (
                    <Grid
                        container
                        direction="column"
                        justifyContent="center"
                        alignItems="flex-start"
                        alignContent="center"
                        wrap="nowrap"
                    >
                        <Typography>
                            Custo de Projeção: R$ {data.price}
                        </Typography>
                        <Typography>
                            Area Construída M²: {data.areaContructed}
                        </Typography>
                        <Typography>
                            Fator de Redução: {data.reductor * 100}%
                        </Typography>
                        <Typography>
                            Correção de mercado: {data.marketCorrection * 100}%
                        </Typography>
                        <Typography>
                            Base de honorarios: R$ {data.baseFees}
                        </Typography>
                    </Grid>
                )}
            </CardContent>
            <CardActions>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                >
                    <Button
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
                        style={{
                            width: "47.5%",
                            marginLeft: "1.25%",
                            marginRight: "1.25%",
                            backgroundColor: "#ffba08",
                        }}
                    >
                        <Refresh style={{ color: "white" }} />
                    </Button>
                    {/* <IconButton>
                        <DeleteForever style={{ color: "red" }} />
                    </IconButton> */}
                </Grid>
            </CardActions>
        </Card>
    ) : type === "projects" ? (
        <></>
    ) : type === "document" ? (
        <></>
    ) : (
        <></>
    );
}
