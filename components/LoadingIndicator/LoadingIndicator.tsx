import { motion } from "framer-motion";
import { Hexagon } from "react-feather";

let AnimatedIcon = motion(Hexagon);

function LoadingIndicator() {
  return (
    <AnimatedIcon
      size={32}
      animate={{ rotate: [0, 360, 0] }}
      transition={{
        repeat: Infinity,
        repeatDelay: 0,
        duration: 2,
      }}
    />
  );
}

export default LoadingIndicator;
