import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/lab/";
import DateAdapter from "@mui/lab/AdapterDateFns";

interface Params {
    value: any;
    setValue: any;
    label: string;
}

export default function CustomDatePicker({ value, setValue, label }: Params) {
    return (
        <LocalizationProvider dateAdapter={DateAdapter}>
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
