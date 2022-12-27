import { useRouter } from "next/router";
import React from "react";
import AppContent from "./Home/AppContent";
import AppSidebar from "./Home/AppSidebar";

export default function Layout({ children }) {
  const router = useRouter();
  const template = router.pathname !== "/login";

  return (
    <div className="home">
      {template ? (
        <React.Fragment>
          <AppSidebar />
          <AppContent>{children}</AppContent>
        </React.Fragment>
      ) : (
        children
      )}
    </div>
  );
}
