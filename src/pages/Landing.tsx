import HeaderHero from "../components/Landing/HeaderHero";
import MarketJobFit from "../components/Landing/MarketJobFit";
import CareerData from "../components/Landing/CareerData";
import StudyWSU from "../components/Landing/StudyWSU";
import Footer from "components/Footer";
import ReadyApply from "../components/Landing/ReadyApply";

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
