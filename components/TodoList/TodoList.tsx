import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import styled from "styled-components";
import { Todo } from "types";
import TodoItem from "./TodoItem";

type ComponentProps = {
  todos: Todo[];
};

let List = styled(motion.ul)`
  list-style: none;
  padding: 2em;
  width: 100%;
`;

function TodoList({ todos }: ComponentProps) {
  return (
    <LayoutGroup>
      <List
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <AnimatePresence>
          {todos.map(({ id, text, isDone }) => (
            <TodoItem todo={{ id, text, isDone }} key={id} />
          ))}
        </AnimatePresence>
      </List>
    </LayoutGroup>
  );
}

export default TodoList;
