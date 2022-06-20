import { useMemo, useState, useCallback, useEffect } from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Grid, Button, Typography } from "@mui/material";

const center = [-25.4928, -54.5739];
const zoom = 13;

function DisplayPosition({ map, setLocalization }) {
    const [position, setPosition] = useState(() => map.getCenter());

    const onClick = useCallback(() => {
        map.setView([-25.4928, -54.5739], zoom);
    }, [map]);

    const onMove = useCallback(() => {
        setLocalization({
            lat: map.getCenter().lat.toFixed(4),
            long: map.getCenter().lng.toFixed(4),
        });
        setPosition(map.getCenter());
    }, [map]);

    useEffect(() => {
        map.on("move", onMove);
        return () => {
            map.off("move", onMove);
        };
    }, [map, onMove]);

    return (
        <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            alignContent="center"
            wrap="wrap"
            style={{ paddingTop: 10, paddingBottom: 10 }}
        >
            <Button onClick={() => onClick()}>
                <Typography fontWeight="bold">SALVAR</Typography>
            </Button>
            <Button onClick={() => onClick()}>
                <Typography fontWeight="bold">REDEFINIR</Typography>
            </Button>
        </Grid>
    );
}

export default function Map({ localization, setLocalization }) {
    const [map, setMap] = useState(null);

    const displayMap = useMemo(
        () => (
            <MapContainer
                center={[localization.lat, localization.long]}
                zoom={localization.zoom}
                scrollWheelZoom={false}
                ref={setMap}
                style={{ height: 200, width: "100%" }}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        ),
        []
    );

    return (
        <div style={{ width: "100%", height: "100%" }}>
            {displayMap}
            {map ? (
                <DisplayPosition map={map} setLocalization={setLocalization} />
            ) : null}
        </div>
    );
}
