import { PropsWithChildren } from "react";

interface Props {
  handler: () => void;
}

const Button: React.FC<PropsWithChildren<Props>> = ({ handler, children }) => {
  return <button onClick={handler}>{children}</button>;
};

export default Button;
