export default function StudyWSU() {
  return (
    <section className="bg-backgrounds-light-grey font-OpenSans">
      <div className="container flex flex-col lg:flex-row gap-12 pt-12 lg:pt-24">
        <div className="flex flex-1 flex-col item-center lg:items-start w-96">
          <h3 className="leading-wsu font-bold text-2xl mb-14">Studying IT at Western</h3>
          <p className="leading-wsu ">
            Our degrees will prepare you to be at the forefront of technology,
            digital industries, computer science, hardware and software
            development, computer forensics, systems security, e-business and
            internet technologies, systems architecture, project management,
            computer aid engineering, and AI.
          </p>
        </div>
        <div className="flex flex-col item-left w-96">
          <img src="images/PHOTO.png" alt="" />
        </div>
      </div>
      <div className="container flex flex-col lg:flex-row items-center gap-12 pt-12 lg:pt-24">
        <div className="flex flex-1 flex-col lg:flex-row item-center gap-10 ">
          <div className="flex flex-1 flex-col items-center rounded-lg">
            <img src="images/acs on background.png" alt="" className="" />
            <h4 className="text-xl font-bold mt-[14px] mb-[30px]">Professional accreditation</h4>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-lg">
            <img src="images/vr.png" alt="" className="" />
            <h4 className="text-xl font-bold mt-[14px] mb-[30px]">Real-world experience</h4>
          </div>
          <div className="flex flex-1 flex-col items-center rounded-lg">
            <img
              src="images/flexibleStudy.png"
              alt=""
              className=""
            />
            <h4 className="text-xl font-bold mt-[14px] mb-[30px]">Flexible study options</h4>
          </div>
        </div>
      </div>
      <div className="container flex flex-col items-center gap-12 pt-12 pb-12 lg:pt-24 lg:pb-24">
        <p className="font-chronicle text-3xl leading-wsu w-[764px]">
          "At WSU, I found a [program] that I wanted to study, and at a campus
          that was close to home. I am not wasting time travelling."
        </p>
        <p className="leading-wsi text-[14px]">
          — Darzana Ravindrarajah. Bachelor of Information and Communications
          Technology / Bachelor of Laws.
        </p>
      </div>
    </section>
  );
}
