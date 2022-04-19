export default function Footer() {
  return (
    <footer className="bg-wsu-black font-chronicle text-white">
      <div className="container">
        <div className="grid grid-cols-3 gap-4">
          <div className="">
            <h3 className="mb-10 opacity-0">Footer Links</h3>
            <div className="">
              <ul className="grid grid-cols-2 gap-8">
                <li>
                  <a
                    href="https://www.westernsydney.edu.au/accessibility_statement/web_accessibility_statement"
                    target="_blank"
                  >
                    Accessibility
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.westernsydney.edu.au/webservices/wsu/report_a_problem"
                    target="_blank"
                  >
                    Feedback
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.westernsydney.edu.au/future/study/how-to-apply/admission-transparency-information"
                    target="_blank"
                  >
                    Admissions Transparency
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.westernsydney.edu.au/complaints/complaints_management_and_resolution"
                    target="_blank"
                  >
                    Complaints Unit
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.westernsydney.edu.au/footer/disclaimer"
                    target="_blank"
                  >
                    Disclaimer
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.westernsydney.edu.au/footer/privacy"
                    target="_blank"
                  >
                    Privacy
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.westernsydney.edu.au/about_uws/leadership/governance/government_information_public_access_act_2009"
                    target="_blank"
                  >
                    Right to Information
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="">
            <h3 className="mb-10">Contact Us</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="grid grid-rows-2">
                <a href="tel:1300897669">1300 897 669</a>
                <a href="#">Email Us</a>
              </div>
              <address className="">
                Locked Bag 1797 <br /> Penrith <br /> NSW 2751{" "}
              </address>
            </div>
          </div>
          <div className="">
            <h3 className="mb-10">Follow Us</h3>
            <div className="">
              <ul className="p-4 mx-16 space-y-4">
                <li className=" btn-wsu-footer inline-block">
                  <a
                    href="https://www.facebook.com/westernsydneyu/"
                    target="_blank"
                    className="relative w-14 h-14"
                  >
                    <img
                      src="/icons/icon-facebook.svg"
                      alt="Western Sydney University Facebook Account"
                      className="w-10 absolute top-1/2 left-1/2"
                    />
                  </a>
                </li>
                <li className="w-14 h-14 btn-wsu-footer inline-block">
                  <a
                    href="https://www.instagram.com/westernsydneyu/"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-instagram.svg"
                      alt="Western Sydney University Instagram Account"
                      className="w-10"
                    />
                  </a>
                </li>

                <li className="w-14 h-14 btn-wsu-footer inline-block">
                  <a href="https://twitter.com/westernsydneyu" target="_blank">
                    <img
                      src="/icons/icon-twitter.svg"
                      alt="Western Sydney University Twitter Account"
                      className="w-10"
                    />
                  </a>
                </li>

                <li className="w-14 h-14 btn-wsu-footer inline-block">
                  <a
                    href="https://www.snapchat.com/add/westernsydneyu"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-snapchat.svg"
                      alt="Western Sydney University Snapchat Account"
                      className="w-10"
                    />
                  </a>
                </li>

                <li className="w-14 h-14 btn-wsu-footer inline-block">
                  <a
                    href="https://au.linkedin.com/school/western-sydney-university/"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-linkedin.svg"
                      alt="Western Sydney University LinkedIn Account"
                      className="w-10"
                    />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="table-row w-full">
          <div className="table-cell w-1/2">
            <div>
              {" "}
              Western Sydney University Copyright © 2004-2022
              <br />
              ABN 53 014 069 881
              <br />
              CRICOS Provider No: 00917K
            </div>
          </div>
          <div className="table-cell w-1/2">
            <ul>
              <ul>
                <li>
                  <a
                    href="https://www.timeshighereducation.com/world-university-rankings/western-sydney-university"
                    target="_blank"
                  >
                    <span>Top 50 Universities under 50 years old</span>
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.westernsydney.edu.au/equity-and-diversity/equality"
                    target="_blank"
                  >
                    <span>Employer of Choice For Women</span>
                  </a>
                </li>
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
