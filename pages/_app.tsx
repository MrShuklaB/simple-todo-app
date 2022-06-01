import type { AppProps } from "next/app";
import * as React from "react";
import GlobalStyles from "styles/global";

function TodoApp({ Component, pageProps }: AppProps) {
  return (
    <React.Fragment>
      <GlobalStyles />
      <Component {...pageProps} />
    </React.Fragment>
  );
}

export default TodoApp;
