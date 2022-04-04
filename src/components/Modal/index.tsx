interface Params {
    title: string;
    stepper?: any;
    open: boolean;
    handleClose: any;
    children: any;
    actions: any[];
}

import { Box, Typography, Modal, Divider } from "@mui/material/";
import Grid from "@mui/material/Grid";

export default function CustomModal({
    title,
    stepper,
    open,
    handleClose,
    children,
    actions,
}: Params) {
    const style = {
        position: "absolute" as "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "80vw",
        height: "500px",
        bgcolor: "background.paper",
        borderRadius: "20px",
        boxShadow: 24,
        p: 4,
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={style}>
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                >
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        {title ? title : stepper}
                    </Typography>
                </Grid>
                <Divider
                    variant="fullWidth"
                    sx={{ marginTop: "10px", marginBottom: "10px" }}
                />
                <Grid
                    container
                    spacing={1}
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                >
                    {children}
                </Grid>
                <Divider
                    variant="fullWidth"
                    sx={{ marginTop: "10px", marginBottom: "10px" }}
                />
                <Grid
                    container
                    direction="row"
                    justifyContent="center"
                    alignItems="center"
                    alignContent="center"
                    wrap="wrap"
                >
                    {actions.map((action) => action)}
                </Grid>
            </Box>
        </Modal>
    );
}
