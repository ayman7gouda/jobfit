import JobFitFrame from "components/Landing/JobFitFrame";
import PlayBtn from "components/Landing/PlayBtn";

export default function MarketJobFit() {
  return (
    <section className="bg-backgrounds-light-grey">
      <div className="container flex flex-col-reverse gap-4 lg:flex-row pt-12 pb-12 lg:pt-24 lg:pb-24">
        <div className="flex-none w-full lg:w-1/2 lg:h-[38rem] lg:relative ">
          <div className="hidden lg:flex lg:w-84 lg:h-84 lg:absolute lg:top-0 lg:left-0 lg:z-10">
            <img src="images/image.png" alt="" className="" />
          </div>
          <div className="hidden lg:flex lg:w-84 lg:h-84 lg:absolute lg:bottom-0 lg:right-0 lg:z-20">
            <img src="images/dude.png" alt="" className="" />
          </div>
          <div className="md:flex h-[168px] md:content-center md:justify-center lg:absolute lg:-bottom-[8rem] lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-0 lg:z-30">
            <PlayBtn
              icon="images/PlayCircle.svg"
              content="Watch how JobFit Works"
            />
          </div>
        </div>
        <div className="flex flex-none lg:w-1/2 flex-col items-center lg:items-start gap-12">
          <h2 className="text-3xl font-extrabold">How JobFit Works</h2>
          <p className="leading-wsu">
            When you enter the JobFit system, it intelligently monitors your
            study progress and proactively offers alternative pathways to
            maximise your acquisition of skills related to your goals.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-x-6 lg:gap-y-0">
            <div className="">
              <JobFitFrame
                title="Informed"
                icon="images/ChatDots.png"
                content="JobFit keeps you informed about the skills you gain when completing a unit"
              />
            </div>

            <div className="lg:mt-6">
              <JobFitFrame
                title="Meaningful"
                icon="images/ChatDots.png"
                content="See your skills profile  represented visibly and how it matches against your career goal"
              />
            </div>
            <div className="">
              <JobFitFrame
                title="Recognised"
                icon="images/CheckCircle.png"
                content="Skills earned are based on industry recongnised frameworks for science, technology and business"
              />
            </div>

            <div className="lg:mt-6">
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
