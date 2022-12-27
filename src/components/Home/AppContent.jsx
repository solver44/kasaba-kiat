import React from "react";
import AppScreen from "./AppScreen";
import Header from "./Header";

export default function AppContent({ children }) {
  return (
    <div className="app-content">
      <Header />
      <AppScreen>{children}</AppScreen>
    </div>
  );
}
