import { deleteTodo, updateTodo } from "api-helpers/todos";
import { motion } from "framer-motion";
import { Trash2 } from "react-feather";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { Todo } from "types";

type ComponentProps = {
  todo: Todo;
};

let Wrapper = styled(motion.li)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

let Label = styled.label`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.3em;
`;

let Checkbox = styled.input``;

interface TextProps {
  readonly isDone: boolean;
}
let Text = styled.p<TextProps>`
  text-decoration: ${props => (props.isDone ? "line-through" : undefined)};
`;

let Delete = styled.button`
  background-color: transparent;
  border: none;
  border-radius: 4px;
  padding: 4px;
  transition: var(--transition-hover);

  &:hover {
    background-color: hsla(5, 81%, 88%);
  }
`;

function TodoItem({ todo }: ComponentProps) {
  let { id, text, isDone } = todo;
  let queryClient = useQueryClient();

  let updateMutation = useMutation(updateTodo, {
    onSettled: () => queryClient.refetchQueries(["get-todos"]),
  });

  let deleteMutation = useMutation(deleteTodo, {
    onSuccess: () => queryClient.refetchQueries(["get-todos"]),
  });

  return (
    <Wrapper
      layout
      initial={{ opacity: 0, translateY: -35 }}
      animate={{ opacity: 1, translateY: 0 }}
      exit={{ opacity: 0, translateY: 20 }}
    >
      <Label htmlFor={id}>
        <Checkbox
          type="checkbox"
          name={id}
          id={id}
          checked={isDone}
          onChange={() => updateMutation.mutate(id)}
          tabIndex={0}
        />
        <Text isDone={isDone}>{text}</Text>
      </Label>
      <Delete onClick={() => deleteMutation.mutate(id)}>
        <Trash2 aria-label="delete todo" color="hsla(4, 82%, 52%)" />
      </Delete>
    </Wrapper>
  );
}

export default TodoItem;
