interface InputItemProps {
  type?: string;
  name: string;
}

export default function InputItem(props: InputItemProps) {
  return (
    <input id={props.name} name={props.name} type={props.type || "text"} />
  );
}
