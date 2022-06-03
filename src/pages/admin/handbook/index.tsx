import { useEffect, useState } from "react";

import { Layout } from "components/Admin/Handbook/TreeView";

const ClientOnly = ({ children }: any) => {
  const [isClient, setClient] = useState(false);

  useEffect(() => setClient(true), []);

  if (!isClient) {
    return null;
  }
  return children;
};

export default () => (
  <ClientOnly>
    <Layout part="programs" />
    <style jsx global>{`
      body,
      html,
      #__next {
        height: 100%;
      }
    `}</style>
  </ClientOnly>
);
