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
            color="default"
            {...rest}
        />
    );
}
