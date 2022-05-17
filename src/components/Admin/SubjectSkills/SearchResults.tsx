import { Spinner } from 'components/Spinner';
import { toUrlName } from 'lib/utils';
import Link from 'next/link';

import { useFindSubjectsQuery } from './queries/subjects.query.generated';

export function SubjectSearchResults({ query }: { query: string }) {
  const { data, loading } = useFindSubjectsQuery({
    variables: {
      query,
    },
  });

  if (data == null) {
    return <Spinner />;
  }

  return (
    <ul role="list" className="-my-5 divide-y divide-gray-200 max-w-3xl">
      {data.findSubjects.map((s) => (
        <li className="py-4 flex items-center space-x-4" key={s.id}>
          <div className="w-24 flex-shrink-0">{s.code}</div>
          <div>
            <Link
              href={`/admin/subjects/skills/${toUrlName(
                s.name
              )}?code=${toUrlName(s.code)}&id=${s.id}`}
            >
              <a className="text-lg font-medium text-gray-900 truncate flex-1">
                {s.name}
              </a>
            </Link>
            <p className="text-sm text-gray-500 text-ellipsis overflow-hidden">
              {s.handbook.substring(0, 300) + "..."}
            </p>
          </div>
          <div>
            <Link
              href={`/admin/subjects/skills/${toUrlName(
                s.name
              )}?code=${toUrlName(s.code)}&id=${s.id}`}
            >
              <a
                href="#"
                className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
              >
                View
              </a>
            </Link>
          </div>
          {/* <div className="flex-shrink-0">
            <div className="h-8 w-8 rounded-full">{s.code}</div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {s.name}
            </p>
            <p className="text-sm text-gray-500 truncate">{s.handbook}</p>
          </div>
          <div>
            <a
              href="#"
              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
            >
              View
            </a>
          </div> */}
        </li>
      ))}
    </ul>
  );
  return <div>[{query}]</div>;
}
