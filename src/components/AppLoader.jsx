import { Intent, Spinner } from "@blueprintjs/core";
import React from "react";
import { useSelector } from "react-redux";

const AppLoader = ({ selector }) => {
  const isLoadingState = useSelector((state) => state.loading);

  const hasValue = false;
  const intent = Intent.PRIMARY;
  const size = 50;
  const value = 1;

  if (selector && !isLoadingState) return null;

  return (
    <div className="app-loader">
      <div className="spinner-bg">
        <Spinner intent={intent} size={size} value={hasValue ? value : null} />
      </div>
    </div>
  );
};

export default AppLoader;
