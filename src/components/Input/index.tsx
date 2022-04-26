import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";

interface Params {
    label: string;
    cor: string;
    variant: "standard" | "filled" | "outlined";
    value: any;
    setValue?: any;
    onChangeFunction?: any;
    required?: boolean;
    fullwidth?: boolean;
    margin?: "none" | "dense" | "normal";
    multiline?: boolean;
    select?: boolean;
}

export default function CustomUncontrolledInput({
    label,
    cor,
    variant,
    value,
    setValue,
    onChangeFunction,
    required,
    fullwidth,
    margin,
    multiline,
    select,
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
            value={value}
            onChange={() => onChangeFunction()}
            label={label}
            variant={variant}
            required={required}
            fullWidth={fullwidth}
            margin={margin}
            multiline={multiline}
            select={select}
        />
    );
}
