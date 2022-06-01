import Layout from "components/Layout";
import type { AppProps } from "next/app";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import GlobalStyles from "styles/global";

let queryClient = new QueryClient();

function TodoApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </QueryClientProvider>
  );
}

export default TodoApp;
