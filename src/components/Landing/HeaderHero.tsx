export default function HeaderHero() {
  return (
    <section className="bg-backgrounds-dark-blue overflow-hidden">
      <header className="container">
        <nav className="flex justify-between lg:items-center py-5 gap-20">
          <div className="hidden lg:flex w-48 h-6">
            <img src="./images/WSU.svg" alt="" className="" />
          </div>

          <div className="lg:hidden h-6">
            <img src="./images/list.svg" alt="" className="" />
          </div>
          <div className="w-28 h-6">
            <img src="./images/logo 2.svg" alt="" />
          </div>
          <ul className="hidden lg:flex flex-1 justify-center items-center gap-20 text-lightest-grey text-base">
            <li className="cursor-pointer">Link 1</li>
            <li className="cursor-pointer">Link 2</li>
            <li className="cursor-pointer">Link 2</li>
          </ul>
          <div className="lg:hidden h-6">
            <img src="./images/WSU-sm.png" alt="" className="" />
          </div>
        </nav>
      </header>

      <section className="container flex flex-col-reverse lg:flex-row items-center py-28">
        <div className="flex-1 lg:w-1/2 items-start">
          <h1 className="text-white text-[24px] lg:text-[36px] leading-normal font-[800] text-left mb-8 lg:mb-16 self-stretch">
            Take control of your career goals with
            <a className="text-cherry-red"> JobFit </a>
            <a className="hidden lg:inline">at Western Sydney University</a>
          </h1>
          <p className="text-white text-[16px] lg:text-[20px] text-left mb-8 lg:mb-28 leading-wsu">
            Explore and experiment with your university study journey to help
            you land the best job fit for your career goals and skills.
          </p>
          <div className="flex flex-col lg:flex-row md:items-center gap-3 lg:mt-10">
            <button
              type="button"
              className="w-full h-8 md:h-14 md:w-1/2 content-center justify-center lg:w-[264px] lg:h-[66px] btn-red"
            >
              <div className="text-xs md:text-sm lg:text-2xl font-bold text-white">
                Tryout JobFit Now
              </div>
            </button>
            <div className="w-full h-[33px] md:w-1/2 md:h-14 lg:w-[233px] lg:h-[66px] p-[2px] btn-brd">
              <button type="button" className="w-full h-full btn-white">
                <div className="text-xs md:text-sm lg:text-2xl font-bold text-crimson">
                  Program Offers
                </div>
              </button>
            </div>
          </div>
        </div>
        <div className="relative lg:w-1/2">
          <div className="relative h-full w-full z-20">
            <img src="images/hero_01.png" alt="" />
            <div className="absolute w-[65%] md:w-1/2 lg:w-1/2 inset-y-[30%] -left-6 md:top-10 md:left-0 lg:-top-10 lg:-left-6 z-30">
              <img src="images/grab 01.svg" alt="" className="" />
              <div className="relative -z-10">
                <div className="md:rotate-[24deg] absolute top-0 -left-8 md:-top-8 md:bottom-0 md:left-4">
                  <img
                    src="images/hex.png"
                    alt=""
                    className="object-contain w-[10rem] md:w-[25rem]"
                  />
                </div>
              </div>
            </div>
            <div className="absolute w-[50%] md:w-[40%] lg:w-[40%] inset-y-[60%] -right-5 md:top-24 md:right-0 lg:top-24 lg:right-0 z-30">
              <img src="images/grab 02.svg" alt="" className="" />
            </div>
            <div className="hidden md:flex lg:flex absolute w-[45%] md:bottom-16 right-0 bottom-0 md:right-10 lg:bottom-10 lg:right-10 z-30">
              <img src="images/grab 03.svg" alt="" className="" />
            </div>
          </div>

          <div className="absolute z-10 top-[5%] bottom-[5%] -right-24 md:top-[14rem] md:bottom-0 md:-right-16">
            <img
              src="images/hex.png"
              alt=""
              className="object-contain w-[50%] md:w-[20rem] opacity-50"
            />
          </div>
        </div>
      </section>
    </section>
  );
}
