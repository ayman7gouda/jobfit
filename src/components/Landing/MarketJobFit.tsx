import JobFitFrame from "components/JobFitFrame";

export default function MarketJobFit() {
  return (
    <section className=" bg-backgrounds-light-grey font-OpenSans">
      <div className="container flex flex-col-reverse gap-4 lg:flex-row pt-12 pb-12 lg:pt-24 lg:pb-24">
        <div className="flex-none w-1/2 h-[38rem] relative ">
          <div className="w-84 h-84 absolute top-0 left-0 z-10">
            <img src="images/image.png" alt="" className="" />
          </div>
          <div className="w-84 h-84 absolute bottom-0 right-0 z-20">
            <img src="images/dude.png" alt="" className="" />
          </div>
          <div className="content-center absolute -bottom-[12rem] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
          <button type="button" className="w-full lg:w-[24rem] h-[10rem] lg:h-[10rem] btn-red">
              <div className="text-xs lg:text-2xl text-bold text-white">Tryout JobFit Now</div>
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-start lg:items-start gap-12">
          <h2 className="text-3xl font-extrabold">How JobFit Works</h2>
          <p className="leading-wsu">
            When you enter the JobFit system, it intelligently monitors your
            study progress and proactively offers alternative pathways to
            maximise your acquisition of skills related to your goals.
          </p>
          <div className="grid sm:grid-cols-2 sm:gap-x-6">
            <div className="sm:mr-6">
              <JobFitFrame
                title="Informed"
                icon="images/ChatDots.png"
                content="JobFit keeps you informed about the skills you gain when completing a unit"
              />
            </div>

            <div className="sm:mt-6">
              <JobFitFrame
                title="Meaningful"
                icon="images/ChatDots.png"
                content="See your skills profile  represented visibly and how it matches against your career goal"
              />
            </div>
            <div className="sm:mr-6">
              <JobFitFrame
                title="Recognised"
                icon="images/CheckCircle.png"
                content="Skills earned are based on industry recongnised frameworks for science, technology and business"
              />
            </div>

            <div className="sm:mt-6">
              <JobFitFrame
                title="Control"
                icon="images/Gauge.png"
                content="Change your learning path or extend your skills based on real-time system feedback"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
