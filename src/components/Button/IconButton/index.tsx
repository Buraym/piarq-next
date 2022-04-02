import IconButton from "@mui/material/IconButton";

interface Params {
    ariaLabel?: string;
    children: any;
}

export default function CustomIconButton({ ariaLabel, children }: Params) {
    return (
        <IconButton aria-label={ariaLabel} component="span">
            {children}
        </IconButton>
    );
}
