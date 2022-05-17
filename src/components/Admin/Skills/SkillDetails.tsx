import { SkillCluster, SkillClusterDescription, SkillClusters } from '@prisma/client';

import { parseQuery } from 'lib/utils';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { useAddDescriptionMutation } from './queries/AddDescription.mutation.generated';
import { useSkillDetailsQuery } from './queries/SkillDetails.query.generated';
import { SkillForm } from './SkillForm';

type Data = SkillCluster & {
  skills: SkillClusters[];
  descriptions: SkillClusterDescription[];
};

export function SkillDetails() {
  const router = useRouter();
  const { id, name, did } = parseQuery(router);

  const { loading, error, data } = useSkillDetailsQuery({
    variables: {
      id: parseInt(id as string),
    },
  });

  const [addDescription] = useAddDescriptionMutation();

  // const addDescription = useMutation((formData) => {
  //   return fetch(`/api/skill/${id}`, {
  //     body: JSON.stringify(formData),
  //     method: "PUT",
  //   });
  // });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  if (data == null || data.skillCluster == null) {
    return <div>Skill not found</div>;
  }

  const { skillCluster } = data;
  let nid = did ? parseInt(did as string) : undefined;
  let description = did
    ? skillCluster.descriptions.find((d) => d.id == nid)
    : null;

  return (
    <div className="flex min-h-screen">
      <section className="bg-yellow-200 h-screen overflow-auto p-4 drop-shadow-lg">
        {data.skillCluster.descriptions!.length == 0 ? (
          <div>0 descriptions</div>
        ) : null}
        {data.skillCluster.descriptions!.map((d) => (
          <div key={d.id}>
            <Link href={`/admin/skill/${name}?id=${id}&did=${d.id}`}>
              <a>{d.name}</a>
            </Link>
          </div>
        ))}
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-2 py-2 px-4 rounded"
          onClick={() =>
            addDescription({
              variables: {
                clusterId: data.skillCluster?.id,
              },
            })
          }
        >
          Add Description
        </button>
        <hr className="my-4" />
        <div className="text-blue-800 font-bold mb-2 italic">Skills</div>
        {skillCluster.skills?.map((s, i) => (
          <div key={s.skill?.id}>{s.skill?.name}</div>
        ))}
      </section>
      {did && description && skillCluster && (
        <section className="flex-1 p-4">
          <SkillForm
            key={did}
            description={description}
            skillCluster={skillCluster}
          />
        </section>
      )}
    </div>
  );
}
