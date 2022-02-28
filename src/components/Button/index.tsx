import Button from "@mui/material/Button"
import { styled } from "@mui/system"

export default function ButtonCustom({
  cor,
  variant,
  children,
  type,
  size,
  ...rest
}) {
  const CustomButton = styled(Button)({
    color: cor,
    "&:hover": {
      color: cor
    },
    "&:active": {
      color: cor
    },
    "&:focus": {
      color: cor
    }
  })

  return (
    <CustomButton variant={variant} type={type} size={size} {...rest}>
      {children}
    </CustomButton>
  )
}
