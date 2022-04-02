import { TextField, Autocomplete } from "@mui/material/";

interface Params {
    options: Array<any>;
    value: any;
    setValue: any;
    label: string;
    width: number;
}

export default function CustomAutocomplete({
    options,
    label,
    value,
    setValue,
    width,
}: Params) {
    return (
        <Autocomplete
            disablePortal
            options={options}
            value={value}
            sx={{ width: width }}
            renderInput={(params) => <TextField {...params} label={label} />}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
        />
    );
}
