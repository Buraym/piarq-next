import { Paper } from "@mui/material";

interface Params {
    src: string;
    alt: string;
}

export default function ImageFrame({ src, alt }: Params) {
    return (
        <Paper variant="outlined" sx={{ padding: "10px" }}>
            <img src={src} alt={alt} />
        </Paper>
    );
}
