import React from "react";

type Props = {
  bgColor?: string;
  maxWidth?: string;
  minHeight?: string;
};

const Component: React.FC<Props> = ({
  children,
  bgColor,
  maxWidth,
  minHeight,
}) => {
  return (
    <section id="container" className={`bg-${bgColor}`} style={{ minHeight }}>
      <div className={`max-width-${maxWidth}`}>{children}</div>
    </section>
  );
};

export const Container = Component;
