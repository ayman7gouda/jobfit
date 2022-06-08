import { DndProvider, getBackendOptions, MultiBackend } from '@minoru/react-dnd-treeview';

import { daoInNode, daoOutNode } from 'components/Admin/Handbook/helpers';
import {
  useSaveSpecialisationHandbookMutation
} from 'components/Admin/Handbook/queries/saveSpecialisationHandbook.mutation.generated';
import {
  useSpecialisationQuery
} from 'components/Admin/Handbook/queries/specialisation.query.generated';
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

export function SpecialisationContainer({
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
  const { data, loading } = useSpecialisationQuery({
    variables: { id },
  });
  const [save, { loading: saving }] = useSaveSpecialisationHandbookMutation();

  if (loading) {
    return <div>Loading ...</div>;
  }

  if (!data?.specialisation) {
    return <div>Not found ...</div>;
  }

  const tree = daoOutNode(data.specialisation);
  initGuid(tree.handbook);

  return (
    <TreeView
      key={id}
      saving={saving}
      defaultTree={tree.handbook}
      model={tree}
      all={all}
      programOptions={programOptions}
      majorOptions={majorOptions}
      minorOptions={minorOptions}
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

export const Page = () => {
  const { id } = useRouter().query;
  const numId = parseInt(id as string);

  return (
    <>
      <Layout
        id={numId}
        part="majors"
        treeView={({ programOptions, majorOptions, minorOptions, all }) => (
          <SpecialisationContainer
            programOptions={programOptions}
            majorOptions={majorOptions}
            minorOptions={minorOptions}
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
