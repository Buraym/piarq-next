import { Box, Typography, Modal, Divider } from "@mui/material/";
import { Close } from "@mui/icons-material/";
import Fade from "@mui/material/Fade";
import Grid from "@mui/material/Grid";
import Button from "../Button/IconButton";

interface Params {
    title: string;
    stepper?: any;
    open: boolean;
    handleClose: any;
    children: any;
    actions: any[];
}

export default function CustomModal({
    title,
    stepper,
    open,
    handleClose,
    children,
    actions,
}: Params) {
    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: "320px",
        width: "80vw",
        maxwidth: "850px",
        bgcolor: "background.paper",
        boxShadow: 24,
        p: 4,
        padding: 0,
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    alignContent="center"
                    wrap="wrap"
                    sx={{
                        width: "100%",
                        height: "12%",
                        padding: "25px",
                    }}
                >
                    {title ? (
                        <Typography
                            id="modal-modal-title"
                            fontWeight="bold"
                            fontSize={20}
                        >
                            {title}
                        </Typography>
                    ) : (
                        stepper
                    )}
                    <Button f={() => handleClose(!open)}>
                        <Close />
                    </Button>
                </Grid>
                <Divider variant="fullWidth" sx={{ marginBottom: "10px" }} />
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                    sx={{ width: "100%", marginBottom: "50px" }}
                >
                    {children}
                </Grid>
                <Divider variant="fullWidth" sx={{ marginBottom: "10px" }} />
                <Grid
                    container
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                    sx={{
                        width: "100%",
                        padding: "10px",
                    }}
                >
                    {actions?.map((action) => action)}
                </Grid>
            </Box>
        </Modal>
    );
}
