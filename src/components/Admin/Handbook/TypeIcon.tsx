import React from "react";

import { HiDocument, HiFolder } from "react-icons/hi";

type Props = {
  droppable: boolean;
  fileType?: string;
};

export const TypeIcon: React.FC<Props> = (props) => {
  if (props.droppable) {
    return <HiFolder />;
  }
  return <HiDocument />;
};
