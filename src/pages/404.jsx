import { H1, Icon } from "@blueprintjs/core";
import React from "react";

export default function NotFound() {
  return (
    <div className="not-found">
      <div className="page-404">
        <H1>404</H1>
        <p>Page Not Found!</p>
      </div>
      <Icon intent="danger" tagName="span" size={180} icon="error" />
    </div>
  );
}
