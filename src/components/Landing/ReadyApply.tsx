export default function ReadyApply() {
  return (
    <section className="relative bg-lightest-grey">
      <div className="container flex flex-col items-center gap-12 py-12 lg:py-24">
        <h2 className=" text-2xl font-[800] md:text-[2rem] leading-wsu text-center">
          Ready to take the next step in your career?
        </h2>
        <button
          type="button"
          className="w-full md:w-[36rem] h-[4rem] lg:h-[4rem] btn-red"
        >
          <div className="text-xs lg:text-2xl font-bold text-white">
            Take the JobFit questionnaire
          </div>
        </button>
        <div className="h-px w-[100%] md:w-[80%] bg-[#c4c2c3]"></div>
        <h3 className="text-xl leading-wsu font-bold">
          Apply now and start your unlimited journey.
        </h3>
        <div className="flex flex-1 flex-col lg:flex-row items-center justify-center gap-2">
          <button
            type="button"
            className="w-full lg:w-[332px] h-[52px] btn-wsu1 p-4"
          >
            <div className="text-sm font-bold  text-center">APPLY AT WESTERN SYDNEY UNIVERSITY</div>
          </button>
          <button
            type="button"
            className="w-full lg:w-[216px] h-[52px] btn-wsu2 border border-black p-4"
          >
            <div className="text-sm font-bold">
              VIEW PROGRAM OFFERS
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
