import Button from "@mui/material/Button";
import { styled } from "@mui/system";

interface Params {
    cor: string;
    variant: "text" | "outlined" | "contained";
    children: any;
    type?: "button" | "submit" | "reset";
    size?: "small" | "medium" | "large";
    f?: any;
    fullWidth?: boolean;
    style?: any;
}

export default function ButtonCustom({
    cor,
    variant,
    children,
    type,
    size,
    f,
    fullWidth,
    style,
    ...rest
}: Params) {
    const CustomButton = styled(Button)({
        color: cor,
        background: "white",
        "&:hover": {
            color: cor,
            background: "white",
        },
        "&:active": {
            color: cor,
            background: "white",
        },
        "&:focus": {
            color: cor,
            background: "white",
        },
    });

    return (
        <CustomButton
            variant={variant}
            type={type}
            size={size}
            onClick={f}
            {...rest}
            style={style || { padding: "20px", borderRadius: "20px" }}
            fullWidth={fullWidth || false}
        >
            {children}
        </CustomButton>
    );
}
