import { ChangeEventHandler } from "react";
import InputItem from "./Item";
import InputLabel from "./Label";

interface InputGroupProps {
  for?: string;
  type?: string;
  text?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  value?: string;
  children?: JSX.Element[];
}

const defaultStyle: string = "grid place-content-center gap-y-3 mt-5";

export default function InputGroup(props: InputGroupProps) {
  if (props.for && props.text && props.handleChange && !props.children) {
    return (
      <div className={defaultStyle}>
        <InputLabel for={props.for} text={props.text} />
        <InputItem
          name={props.for}
          type={props.type}
          handleChange={props.handleChange}
          required={props.required}
          value={props.value}
        />
      </div>
    );
  } else {
    return <div className={defaultStyle}>{props.children}</div>;
  }
}
