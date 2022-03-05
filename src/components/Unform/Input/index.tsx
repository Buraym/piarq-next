import { TextField } from "unform-material-ui";
import { styled } from "@mui/system";

interface Params {
  name: string;
  cor: string;
  variant?: "standard" | "filled" | "outlined";
  label: string;
  fullWidth: boolean;
}

export default function Input({
  name,
  cor,
  variant,
  label,
  fullWidth,
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
      {...rest}
    />
  );
}
