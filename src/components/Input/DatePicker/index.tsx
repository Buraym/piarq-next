import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider, AdapterDateFns } from "@mui/lab";

interface Params {
    value: any;
    setValue: any;
    label: string;
}

export default function CustomDatePicker({ value, setValue, label }: Params) {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={label}
                value={value}
                onChange={(newValue) => {
                    setValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    );
}
