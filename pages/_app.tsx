import "../public/style/globals.scss";
import type {AppProps} from "next/app";
import React from "react";

function Application({Component, pageProps}: AppProps) {

  return (
    <Component {...pageProps} />
  );
}

export default Application;
