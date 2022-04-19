import { orange } from "@mui/material/colors";
import { Checkbox } from "unform-material-ui";

interface Params {
    name: string;
    checked?: boolean;
    f?: any;
}

export default function CustomCheckbox({ name, checked, f, ...rest }: Params) {
    return (
        <Checkbox
            name={name}
            onClick={f}
            checked={checked}
            style={{
                color: orange[600],
            }}
            {...rest}
        />
    );
}
