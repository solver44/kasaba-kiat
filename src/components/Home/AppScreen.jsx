import React from "react";
import { Card } from "@blueprintjs/core";

export default function AppScreen({ children, template }) {
  return (
    <div className="app-screen">
      {template ? <ScreenTemplate>{children}</ScreenTemplate> : children}
    </div>
  );
}

const ScreenTemplate = ({ children }) => {
  return <Card style={{ height: "-webkit-fill-available" }}>{children}</Card>;
};
