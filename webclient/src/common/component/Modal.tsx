import React from "react";

type Props = {
  visible?: boolean;
};

const Component: React.FC<Props> = ({ children, visible = false }) => {
  if (!visible) {
    return null;
  }

  return <div id="modal">{children}</div>;
};

export const Modal = Component;
