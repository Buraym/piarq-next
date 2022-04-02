import { useEffect, useState, useRef } from "react";
import { Box, LinearProgress } from "@mui/material";

export default function LinearLoading() {
    const [progress, setProgress] = useState(0);
    const [buffer, setBuffer] = useState(0);
    const progressRef = useRef(() => {});
    useEffect(() => {
        progressRef.current = () => {
            if (progress > 100) {
                setProgress(0);
                setBuffer(10);
            } else {
                const diff = Math.random() * 10;
                const diff2 = Math.random() * 10;
                setProgress(progress + diff);
                setBuffer(progress + diff + diff2);
            }
        };
    });

    useEffect(() => {
        const timer = setInterval(() => {
            progressRef.current();
        }, 500);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <Box sx={{ width: "100%", height: "100%" }}>
            <LinearProgress
                variant="buffer"
                value={progress}
                valueBuffer={buffer}
                sx={{ color: "#ffb703" }}
            />
        </Box>
    );
}
