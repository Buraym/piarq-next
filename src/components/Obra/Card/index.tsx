import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Grid,
} from "@mui/material";

interface Params {
  data: {
    id: number;
    name: string;
    image: string;
    description: string;
    clientName: string;
    clientId: string;
    addres: string;
    finishDate: string;
  };
}
export default function CardObra({ data }: Params) {
  return (
    <Card>
      <CardHeader>
        <Typography fontSize={15} fontWeight="bold">
          {data.id}
          {" | "}
          {data.name}
        </Typography>
      </CardHeader>
      <CardMedia src={data.image} />
      <CardContent>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
          overflow="scroll"
          xs={6}
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
          overflow="scroll
          xs={6}"
        >
          <Typography fontSize={12} fontWeight="bold">
            {"CLIENTE CPF/CNPJ: "}
            {data.clientId}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
          overflow="scroll
          xs={6}"
        >
          <Typography fontSize={12} fontWeight="bold">
            {"ENDEREÇO: "}
            {data.addres}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
          overflow="scroll
          xs={6}"
        >
          <Typography fontSize={12} fontWeight="bold">
            {"DATA ENTREGA: "}
            {data.finishDate}
          </Typography>
        </Grid>
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          alignContent="center"
          wrap="wrap"
          overflow="scroll"
        >
          <Typography fontSize={12} fontWeight="bold">
            {data.description}
          </Typography>
        </Grid>
      </CardContent>
    </Card>
  );
}
