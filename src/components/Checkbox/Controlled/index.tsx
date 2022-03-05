import { Checkbox } from "unform-material-ui";

interface Params {
  name: string;
  checked: boolean;
}

export default function CustomCheckbox({ name, checked, ...rest }: Params) {
  return <Checkbox name={name} checked={checked} color="default" {...rest} />;
}
