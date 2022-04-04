export default function ReadyApply() {
  return (
    <section className="relative bg-lightest-grey font-OpenSans">
      <div className="container flex flex-col items-center gap-12 py-12 lg:py-24">
        <h2 className="text-[32px] font-bold leading-wsu">
          Ready to take the next step in your career?
        </h2>
        <button
          type="button"
          className="w-full lg:w-[36rem] h-[4rem] lg:h-[4rem] btn-red"
        >
          <div className="text-xs lg:text-2xl font-bold text-white">
            Take the JobFit questionnaire
          </div>
        </button>
        <div className="h-px w-full bg-[#c4c2c3]"></div>
        <h3 className="text-[20px] leading-wsu font-bold">
          Apply now and start your unlimited journey.
        </h3>
        <div className="flex flex-1 flex-col lg:flex-row gap-2">
          <button
            type="button"
            className="w-[332px] h-[52px] bg-hilight-orange"
          >
            <div className="  text-[14px] font-bold text-black">
              APPLY AT WESTERN SYDNEY UNIVERSITY
            </div>
          </button>
          <button
            type="button"
            className="w-[216px] h-[52px] border border-black"
          >
            <div className="  text-[14px] font-bold text-black">
              VIEW PROGRAM OFFERS
            </div>
          </button>
        </div>
      </div>
    </section>
  );
}
