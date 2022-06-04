import { addTodo } from "api-helpers/todos";
import React, { useRef } from "react";
import { Plus } from "react-feather";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";

let Form = styled.form`
  padding: 2em;
  margin: 0;
  border-bottom: 1px solid hsla(264deg 80% 80% / 80%);
  position: relative;
`;

let InputGroup = styled.label``;

let Label = styled.p`
  margin-bottom: 0.5em;
  letter-spacing: 0.1em;
  font-size: 80%;
  font-weight: lighter;
`;

let TextInput = styled.input`
  width: 100%;
  border: none;
  border-radius: 4px;
  padding: 8px;
  background-color: hsla(264deg 100% 65% / 10%);
`;

let Submit = styled.button`
  --color: hsl(264deg 100% 80%);
  position: sticky;
  margin-top: 1em;
  right: 0;
  left: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.2em;
  border-radius: 4px;
  border: none;
  padding: 0.25em 0.5em;
  background-color: transparent;
  color: hsla(0, 1%, 20%);
  border: 2px solid var(--color);
  transition: var(--transition-hover);

  &:hover {
    background-color: var(--color);
    color: white;
  }

  span {
    letter-spacing: 0.05em;
    text-transform: uppercase;
    font-size: 80%;
  }
`;

function NewTodo() {
  let queryClient = useQueryClient();

  let addMutation = useMutation(addTodo, {
    onSuccess: () => queryClient.refetchQueries(["get-todos"]),
  });

  let formRef = useRef() as React.MutableRefObject<HTMLFormElement>;

  React.useEffect(() => {
    if (addMutation.status === "success") {
      formRef.current?.reset();
    }
  }, [addMutation.status]);

  let handleSubmit = (evt: React.SyntheticEvent) => {
    let target = evt.target as typeof evt.target & {
      "new-todo-text": {
        value: string;
      };
    };
    addMutation.mutate(target["new-todo-text"].value);
    evt.preventDefault();
  };

  return (
    <Form onSubmit={handleSubmit} ref={formRef}>
      <InputGroup htmlFor="new-todo-text">
        <Label>What do want to do?</Label>
        <TextInput
          type="text"
          name="new-todo-text"
          id="new-todo-text"
          placeholder="Give the KT presentation"
          required
        />
      </InputGroup>
      <Submit>
        <Plus aria-label="Add new todo" /> <span>Add</span>
      </Submit>
    </Form>
  );
}

export default NewTodo;
