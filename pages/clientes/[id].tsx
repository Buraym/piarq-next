import NextHead from "../../src/components/defaultPage/NextHead";
import { useSession } from "next-auth/react";
import { Grid, Typography, Paper, Divider, Avatar } from "@mui/material";
import { useEffect, useState } from "react";
import Menu from "../../src/components/defaultPage/Menu";
import { useRouter } from "next/router";
import LinearLoading from "../../src/components/LinearLoading";
import CustomStepper from "../../src/components/Stepper";
import { BackupTable } from "@mui/icons-material";
import fotoTeste from "../../src/assets/clienteFotoTeste1.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

export default function Projetos() {
    const [loading, setLoading] = useState(true);
    const [projetos, setProjetos] = useState([]);
    const [cliente, setCliente] = useState(null);
    const [step, setStep] = useState(0);
    const router = useRouter();
    const { id } = router.query;
    const { data: session } = useSession();
    const steps = [
        {
            label: "Informação",
            content: (
                <Paper sx={{ padding: "10px" }} variant="outlined">
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                    >
                        <Typography fontWeight="bolder">Nome:</Typography>
                        <Typography sx={{ marginLeft: "5px" }}>
                            {cliente?.name}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                    >
                        <Typography fontWeight="bolder">Email:</Typography>
                        <Typography sx={{ marginLeft: "5px" }}>
                            {cliente?.email}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                    >
                        <Typography fontWeight="bolder">Contato:</Typography>
                        <Typography sx={{ marginLeft: "5px" }}>
                            {cliente?.contact
                                ? cliente.contact
                                : "nenhum contato disponível"}
                        </Typography>
                    </Grid>
                    <Grid
                        container
                        direction="row"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        alignContent="flex-start"
                        wrap="wrap"
                    >
                        <Typography fontWeight="bolder">Endereço:</Typography>
                        <Typography sx={{ marginLeft: "5px" }}>
                            {cliente?.address}
                        </Typography>
                    </Grid>
                </Paper>
            ),
        },
        {
            label: "Projetos",
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
                        height: "280px",
                        padding: "10px",
                        overflowY: "scroll",
                    }}
                >
                    {cliente?.projects.map((project, index) => (
                        <Grid
                            key={index}
                            container
                            direction="column"
                            justifyContent="center"
                            alignItems="center"
                            alignContent="center"
                            sx={{
                                width: "250px",
                                height: "200px",
                                padding: "15px",
                                margin: "30px",
                                borderRadius: "10px",
                                border: "1px solid #ffb703",
                            }}
                            onClick={() => {
                                router.push("/projetos/" + project?._id);
                            }}
                        >
                            <BackupTable style={{ color: "#ffb703" }} />
                            <Typography fontWeight="bolder">
                                {project?.name}
                            </Typography>
                        </Grid>
                    ))}
                </Grid>
            ),
        },
    ];

    async function GetClient() {
        try {
            setLoading(true);
            const response = await axios.get(
                "https://piarq.herokuapp.com/clientes/find",
                {
                    headers: {
                        id: String(id),
                    },
                }
            );
            setCliente(response.data);
            setLoading(false);
        } catch (err) {
            toast.error("Houve um erro ao tentar retornar os clientes !!!");
            setLoading(false);
        }
    }

    useEffect(() => {
        GetClient();
        session ? setLoading(false) : setLoading(false);
    }, [session]);

    return (
        <>
            <NextHead title="Piarq | Cliente" />
            <Menu image={session?.user?.image} />
            <Grid
                container
                direction="column"
                justifyContent="center"
                alignItems="center"
                alignContent="center"
            >
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    sx={{ width: "90vw", height: "180px", marginTop: "20px" }}
                >
                    <Avatar
                        src={cliente?.image}
                        sx={{ width: 72, height: 72 }}
                    />
                    <Divider
                        variant="middle"
                        // orientation="vertical"
                        sx={{ marginLeft: "10px", marginRight: "10px" }}
                    />
                    <Typography fontFamily={"Pacifico"} fontSize={"25px"}>
                        {cliente?.name}
                    </Typography>
                </Grid>
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="flex-start"
                    alignContent="flex-start"
                    wrap="wrap"
                    sx={{ width: "90vw", height: "100%" }}
                >
                    <CustomStepper
                        steps={steps}
                        step={step}
                        setStep={setStep}
                        orientation="vertical"
                    />
                </Grid>
            </Grid>
        </>
    );
}

// export async function getServerSideProps({ query }) {
//     const queryId = query.id;
//     try {
//         const response = await axios.get(
//             "http://localhost:5000/clientes/find",
//             {
//                 headers: {
//                     id: queryId,
//                 },
//             }
//         );
//         // const cliente = clientes.find((item) => item.id === queryId);
//         return {
//             props: { cliente: response.data },
//         };
//     } catch (err) {
//         console.error(err);
//     }
// }
