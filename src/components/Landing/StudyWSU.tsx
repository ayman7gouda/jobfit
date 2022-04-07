import JobFitCard from "components/JobFitCard";

export default function StudyWSU() {
  return (
    <section className="bg-backgrounds-light-grey">
      <div className="container flex flex-col gap-12 pt-12 lg:pt-24">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex flex-col gap-6 lg:w-[60%] items-center">
            <h3 className="leading-wsu font-bold text-2xl">
              Studying IT at Western
            </h3>
            <img src="images/dude-2.png" alt="" className="sm:hidden" />
            <p className="leading-wsu text-[1rem]">
              Our degrees will prepare you to be at the forefront of technology,
              digital industries, computer science, hardware and software
              development, computer forensics, systems security, e-business and
              internet technologies, systems architecture, project management,
              computer aid engineering, and AI.
            </p>
          </div>
          <div className="hidden lg:flex flex-col item-left w-[40%]">
            <img src="images/PHOTO.png" alt="" className="" />
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6">
          <JobFitCard
            title="Professional accreditation"
            imageURL="images/acs on background.png"
          />
          <JobFitCard title="Real-world experience" imageURL="images/vr.png" />
          <JobFitCard
            title="Flexible study options"
            imageURL="images/flexibleStudy.png"
          />
        </div>
        <div className="flex flex-col items-center gap-12 pb-12 lg:pb-24">
          <p className="font-chronicle text-2xl md:text-3xl leading-wsu md:w-3/4">
            "At WSU, I found a [program] that I wanted to study, and at a campus
            that was close to home. I am not wasting time travelling."
          </p>
          <p className="leading-wsu text-sm">
            — Darzana Ravindrarajah. Bachelor of Information and Communications
            Technology / Bachelor of Laws.
          </p>
        </div>
      </div>
    </section>
  );
}
