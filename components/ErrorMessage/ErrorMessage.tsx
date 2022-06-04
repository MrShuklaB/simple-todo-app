import { AxiosError } from "axios";
import { motion } from "framer-motion";
import styled from "styled-components";

type ComponentProps = {
  error: AxiosError<Error> | null;
};

let Alert = styled(motion.div)`
  background-color: hsl(1 75% 85% / 0.7);
  padding: 1em;
  margin: 2em;
  border-radius: 4px;
`;

let Message = styled.pre`
  white-space: pre;
  overflow: auto;
  text-align: center;
`;

function ErrorMessage({ error }: ComponentProps) {
  return (
    <Alert
      role="alert"
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{
        opacity: 0,
      }}
    >
      <Message>{`${error?.response?.status}: ${error?.response?.statusText}`}</Message>
    </Alert>
  );
}

export default ErrorMessage;
