import { Card, CardContent, Grid } from "@mui/material";
import Button from "../../Button";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import PersonAddAltRoundedIcon from "@mui/icons-material/PersonAddAltRounded";
import { useRouter } from "next/router";
import { useState } from "react";

export default function CardCliente() {
    const router = useRouter();
    const [open, setOpen] = useState(false);

    return (
        <Card
            style={{
                display: "flex",
                width: "300px",
                height: "300px",
                justifyContent: "center",
                flexDirection: "column",
                margin: "30px",
            }}
        >
            {!open ? (
                <Button variant="text" f={() => setOpen(true)} cor="#ffba08">
                    <AddCircleRoundedIcon />
                </Button>
            ) : (
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
                    ></Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                        wrap="wrap"
                        style={{ width: "47.5%", marginLeft: "2.5%" }}
                    ></Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        style={{ width: "100%" }}
                    >
                        <Button
                            variant="text"
                            // f={() => router.push("/cliente/" + data.id)}
                            cor="#ffba08"
                        >
                            <PersonAddAltRoundedIcon />
                        </Button>
                    </Grid>
                </CardContent>
            )}
        </Card>
    );
}
