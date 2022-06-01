import { addTodo, deleteTodo, getTodos, updateTodo } from "api-helpers/todos";
import { AxiosError, AxiosResponse } from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import * as React from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";

let Home: NextPage = () => {
  let queryClient = useQueryClient();
  let todosQuery = useQuery<AxiosResponse, AxiosError>("get-todos", getTodos);
  let { data, isLoading, error } = todosQuery;

  let addTodoMutation = useMutation(addTodo, {
    onSuccess: () => queryClient.invalidateQueries("get-todos"),
  });

  let updateTodoMutation = useMutation(updateTodo, {
    onSuccess: () => queryClient.invalidateQueries("get-todos"),
  });

  let deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.invalidateQueries("get-todos"),
  });

  return (
    <React.Fragment>
      <Head>
        <title>TypeScript + React Query Demo</title>
      </Head>
      <Form
        onSubmit={(evt: React.SyntheticEvent) => {
          let target = evt.target as typeof evt.target & {
            "new-todo-text": {
              value: string;
            };
          };
          addTodoMutation.mutate(target["new-todo-text"].value);
          evt.preventDefault();
        }}
      >
        <InputWrapper htmlFor="new-todo-text">
          <p>What do you want to do?</p>
          <TextInput
            type="text"
            name="new-todo-text"
            id="new-todo-text"
            required
          />
        </InputWrapper>
        <AddButton>Add</AddButton>
      </Form>
      {isLoading ? <LoadingText>Loading...</LoadingText> : null}
      {!data || data.data.length <= 0 ? null : (
        <TodosList>
          {data.data.map(
            ({
              id,
              text,
              isDone,
            }: {
              id: string;
              text: string;
              isDone: boolean;
            }) => (
              <TodoItem key={id}>
                <TodoWrapper>
                  <input
                    type="checkbox"
                    name={id}
                    id={id}
                    checked={isDone}
                    onChange={() => updateTodoMutation.mutate(id)}
                  />
                  <TodoText htmlFor={id} isChecked={isDone}>
                    {text}
                  </TodoText>
                </TodoWrapper>
                <DeleteButton onClick={() => deleteMutation.mutate(id)}>
                  X
                </DeleteButton>
              </TodoItem>
            )
          )}
        </TodosList>
      )}
      {error ? (
        <ErrorAlert role="alert">
          {error.response?.status === 404 ? (
            <p>No todos available. Add some!</p>
          ) : (
            <pre>{error?.response?.statusText}</pre>
          )}
        </ErrorAlert>
      ) : null}
    </React.Fragment>
  );
};

interface TodoText {
  readonly isChecked: boolean;
}

let AddButton = styled.button`
  padding: 4px 8px;
  background-color: hsl(258.8, 77.4%, 51.4%);
  border-radius: 8px;
  color: white;
  text-transform: uppercase;
  border: none;
  align-self: flex-end;
`;

let DeleteButton = styled.button`
  padding: 0;
  border-radius: 8px;
  background-color: transparent;
  border: none;
  color: #f43030;
`;

let Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  padding: 16px 32px;
  border-radius: 16px;
  background-color: hsla(253, 87.1%, 60.6%, 0.11);
`;

let InputWrapper = styled.label`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.2rem;
  width: 100%;
`;

let TextInput = styled.input`
  border: none;
  border-radius: 8px;
  padding-left: 4px;
  width: 100%;
`;

let TodosList = styled.ul`
  width: 100%;
  list-style: none;
  margin: 0;
  padding: 0;
`;

let TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  :not(:last-child) {
    border-bottom: 1px dashed hsla(216, 0%, 45%, 1);
  }
`;

let TodoWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
`;

let TodoText = styled.label<TodoText>`
  text-decoration: ${props => (props.isChecked ? "line-through" : undefined)};
`;

let LoadingText = styled.p`
  text-align: center;
`;

let ErrorAlert = styled.div`
  background-color: hsla(356, 100%, 90%, 1);
  padding: 8px 16px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  border-radius: 8px;
  width: 100%;
`;

export default Home;
