import type { ChangeEvent } from "react";

//propriedades do input
interface InputProps {
  id: string;
  name?: string;
  type?:
    | "text"
    | "password"
    | "email"
    | "number"
    | "checkbox"
    | "radio"
    | "date"
    | "datetime-local";
  placeholder?: string;
  value?: string | number;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  min?: string; // <--- NOVO
  max?: string; // <--- NOVO
}

const idCapitalized = (id: string) => id.charAt(0).toUpperCase() + id.slice(1);

export const Input = ({
  id,
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  error,
  min,
  max,
}: InputProps) => {
  return (
    <>
      <label htmlFor={id} className="form-label">
        {idCapitalized(id)}
      </label>
      <input
        id={id}
        name={name ? name : id}
        className={`form-control ${error ? "is-invalid" : ""}`}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </>
  );
};