import React, { useMemo, useState } from 'react';
import styled from 'styled-components';

import { JobCategory } from 'generated/serverTypes';
import { groupByArray } from 'lib/utils';
import { HiChevronDown, HiChevronRight, HiChevronUp, HiFilter } from 'react-icons/hi';

import { JobLineChart } from './JobChart';
import { useJobCategoriesQuery } from './queries/jobCategories.query.generated';
import { useJobsQuery } from './queries/jobs.query.generated';

const Table = styled.table`
  th {
    text-align: left;
    background-color: orange;
    padding: 4px;
    white-space: nowrap;
    cursor: pointer;

    svg {
      display: inline-block;
      margin-left: 5px;
    }
  }

  tr:nth-child(odd) {
    background-color: aliceblue;
    color: black;
  }
`;

function Badge({ children, className }) {
  return (
    <span
      className={
        className +
        " items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-gray-800"
      }
    >
      {children}
    </span>
  );
}

type LineData = JobCategory & { values?: LineData[] };

function Line({
  line,
  setId,
}: {
  line: LineData;
  setId: (id: number) => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="pl-8 w-full text-sm mt-2">
      <div className={"flex items-center"}>
        {line.values && (
          <div
            className="cursor-pointer w-4"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <HiChevronDown /> : <HiChevronRight />}
          </div>
        )}

        <Badge className={"mx-1"}>{line.count}</Badge>
        <button
          className="flex-1 text-left ml-2"
          type="button"
          onClick={() => setId(line.id)}
        >
          {line.name}{" "}
          <span className="w-10 ml-1 text-xs text-gray-500">{line.id}</span>
        </button>
        <div className="w-20 overflow-hidden">{Math.round(line.avg)}</div>
        <div className="w-20 overflow-hidden">{line.min}</div>
        <div className="w-20 overflow-hidden">{line.max}</div>
      </div>
      {line.values &&
        expanded &&
        line.values.map((l) => <Line key={l.id} setId={setId} line={l} />)}
    </div>
  );
}

type Sorting = { type: string; ascending: boolean };

function SortIndicator({
  name,
  label,
  sortBy,
  setSortBy,
  filterVisible,
  setFilterVisible,
  filters,
  Filter,
}: {
  name: string;
  label: string;
  sortBy: Sorting;
  setSortBy: (value: Sorting) => void;
  filterVisible?: string;
  setFilterVisible?: (value: string) => void;
  filters?: { [index: string]: { filter: Any; value: Any } };
  Filter?: React.FC;
}) {
  return (
    <th
      onClick={() =>
        setSortBy({
          type: name,
          ascending: name != sortBy.type ? true : !sortBy.ascending,
        })
      }
    >
      {label}

      {filters && (
        <div
          className="inline-block cursor-pointer relative"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setFilterVisible(filterVisible === name ? "" : name);
          }}
        >
          <HiFilter style={{ color: filters[name] ? "white" : "black" }} />

          {filterVisible === name && (
            <div
              className="absolute border-slate-700 rounded-md border-2 p-2 bg-white"
              onClick={(e) => e.stopPropagation()}
            >
              <Filter />
            </div>
          )}
        </div>
      )}

      {name == sortBy.type ? (
        sortBy.ascending ? (
          <HiChevronUp />
        ) : (
          <HiChevronDown />
        )
      ) : null}
    </th>
  );
}

function SelectFilter({
  filters,
  setFilters,
  setFilterVisible,
  options,
  name,
}) {
  return (
    <select
      value={filters[name]?.value || ""}
      onChange={(e) => {
        let value = e.currentTarget.value;

        if (!value) {
          setFilters({ ...filters, [name]: null });
        } else {
          setFilters({
            ...filters,
            [name]: {
              value,
              filter: (a) => {
                return a[name] === value;
              },
            },
          });
        }
        setFilterVisible("");
      }}
    >
      <option value={""}>--</option>
      {options.map((o, i) => (
        <option key={o.value}>{o.text}</option>
      ))}
    </select>
  );
}

