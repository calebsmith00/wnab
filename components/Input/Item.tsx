import { ChangeEventHandler } from "react";

interface InputItemProps {
  type?: string;
  required?: boolean;
  value?: string;
  handleChange?: ChangeEventHandler<HTMLInputElement>;
  name: string;
}

export default function InputItem(props: InputItemProps) {
  return (
    <input
      id={props.name}
      name={props.name}
      type={props.type || "text"}
      className="text-black py-1 mx-3 px-2"
      onChange={props.handleChange}
      required={props.required || false}
      value={props.value}
    />
  );
}
