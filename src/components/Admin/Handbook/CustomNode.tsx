import React, { useState } from 'react';

import { FolderNode } from './FolderNode';
import { LeafNode } from './LeafNode';
import { CustomNodeProps } from './types';

export const CustomNode: React.FC<CustomNodeProps> = (props) => {
  const [visibleInput, setVisibleInput] = useState(false);

  return props.node.droppable ? (
    <FolderNode
      {...props}
      visibleInput={visibleInput}
      setVisibleInput={setVisibleInput}
    />
  ) : (
    <LeafNode
      {...props}
      visibleInput={visibleInput}
      setVisibleInput={setVisibleInput}
    />
  );
};
