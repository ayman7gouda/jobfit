import HeaderHero from "./HeaderHero";
import MarketJobFit from "./MarketJobFit";
import CareerData from "./CareerData";
import StudyWSU from "./StudyWSU";
import Footer from "templates/Footer";
import ReadyApply from "./ReadyApply";

export default function Landing() {
  return (
    <div>
      <HeaderHero />
      <MarketJobFit />
      <CareerData />
      <StudyWSU />
      <ReadyApply />
    </div>
  );
}
