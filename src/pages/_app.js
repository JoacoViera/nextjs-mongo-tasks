import "semantic-ui-css/semantic.min.css";

import React from "react";
import { Layout } from "components/Layout";
import "../styles/globals.css";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>Tasks</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
