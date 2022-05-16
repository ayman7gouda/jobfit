export default function Footer() {
  return (
    <footer className="bg-wsu-black font-chronicle text-white">
      <div className="container md:px-10">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-10 pb-14">
          <div className="lg:w-[35%] lg:mt-8">
            <h3 className="lg:mt-6 lg:mb-8 opacity-0">Footer Links</h3>
            <div>
              <ul className="grid grid-cols-2 gap-8 font-OpenSans text-base">
                <li>
                  <a
                    className="hover:underline"
                    href="https://www.westernsydney.edu.au/accessibility_statement/web_accessibility_statement"
                    target="_blank"
                  >
                    Accessibility
                  </a>
                </li>

                <li>
                  <a
                    className="hover:underline"
                    href="https://www.westernsydney.edu.au/webservices/wsu/report_a_problem"
                    target="_blank"
                  >
                    Feedback
                  </a>
                </li>

                <li>
                  <a
                    className="hover:underline"
                    href="https://www.westernsydney.edu.au/future/study/how-to-apply/admission-transparency-information"
                    target="_blank"
                  >
                    Admissions Transparency
                  </a>
                </li>

                <li>
                  <a
                    className="hover:underline"
                    href="https://www.westernsydney.edu.au/complaints/complaints_management_and_resolution"
                    target="_blank"
                  >
                    Complaints Unit
                  </a>
                </li>

                <li>
                  <a
                    className="hover:underline"
                    href="https://www.westernsydney.edu.au/footer/disclaimer"
                    target="_blank"
                  >
                    Disclaimer
                  </a>
                </li>

                <li>
                  <a
                    className="hover:underline"
                    href="https://www.westernsydney.edu.au/footer/privacy"
                    target="_blank"
                  >
                    Privacy
                  </a>
                </li>

                <li>
                  <a
                    className="hover:underline"
                    href="https://www.westernsydney.edu.au/about_uws/leadership/governance/government_information_public_access_act_2009"
                    target="_blank"
                  >
                    Right to Information
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="lg:w-[40%] md:mt-4 lg:mt-8">
            <div className="lg:hidden h-[1px] w-full bg-gray-600" />
            <h3 className="mt-4 mb-6 md:mt-6 md:mb-8 text-xl text-white font-normal">
              Contact Us
            </h3>
            <div className="grid grid-cols-2 font-OpenSans">
              <div className="grid grid-rows-2 gap-4">
                <button className="flex flex-row gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <a
                    className="hover:underline text-left"
                    href="tel:1300897669"
                  >
                    1300 897 669
                  </a>
                </button>
                <button className="flex flex-row gap-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a className="hover:underline text-left" href="#">
                    Email Us
                  </a>
                </button>
              </div>
              <button className="flex flex-row gap-4">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M20 6H10v2h10v12H4V8h2v4h2V4h6V0H6v6H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2z"></path>
                </svg>
                <span className="text-left">
                  Locked Bag 1797
                  <br />
                  Penrith
                  <br />
                  NSW 2751
                </span>
              </button>
            </div>
          </div>
          <div className="lg:w-[22%] mb:mt-4 lg:mt-8">
            <div className="lg:hidden h-[1px] w-full bg-gray-600" />
            <h3 className="mt-4 mb-6 md:mt-6 md:mb-8 text-xl text-white font-normal">
              Follow Us
            </h3>
            <div>
              <ul className="-mx-1 my-0 p-0 text-[0px] leading-[0px]">
                <li className="inline-block list-none m-0 p-[4px]">
                  <a
                    className="block h-14 w-14 btn-wsu-footer relative"
                    href="https://www.facebook.com/westernsydneyu/"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-facebook.svg"
                      alt="Western Sydney University Facebook Account"
                      className="w-10 absolute z-[7] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </a>
                </li>
                <li className="inline-block list-none m-0 p-[4px]">
                  <a
                    className="block h-14 w-14 btn-wsu-footer relative"
                    href="https://www.instagram.com/westernsydneyu/"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-instagram.svg"
                      alt="Western Sydney University Instagram Account"
                      className="w-10 absolute z-[7] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </a>
                </li>
                <li className="inline-block list-none m-0 p-[4px]">
                  <a
                    className="block h-14 w-14 btn-wsu-footer relative"
                    href="https://twitter.com/westernsydneyu"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-twitter.svg"
                      alt="Western Sydney University Twitter Account"
                      className="w-10 absolute z-[7] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </a>
                </li>
                <li className="inline-block list-none m-0 p-[4px]">
                  <a
                    className="block h-14 w-14 btn-wsu-footer relative"
                    href="https://www.snapchat.com/add/westernsydneyu"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-snapchat.svg"
                      alt="Western Sydney University Snapchat Account"
                      className="w-10 absolute z-[7] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </a>
                </li>
                <li className="inline-block list-none m-0 p-[4px]">
                  <a
                    className="block h-14 w-14 btn-wsu-footer relative"
                    href="https://au.linkedin.com/school/western-sydney-university/"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-linkedin.svg"
                      alt="Western Sydney University LinkedIn Account"
                      className="w-10 absolute z-[7] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="grid grid-row-3 lg:grid-cols-4 md:gap-10 lg:gap-16 pb-8">
          <div className="md:col-span-2 text-xs font-OpenSans leading-4 font-normal mb-10 md:mb-0">
            Western Sydney University Copyright © 2004-2022
            <br />
            ABN 53 014 069 881
            <br />
            CRICOS Provider No: 00917K
          </div>
          <div className="text-xs md:text-base font-OpenSans leading-4 font-normal mb-6 ml-3 mb:ml-0">
            <a
              href="https://www.timeshighereducation.com/world-university-rankings/western-sydney-university"
              target="_blank"
            >
              <span>Top 50 Universities under 50 years old</span>
            </a>
          </div>
          <div className="text-xs md:text-base font-OpenSans leading-4 font-normal mb-6 ml-3 mb:ml-0">
            <a
              href="https://www.westernsydney.edu.au/equity-and-diversity/equality"
              target="_blank"
            >
              <span>Employer of Choice For Women</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
