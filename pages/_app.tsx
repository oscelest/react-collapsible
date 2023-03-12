import type {AppProps} from "next/app";
import React from "react";
import "../public/style/globals.scss";

function Application({Component, pageProps}: AppProps) {
  
  return (
    <Component {...pageProps} />
  );
}

export default Application;
