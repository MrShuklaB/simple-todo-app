import type { AppProps } from "next/app";
import * as React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import styled from "styled-components";
import GlobalStyles from "styles/global";

let queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: false },
  },
});

let Content = styled.main`
  width: 450px;
  height: 60%;
  padding-bottom: 1em;
  margin: 4rem auto;
  background-color: white;
  border-radius: 8px;
  box-shadow: 1px -1px 2px 2px hsla(0 0% 50% / 10%),
    2px -2px 4px 4px hsla(0 0% 50% / 10%),
    4px -4px 8px 8px hsla(0 0% 50% / 10%);
`;

function TodoApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalStyles />
      <Content>
        <Component {...pageProps} />
      </Content>
    </QueryClientProvider>
  );
}

export default TodoApp;
