import { TextField } from "unform-material-ui";
import { styled } from "@mui/system";
import { InputAdornment } from "@mui/material";

interface Params {
    name: string;
    cor: string;
    variant?: "standard" | "filled" | "outlined";
    label?: string;
    fullWidth?: boolean;
    required?: boolean;
    type?: string;
    endAction?: any;
}

export default function Input({
    name,
    cor,
    variant,
    label,
    fullWidth,
    required,
    type,
    endAction,
    ...rest
}: Params) {
    const CustomInput = styled(TextField)({
        "& label.Mui-focused": {
            color: cor,
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: cor,
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: cor,
            },
            "&:hover fieldset": {
                borderColor: cor,
            },
            "&.Mui-focused fieldset": {
                borderColor: cor,
            },
        },
    });

    return (
        <CustomInput
            name={name}
            variant={variant || "outlined"}
            label={label}
            fullWidth={fullWidth}
            required={required}
            type={type}
            InputProps={{
                endAdornment: (
                    <InputAdornment position="end">
                        {endAction ? endAction : <></>}
                    </InputAdornment>
                ),
            }}
            {...rest}
        />
    );
}
