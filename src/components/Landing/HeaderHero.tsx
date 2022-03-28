export default function HeaderHero() {
  return (
    <section className="bg-backgrounds-dark-blue font-OpenSans">
      <header>
        <nav className="container flex items-center py-5 gap-20">
          <div className="w-48 h-6">
            <img src="./images/WSU.svg" alt="" className="" />
          </div>
          <div className="w-28 h-6">
            <img src="./images/logo 2.svg" alt="" />
          </div>
          <ul className="hidden sm:flex flex-1 justify-center items-center gap-20 text-lightest-grey text-base">
            <li className="cursor-pointer">Link 1</li>
            <li className="cursor-pointer">Link 2</li>
            <li className="cursor-pointer">Link 2</li>
          </ul>
        </nav>
      </header>

      <section className="container flex flex-col-reverse lg:flex-row items-center py-10 lg:py-14">
        <div className="flex-1 w-[562px] items-start">
          <h1 className="text-white text-[36px] leading-normal font-[800] text-left mb-16">
            Take control of your career goals with
            <a className="text-red-500"> JobFit </a>
            <a className="hidden lg:inline">at Western Sydney University</a>
          </h1>
          <p className="text-white text-[20px] text-left mb-28 leading-wsu">
            Explore and experiment with your university study journey to help
            you land the best job fit for your career goals and skills.
          </p>
          <div className="flex flex-col lg:flex-row gap-3 mt-10">
            <button type="button" className="flex-1 w-64 h-16 btn-red">
              <div className="text-2xl text-white">Tryout JobFit Now</div>
            </button>
            <button type="button" className="flex-1 w-64 h-16 btn-white">
                <div className="text-2xl text-crimson">Program Offers</div>
            </button>
          </div>
        </div>
        <div className="justify-center flex-1 z-10">
          <img src="./images/hero_01.png" alt="" className="" />
        </div>
      </section>
    </section>
  );
}
