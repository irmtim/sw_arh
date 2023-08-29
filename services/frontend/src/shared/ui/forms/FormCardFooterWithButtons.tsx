import { FormCardFooter } from "."
import { ButtonHTMLAttributes, FC } from "react";
import { Button } from "bootstrap";
import { FormButtons } from "./FormButtons";

type Props = {
  text?: string
  loadingText?: string
  submitCallBack: () => Promise<any>
  cancelCallBack?: () => void
}

const FormCardFooterWithButtons: FC<ButtonHTMLAttributes<Button> & Props> = (props) => {
  return (
    <FormCardFooter>
      <FormButtons {...props}/>
    </FormCardFooter>
  );
};

export {FormCardFooterWithButtons}