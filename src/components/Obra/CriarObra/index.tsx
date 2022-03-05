import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from "@mui/material";
import Button from "../../Button";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import { useRouter } from "next/router";

export default function CardCriarObra() {
  const router = useRouter();

  function HandleDeleteObra(id) {
    console.log(id);
  }

  return (
    <Card
      style={{
        display: "flex",
        width: "300px",
        height: "400px",
        justifyContent: "center",
        flexDirection: "column",
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
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
        style={{ width: "100%" }}
      ></Grid>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        wrap="wrap"
        sx={{
          marginTop: "10px",
          scrollbarWidth: "none",
        }}
      ></Grid>
    </Card>
  );
}
