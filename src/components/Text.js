import React from "react";

export const Text = (props) => {
  return (
    <p className={`fs-18px fc-gray open-sans-normal mb-2 ${props.className}`}>
      {props.children}
    </p>
  );
};
