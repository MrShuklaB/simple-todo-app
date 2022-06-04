import { getTodos } from "api-helpers/todos";
import { AxiosError, AxiosResponse } from "axios";
import ErrorMessage from "components/ErrorMessage";
import LoadingIndicator from "components/LoadingIndicator";
import NewTodo from "components/NewTodo";
import TodoList from "components/TodoList";
import { AnimatePresence } from "framer-motion";
import type { NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { useQuery } from "react-query";

let Home: NextPage = () => {
  let todosQuery = useQuery<AxiosResponse, AxiosError<Error>>(
    "get-todos",
    getTodos
  );
  let { data, status, error } = todosQuery;

  return (
    <React.Fragment>
      <Head>
        <title>TypeScript + React Query Demo</title>
      </Head>
      <NewTodo />
      <AnimatePresence>
        {status === "loading" ? <LoadingIndicator /> : null}
        {status === "success" ? <TodoList todos={data?.data} /> : null}
        {status === "error" ? <ErrorMessage error={error} /> : null}
      </AnimatePresence>
    </React.Fragment>
  );
};

export default Home;
