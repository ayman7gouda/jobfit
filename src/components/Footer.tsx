export default function Footer() {
  return (
    <footer className="bg-wsu-black font-chronicle text-white">
      <div className="container">
        <div className="table-row w-full">
          <div className="table-cell w-1/3">
            <h3 className="">Footer Links</h3>
            <div>
              <ul>
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
          <div className="table-cell w-1/3">
            <h3>Contact Us</h3>
          </div>
          <div className="table-cell w-1/3">
            <h3>Follow Us</h3>
            <div>
              <ul>
                <li>
                  <a
                    href="https://www.facebook.com/westernsydneyu/"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-facebook.svg"
                      alt="Western Sydney University Facebook Account"
                    />
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.instagram.com/westernsydneyu/"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-instagram.svg"
                      alt="Western Sydney University Instagram Account"
                    />
                  </a>
                </li>

                <li>
                  <a href="https://twitter.com/westernsydneyu" target="_blank">
                    <img
                      src="/icons/icon-twitter.svg"
                      alt="Western Sydney University Twitter Account"
                    />
                  </a>
                </li>

                <li>
                  <a
                    href="https://www.snapchat.com/add/westernsydneyu"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-snapchat.svg"
                      alt="Western Sydney University Snapchat Account"
                    />
                  </a>
                </li>

                <li>
                  <a
                    href="https://au.linkedin.com/school/western-sydney-university/"
                    target="_blank"
                  >
                    <img
                      src="/icons/icon-linkedin.svg"
                      alt="Western Sydney University LinkedIn Account"
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
