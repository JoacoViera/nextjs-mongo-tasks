import React from "react";
import { Layout } from "components/Layout";
import "semantic-ui/dist/semantic.min.css";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
