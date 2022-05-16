import { HiChevronRight, HiOutlineSearch } from "react-icons/hi";

export function SearchBar() {
  return (
    <div className="flex justify-center items-center flex-col h-full">
      <label
        htmlFor="search-subject"
        className="hidden text-sm font-medium text-gray-700"
      >
        Account number
      </label>
      <div className="font-OpenSans flex items-center text-xl">
        <img src="/images/jobfit.svg" className="w-16 h-16 mr-2" alt=""></img>
        <span className="font-bold flex-1">JobFit</span>
        <HiChevronRight />
        Subjects
      </div>

      <div className="mt-1 relative rounded-md shadow-sm w-96">
        <input
          type="text"
          name="search-subject"
          id="search-subject"
          className="focus:ring-crimson focus:border-crimson block w-full pl-6 py-4 pr-12 sm:text-sm border-gray-300 rounded-md"
          placeholder="Subject code or name ..."
        />
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
          <HiOutlineSearch
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </div>
      </div>
      {/* <div className="w-96">
        <label
          htmlFor="subject-name"
          className="text-sm font-medium text-gray-700 hidden"
        >
          Account number
        </label>
        <div className="mt-1 relative rounded-md shadow-sm">
          <input
            type="text"
            name="subject-name"
            id="subject-name"
            className="px-6 py-4 focus:ring-indigo-500 focus:border-indigo-500 block border-gray-300 rounded-md"
            placeholder="000-00-0000"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <HiSearch className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        </div>
      </div> */}
    </div>
  );
}
