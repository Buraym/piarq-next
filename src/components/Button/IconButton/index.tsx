import IconButton from "@mui/material/IconButton";

interface Params {
    ariaLabel?: string;
    children: any;
    f: any;
}

export default function CustomIconButton({ ariaLabel, children, f }: Params) {
    return (
        <IconButton aria-label={ariaLabel} component="span" onClick={() => f()}>
            {children}
        </IconButton>
    );
}
