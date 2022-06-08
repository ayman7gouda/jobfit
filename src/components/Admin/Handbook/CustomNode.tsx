import React from 'react';

import { FolderNode } from './FolderNode';
import { LeafNode } from './LeafNode';
import { CustomNodeProps } from './types';

export const CustomNode: React.FC<CustomNodeProps> = (props) => {
  return props.node.droppable ? (
    <FolderNode {...props} />
  ) : (
    <LeafNode {...props} />
  );
};