function JobListContainer({ id }, { id: number }) {
  const [sortBy, setSortBy] = useState({ type: "salary", ascending: true });
  const [filterVisible, setFilterVisible] = useState(null);
  const [filters, setFilters] = useState({} as any);

  const { data, loading } = useJobsQuery({
    variables: {
      id,
    },
  });

  const processed = useMemo(() => {
    if (data == null) {
      return null;
    }
    let processed = JSON.parse(JSON.stringify(data.jobs));

    // processed =  processed.filter(
    //   (s, i) =>
    //     processed.findIndex(
    //       (t) =>
    //         t.title === s.title &&
    //         t.minAnnualSalary === s.minAnnualSalary &&
    //         s.state === t.state
    //     ) === i
    // );
    return processed;
  }, [data, loading]);

  if (loading) {
    return <div>Loading ...</div>;
  }

  let filtered = processed;
  for (let key of Object.keys(filters)) {
    if (filters[key]) {
      filtered = filtered.filter(filters[key].filter);
    }
  }

  let sorted = filtered.sort((a, b) => {
    let first =
      sortBy.type === "name"
        ? a.title.localeCompare(b.title)
        : sortBy.type === "salary"
        ? a.minAnnualSalary < b.minAnnualSalary
          ? -1
          : a.minAnnualSalary > b.minAnnualSalary
          ? 1
          : 0
        : sortBy.type === "country"
        ? (a.country || "").localeCompare(b.country || "")
        : sortBy.type === "state"
        ? (a.state || "").localeCompare(b.state || "")
        : (a.city || "").localeCompare(b.city || "");
    if (first == 0) {
      first = a.minAnnualSalary < b.minAnnualSalary ? -1 : 1;
    }
    if (!sortBy.ascending) {
      first = first * -1;
    }
    return first;
  });

  sorted.forEach(
    (j, i) =>
      ((j as Any).titleShort =
        j.title.substring(0, 30) +
        (j.title.length > 30 ? ` (${i}) ...` : ` (${i})`))
  );

  function setSalary(min: number | undefined, max: number | undefined) {
    let filter = filters.salary || {};
    min = min || filter.min;
    max = max || filter.max;

    if (!max && !min) {
      setFilters({ ...filters, salary: null });
    } else {
      setFilters({
        ...filters,
        salary: {
          min,
          max,
          filter: (a) => {
            return (
              (!min || a.minAnnualSalary > min) &&
              (!max || max > a.minAnnualSalary)
            );
          },
        },
      });
    }
  }

  return (
    <div className="w-full">
      <JobLineChart
        key={id}
        info={{
          id: 1,
          career: "Software Developer",
          description:
            "Systems developers design, develop, test, maintain and document program code in accordance with user requirements, and system and technical specifications.",
          chartData: {
            // labels: sorted.map(
            //   (j) =>
            //     j.title.substring(0, 30) + (j.title.length > 30 ? "..." : "")
            // ),
            data: sorted,
          },
        }}
      />
      <div className="flex">
        <Table className="w-full">
          <thead>
            <tr>
              <SortIndicator
                name="name"
                label="Name"
                setSortBy={setSortBy}
                sortBy={sortBy}
              />
              <SortIndicator
                name="salary"
                label="Salary $"
                setSortBy={setSortBy}
                sortBy={sortBy}
                filters={filters}
                filterVisible={filterVisible}
                setFilterVisible={setFilterVisible}
                Filter={() => (
                  <>
                    <label htmlFor="min">Min: </label>
                    <input
                      name="min"
                      type="number"
                      defaultValue={0}
                      value={filters.salary?.min || 0}
                      step={1000}
                      placeholder="Minimum Salary $"
                      onChange={(e) =>
                        setSalary(parseInt(e.currentTarget.value), undefined)
                      }
                    />
                    <label htmlFor="max">Max: </label>
                    <input
                      name="max"
                      defaultValue={0}
                      value={filters.salary?.max || 0}
                      step={1000}
                      type="number"
                      placeholder="Maximum Salary $"
                      onChange={(e) =>
                        setSalary(undefined, parseInt(e.currentTarget.value))
                      }
                    />
                  </>
                )}
              />
              <SortIndicator
                name="country"
                label="Country"
                setSortBy={setSortBy}
                sortBy={sortBy}
                filters={filters}
                filterVisible={filterVisible}
                setFilterVisible={setFilterVisible}
                Filter={() => (
                  <SelectFilter
                    filters={filters}
                    options={groupByArray(sorted, "country").map((t) => ({
                      value: t.key,
                      text: t.key,
                    }))}
                    setFilterVisible={setFilterVisible}
                    setFilters={setFilters}
                    name="country"
                  />
                )}
              />
              <SortIndicator
                name="state"
                label="State"
                setSortBy={setSortBy}
                sortBy={sortBy}
                filters={filters}
                filterVisible={filterVisible}
                setFilterVisible={setFilterVisible}
                Filter={() => (
                  <SelectFilter
                    filters={filters}
                    options={groupByArray(sorted, "state").map((t) => ({
                      value: t.key,
                      text: t.key,
                    }))}
                    setFilterVisible={setFilterVisible}
                    setFilters={setFilters}
                    name="state"
                  />
                )}
              />
              <SortIndicator
                name="city"
                label="City"
                setSortBy={setSortBy}
                sortBy={sortBy}
                filters={filters}
                filterVisible={filterVisible}
                setFilterVisible={setFilterVisible}
                Filter={() => (
                  <SelectFilter
                    filters={filters}
                    options={groupByArray(sorted, "city").map((t) => ({
                      value: t.key,
                      text: t.key,
                    }))}
                    setFilterVisible={setFilterVisible}
                    setFilters={setFilters}
                    name="city"
                  />
                )}
              />
            </tr>
          </thead>
          <tbody>
            {sorted.map((j, i) => (
              <tr key={j.id}>
                <td>{j.title}</td>
                <td>{j.minAnnualSalary}$</td>
                <td>{j.country}</td>
                <td>{j.state}</td>
                <td>{j.city}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

function CategoryList({ levels }: { levels: JobCategory[] }) {
  const [id, setId] = useState(null);

  return (
    <div className="flex bg-gray-800 text-gray-300 h-full">
      <div>
        <div className="flex font-bold">
          <div className="w-4">&nbsp;</div>
          <div className="flex-1">Name</div>
          <div className="w-20">Avg</div>
          <div className="w-20">Min</div>
          <div className="w-20">Max</div>
        </div>
        {levels.map((l) => (
          <Line key={l.id} line={l} setId={setId} />
        ))}
      </div>
      <div>
        {id ? <JobListContainer id={id} /> : <div>Nothing selected</div>}
      </div>
    </div>
  );
}

export function CategoryListContainer() {
  const { data, loading } = useJobCategoriesQuery();

  if (loading) {
    return <div>Loading ...</div>;
  }

  let levels = data.jobCategories
    .filter((c) => c.id <= 10)
    .map((i) => ({
      ...i,
      values: data.jobCategories
        .filter(
          (c) => c.id >= 10 && c.id < 100 && Math.floor(c.id / 10) == i.id
        )
        .map((i) => ({
          ...i,
          values: data.jobCategories
            .filter(
              (c) => c.id >= 100 && c.id < 1000 && Math.floor(c.id / 10) == i.id
            )
            .map((i) => ({
              ...i,
              values: data.jobCategories
                .filter(
                  (c) =>
                    c.id >= 1000 &&
                    c.id < 10000 &&
                    Math.floor(c.id / 10) == i.id
                )
                .map((i) => ({
                  ...i,
                  values: data.jobCategories.filter(
                    (c) => c.id >= 100000 && Math.floor(c.id / 100) == i.id
                  ),
                })),
            })),
        })),
    }));

  return <CategoryList levels={levels} />;
}
