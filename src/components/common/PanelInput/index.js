import React from "react";

export const PanelInput = ({
  type = "text",
  name="",
  className = "bg-light w-full border-2 border-seaGreen border-solid rounded-2 p-2",
  onChange,
  ref = null,
  placeholder = 'Type here...'
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      className={className}
      onChange={onChange}
      ref={ref}
    />
  );
};
