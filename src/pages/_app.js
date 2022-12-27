// import "normalize.css";
import "../scss/screen.scss";
import "../scss/datatable.scss";
import "../scss/drag&drop.scss";
import "../scss/screen.scss";
import "../scss/404.scss";
import "../scss/tree.scss";
import "@blueprintjs/core/lib/css/blueprint.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/popover2/lib/css/blueprint-popover2.css";
import "@blueprintjs/table/lib/css/table.css";
import "../css/login.css";
import "../css/App.css";
import "../css/home.css";
import "../css/custom.css";
import "../components/Charts/chart.css";

import "../services/localization/i18n";
import { Provider } from "react-redux";
import { store } from "../store";
import { AuthProvider, ProtectRoute } from "../services/auth";
import Head from "next/head";

import dynamic from "next/dynamic";
import AppLoader from "../components/AppLoader";
import Layout from "../components/Layout";
import { useEffect, useState } from "react";
import { fetchLangResources } from "../services/localization/i18n";

function App({ Component, pageProps }) {
  const DynamicComponentWithNoSSR = dynamic(Component, { ssr: false });
  const [load, setLoad] = useState(true);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        await fetchLangResources();
      } catch (error) {
        if (error.response.data.message === "Unauthorized")
          localStorage.removeItem("token");
      } finally {
        setLoad(false);
      }
    };
    fetchAll();
  }, []);

  return (
    <Provider store={store}>
      {Component.requiresAuth && (
        <Head>
          <script
            // If no token is found, redirect inmediately
            dangerouslySetInnerHTML={{
              __html: `if(!document.cookie || document.cookie.indexOf('token') === -1)
            {location.replace(
              "/login?next=" +
                encodeURIComponent(location.pathname + location.search)
            )}
            else {document.documentElement.classList.add("render")}`,
            }}
          />
        </Head>
      )}
      <AppLoader selector />
      <AuthProvider>
        {load ? (
          <AppLoader />
        ) : (
          <ProtectRoute>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ProtectRoute>
        )}
      </AuthProvider>
    </Provider>
  );
}

export default App;
