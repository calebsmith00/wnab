interface InputLabelProps {
  for: string;
  text: string;
}

export default function InputLabel(props: InputLabelProps) {
  return (
    <label htmlFor={props.for} className="text-left">
      {props.text}
    </label>
  );
}
