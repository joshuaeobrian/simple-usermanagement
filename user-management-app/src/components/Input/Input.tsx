import React from "react";
import "./Input.scss";
interface IInput extends  React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
    handleChange(value: string): void;
}

const Input = ({handleChange, ...props}: IInput) => {
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value);
    return (
        <input className="input_field" {...props} onChange={handleOnChange}/>
    );
}
export default Input;
