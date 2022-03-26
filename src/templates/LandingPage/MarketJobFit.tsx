export default function MarketJobFit() {
  return (
    <section className=" bg-backgrounds-light-grey font-OpenSans">
      <div className=" container flex flex-col-reverse lg:flex-row gap-12 pt-12 pb-12 lg:pt-24 lg:pb-24">
        <div className="flex flex-1 flex-col">
            <div className="flex flex-1">
            <div className="relative top-0 left-0 w-max">
            <img
              src="images/image.png"
              alt=""
              className="relative top-0 left 0 w-96 z-10"
            />
            <img
              src="images/dude.png"
              alt=""
              className="absolute top-10 left-10 w-96 z-20"
            />
            </div>
            </div>
            <div className="flex flex-1">
                <button type="button" className="">Watch how JobFit works</button></div>
            
        </div>
        <div className="flex flex-1 flex-col items-start lg:items-start gap-12">
          <h2 className="text-3xl font-extrabold">How JobFit Works</h2>
          <p className="leading-wsu">
            When you enter the JobFit system, it intelligently monitors your
            study progress and proactively offers alternative pathways to
            maximise your acquisition of skills related to your goals.
          </p>
          <div className="flex flex-1 flex-col">
            <div className="flex flex-1 flex-col sm:flex-row-reverse items-center lg:items-start">
              <div className="flex flex-1 flex-col items-start lg:items-center m-2 p-2 h-frame w-frame sm:h-44 rounded-lg bg-white shadow-sm mt-10">
                <div className="flex flex-1 flex-row items-center gap-4">
                  <img src="images/CheckCircle.png" alt="" className="" />
                  <h3 className="font-bold text-2xl">Recognised</h3>
                </div>
                <p className="text-base text-black leading-wsu text-center pt-2 pb-2">
                  Skills earned are based on industry recongnised frameworks for
                  science, technology and business
                </p>
              </div>
              <div className="flex flex-1 flex-col items-start lg:items-center m-2 p-2 h-frame w-frame sm:h-44 rounded-lg bg-white shadow-sm">
                <div className="flex flex-1 flex-row items-center gap-4">
                  <img src="images/ChatDots.png" alt="" className="" />
                  <h3 className="font-bold text-2xl">Informed</h3>
                </div>
                <p className="text-base text-black leading-[1.41] text-center pt-2 pb-2">
                  JobFit keeps you informed about the skills you gain when
                  completing a unit
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col sm:flex-row-reverse items-center lg:items-start">
              <div className="flex flex-1 flex-col items-start lg:items-center m-2 p-2 h-frame w-frame sm:h-44 rounded-lg bg-white shadow-sm mt-10">
                <div className="flex flex-1 flex-row items-center gap-4">
                  <img src="images/gauge.png" alt="" className="" />
                  <h3 className="font-bold text-2xl">Control</h3>
                </div>
                <p className="text-base text-black leading-[1.41] text-center pt-2 pb-2">
                  Change your learning path or extend your skills based on
                  real-time system feedback
                </p>
              </div>
              <div className="flex flex-1 flex-col items-start lg:items-center m-2 p-2 h-frame w-frame sm:h-44 rounded-lg bg-white shadow-sm">
                <div className="flex flex-1 flex-row items-center gap-4">
                  <img src="images/CheckCircle.png" alt="" className="" />
                  <h3 className="font-bold text-2xl">Meaningful</h3>
                </div>
                <p className="text-base text-black leading-[1.41] text-center pt-2 pb-2">
                  See your skills profile represented visibly and how it matches
                  against your career goal
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
