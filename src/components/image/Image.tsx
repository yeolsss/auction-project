import React, { ComponentProps } from "react";

interface Props extends ComponentProps<"img"> {}

const Image: React.FC<Props> = (props) => <img {...props} />;

export default Image;
