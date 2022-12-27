import { Callout } from "@blueprintjs/core";
import React from "react";
import { GET_ERRORS } from "../../helper/error";

export default function ErrorCallout({ error }) {
  return (
    <Callout title={error.message} icon="error" intent="danger">
      <span className="bp4-text-large">
        {error?.detailed?.error
          ? GET_ERRORS(error.detailed.error)
          : error?.detailed
          ? JSON.stringify(error.detailed)
          : JSON.stringify(error?.response?.data?.error)}
      </span>
    </Callout>
  );
}
