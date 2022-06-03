import { useEffect, useState } from "react";

import { PreviewTree } from "components/Admin/Handbook/TreePreview";

const ClientOnly = ({ children }) => {
  const [isClient, setClient] = useState(false);

  useEffect(() => setClient(true), []);

  if (!isClient) {
    return null;
  }
  return children;
};

export default () => (
  <ClientOnly>
    <PreviewTree />
    <style jsx global>{`
      body,
      html,
      #__next {
        height: 100%;
      }
    `}</style>
  </ClientOnly>
);
