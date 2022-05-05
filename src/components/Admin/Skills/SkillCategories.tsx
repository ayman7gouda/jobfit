import { toUrlName } from 'lib/utils';
import Link from 'next/link';

import { useSkillClustersQuery } from './queries/SkillClusters.query.generated';

function groupBy<T>(array: T[], predicate: (v: T) => string) {
  return array.reduce((acc, value) => {
    (acc[predicate(value)] ||= []).push(value);
    return acc;
  }, {} as { [key: string]: T[] });
}

function stringSort(a: string, b: string) {
  return a.localeCompare(b);
}

export function SkillCategories() {
  const { loading, error, data } = useSkillClustersQuery({ ssr: true });

  if (loading) return <div>Loading...</div>;

  if (error) return <div>An error has occurred: {error.message}</div>;

  if (data == null) {
    return <div>0 skills</div>;
  }

  let groups = groupBy(data.skillClusters, (d) => d.category);

  return (
    <div>
      {Object.keys(groups)
        .sort(stringSort)
        .map((key) => (
          <div key={key}>
            <h2 className="font-bold mt-1 mb-2 text-xl">{key}</h2>
            <ul>
              {groups[key]
                ?.sort((a, b) => a.name.localeCompare(b.name))
                .map((d) => (
                  <li key={d.id}>
                    <Link
                      href={`/admin/skill/${toUrlName(d.name.trim())}?id=${
                        d.id
                      }`}
                    >
                      <a>
                        <span
                          className={
                            "inline-flex items-center justify-center px-2 py-1 mr-1 text-xs font-bold leading-none rounded-full " +
                            (d.descriptions.length == 0
                              ? "text-red-100 bg-red-600"
                              : "text-green-100 bg-green-600")
                          }
                        >
                          {d.descriptions.length}
                        </span>
                        {d.name}
                      </a>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        ))}
    </div>
  );
}
