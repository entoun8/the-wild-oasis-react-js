import React from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  id: string;
  children: React.ReactNode;
}

function Checkbox({ checked, onChange, disabled = false, id, children }: CheckboxProps): React.JSX.Element {
  return (
    <div data-checkbox="true">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ""}>{children}</label>
    </div>
  );
}

export default Checkbox;