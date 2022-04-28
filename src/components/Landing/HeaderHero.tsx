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

      <section className="container flex flex-col-reverse lg:flex-row items-center mb-6 md:py-4">
        <div className="flex-1 lg:w-1/2 items-start lg:pt-4 lg:pr-8">
          <h1 className="text-white text-2xl lg:text-4xl leading-normal lg:leading-normal font-extrabold text-left mb-8 lg:mb-12">
            Take control of your career goals with
            <a className="text-cherry-red"> JobFit </a>
            <a className="hidden lg:inline">at Western Sydney University</a>
          </h1>
          <p className="text-white text-base lg:text-xl text-justify mb-8 lg:mb-20 leading-wsu">
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
        <div className="w-[20rem] h-[20rem] md:w-[40rem] md:h-[40rem]">
          <div className="w-full h-full relative">
            <div className="absolute w-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
              <img src="images/hero_01.png" alt="" className="object-cover" />
            </div>
            <div className="absolute w-[65%] -left-8 top-24 md:w-1/2 md:top-5 md:-left-8 lg:top-4 lg:-left-6 z-30">
              <img src="images/grab 01.svg" alt="" className="" />
            </div>
            <div className="absolute w-[50%] md:w-[40%] inset-y-[60%] -right-5 md:top-24 md:right-0 lg:top-24 lg:right-0 z-30">
              <img src="images/grab 02.svg" alt="" className="" />
            </div>
            <div className="absolute hidden md:flex w-[45%] right-0 bottom-0 md:right-10 md:bottom-10 lg:right-8 lg:bottom-20 z-30">
              <img src="images/grab 03.svg" alt="" className="" />
            </div>
            <div className="absolute w-1/2 top-0 -left-8 md:w-full md:top-10 md:-left-5 lg:w-full lg:top-20 lg:left-12 md:rotate-[24deg] z-10">
              <img src="images/hex.png" alt="" />
            </div>
            <div className="absolute w-4/5 -right-24 md:w-1/2 md:bottom-14 md:-right-10 lg:w-1/2 lg:bottom-10 lg:right-2 opacity-70 md:opacity-100 z-10">
              <img src="images/hex.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
