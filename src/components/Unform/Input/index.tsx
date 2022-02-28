import { TextField } from "unform-material-ui"
import { styled } from "@mui/system"

export default function Input({ name, cor, variant, ...rest }) {
    const CustomInput = styled(TextField)({
        "& label.Mui-focused": {
            color: cor
        },
        "& .MuiInput-underline:after": {
            borderBottomColor: cor
        },
        "& .MuiOutlinedInput-root": {
            "& fieldset": {
                borderColor: cor
            },
            "&:hover fieldset": {
                borderColor: cor
            },
            "&.Mui-focused fieldset": {
                borderColor: cor
            }
        }
    })

    return <CustomInput name={name} variant={variant || "outlined"} {...rest} />
}
