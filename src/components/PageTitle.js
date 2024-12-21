import React from "react";

export const PageTitle = (props) => {
  return <h1 className={`page-title ${props.className}`}>{props.children}</h1>;
};
