import React from "react";

export const PanelButton = ({
  type = "button",
  label = "Save",
  onClick,
  className = 'bg-seaGreen text-light rounded-2 min-w-min-100 mt-3 p-2',
}) => {
  return (
    <button type={type} className={className} onClick={onClick}>
      {label}
    </button>
  );
};