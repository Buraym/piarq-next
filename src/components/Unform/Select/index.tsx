import { MenuItem } from "@mui/material";
import { Select } from "unform-material-ui";
interface Params {
    list: Array<any>;
    placeholder: string;
    value: any;
}

export default function CustomControlledSelect({
    list,
    placeholder,
    value,
}: Params) {
    return (
        <>
            <Select multiple name={value} label={placeholder}>
                {list.map((item) => {
                    <MenuItem key={item.value} value={item.value}>
                        {item.label}
                    </MenuItem>;
                })}
            </Select>
        </>
    );
}
