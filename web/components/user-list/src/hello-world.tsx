import React from "react";

export const HelloWorld: React.FC = ({ children }) => {
  return (
    <div style={{ fontWeight: "bold", textDecoration: "underline" }}>
      {children}
    </div>
  );
};
