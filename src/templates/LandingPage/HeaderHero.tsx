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

      <section className="relative">
        <div className="container flex flex-col-reverse lg:flex-row items-center gap-12 py-14 lg:py-24">
          <div className="flex flex-1 flex-col item-center lg:items-start">
            <h1 className="text-white text-2xl md:text-3xl lg:text-4xl text-center lg:text-left mb-10">
              Take control of your career goals with 
              <a className="text-red-500"> JobFit </a> 
              at Western Sydney University
            </h1>
            <p className="text-white text-lg text-center lg:text-left mb-10">
            Explore and experiment with your university study journey to help you land the best job fit for your career goals and skills.
            </p>
            <div className="flex justify-center flex-wrap gap-8 mt-10">
                <button type="button" className="w-64 h-16 rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg text-2xl text-white bg-crimson">Tryout JobFit Now</button>
                <button type="button" className="px-4 h-16 rounded-tr-3xl rounded-bl-3xl rounded-tl-lg rounded-br-lg text-2xl text-white bg-crimson">Program Offers</button>
            </div>
          </div>
        <div className="flex justify-center flex-1 mb-10 md:mb-16 lg:mb-0 z-10">
            <img src="./images/hero_01.png" alt="" className="w-5/6 h-5/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full" />
        </div>
        </div>
      </section>
    </section>
  );
}