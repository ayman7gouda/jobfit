import classNames from 'classnames';
import { useMemo, useState } from 'react';

import { SearchBar } from 'components/Admin/SubjectSkills/SearchBar';
import debounce from 'lodash/debounce';
import { HiFilm } from 'react-icons/hi';

import { SubjectSearchResults } from './SearchResults';

export function SubjectSkillSearch() {
  const [searchQuery, setSearchQuery] = useState();

  const processQuery = useMemo(() => {
    return debounce(setSearchQuery, 500);
  }, [setSearchQuery]);

  return (
    <div
      className={classNames("flex justify-center items-center flex-col", {
        ["h-full"]: !searchQuery,
        ["mt-8"]: searchQuery,
      })}
    >
      <SearchBar setSearchQuery={processQuery as any} />

      {!searchQuery && (
        <a
          href="https://youtu.be/tu33sCvtazQ"
          target="_blank"
          className="mt-4 text-crimson flex items-center"
        >
          <HiFilm className="mr-2" /> See the instructional video
        </a>
      )}

      {searchQuery && (
        <div className="mt-10">
          <SubjectSearchResults query={searchQuery} />
        </div>
      )}
      <style jsx global>{`
        body,
        html,
        #__next {
          height: 100%;
        }
      `}</style>
    </div>
  );
}

export default SubjectSkillSearch;
