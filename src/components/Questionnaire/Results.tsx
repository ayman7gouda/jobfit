import { useState } from 'react';

import { useJobRoleProfileQuery } from './queries/jobRoleProfile.query.generated';

export function Results() {
  const units = [2611, 2612, 2712];
  const [selected, setSelected] = useState(units[0]);
  const { data, loading } = useJobRoleProfileQuery({
    variables: { unit: selected },
  });

  return (
    <>
      {units.map((u) => (
        <button
          className="bg-slate-400 px-4 py-2 mx-2"
          key={u}
          onClick={() => setSelected(u)}
        >
          {u}
        </button>
      ))}
      <div className="mt-2">
        {loading && <span>Loading ...</span>}
        {!loading && data && (
          <pre>{JSON.stringify(data.jobRoleProfile, null, 4)}</pre>
        )}
      </div>
    </>
  );
}
