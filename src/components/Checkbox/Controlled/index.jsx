import { Checkbox } from 'unform-material-ui';

export default function CustomCheckbox({name, cor, checked, ...rest}){

    return(
        <Checkbox
            name={name}
            checked={checked}
            color="default"
            {...rest}
        />
    )
}