import { DndProvider, getBackendOptions, MultiBackend } from '@minoru/react-dnd-treeview';

import { daoInNode, daoOutNode } from 'components/Admin/Handbook/helpers';
import { useProgramQuery } from 'components/Admin/Handbook/queries/program.query.generated';
import {
  useSaveProgramHandbookMutation
} from 'components/Admin/Handbook/queries/saveProgramHandbook.mutation.generated';
import { initGuid } from 'components/Admin/Handbook/shared';
import { Layout, TreeView } from 'components/Admin/Handbook/TreeView';
import { Option } from 'components/Admin/Handbook/types';
import { useRouter } from 'next/router';

// const ClientOnly = ({ children }: any) => {
//   const [isClient, setClient] = useState(false);

//   useEffect(() => setClient(true), []);

//   if (!isClient) {
//     return null;
//   }
//   return children;
// };

function Container({
  all,
  programOptions,
  majorOptions,
  minorOptions,
  id,
}: {
  programOptions: Option[];
  majorOptions: Option[];
  minorOptions: Option[];
  all: Option[];
  id: number;
}) {
  const { data, loading } = useProgramQuery({
    variables: { id },
  });
  const [save, { loading: saving }] = useSaveProgramHandbookMutation();

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!data?.program) {
    return <div>Not found ...</div>;
  }

  const tree = daoOutNode(data.program);
  initGuid(tree.handbook);

  return (
    <TreeView
      key={id}
      defaultTree={tree.handbook}
      model={tree}
      all={all}
      programOptions={programOptions}
      majorOptions={majorOptions}
      minorOptions={minorOptions}
      saving={saving}
      save={(h) => {
        save({
          variables: {
            input: daoInNode({
              ...tree,
              handbook: h,
            }),
          },
        });
      }}
    />
  );
}

const Page = () => {
  const { id } = useRouter().query;
  const numId = parseInt(id as string);

  return (
    <>
      <Layout
        id={numId}
        part="programs"
        treeView={({ programOptions, majorOptions, all }) => (
          <Container
            programOptions={programOptions}
            majorOptions={majorOptions}
            minorOptions={majorOptions}
            all={all}
            id={numId}
          />
        )}
      />
      <style jsx global>{`
        body,
        html,
        #__next {
          height: 100%;
        }
      `}</style>
    </>
  );
};

export default () => (
  <DndProvider
    backend={MultiBackend}
    debugMode={true}
    options={getBackendOptions()}
  >
    <Page />
  </DndProvider>
);
