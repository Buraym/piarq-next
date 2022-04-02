import { TextField, MenuItem } from "@mui/material";
import Button from "../../Button";
import { useRouter } from "next/router";
import Input from "../../Unform/Input";

interface Params {
    list: Array<any>;
    placeholder: string;
    value: any;
    handleChange: any;
}

export default function Select({
    list,
    placeholder,
    value,
    handleChange,
}: Params) {
    return (
        <TextField
            id="outlined-select-currency"
            select
            label="Select"
            value={value}
            onChange={handleChange}
            helperText={placeholder}
        >
            {list.map((item) => {
                <MenuItem key={item.value} value={item.value}>
                    {item.label}
                </MenuItem>;
            })}
        </TextField>
    );
}
