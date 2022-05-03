import Footer from 'components/Footer';

import CareerData from './CareerData';
import HeaderHero from './HeaderHero';
import MarketJobFit from './MarketJobFit';
import ReadyApply from './ReadyApply';
import StudyWSU from './StudyWSU';

export default function Landing() {
  return (
    <div className="overflow-hidden">
      <HeaderHero />
      <MarketJobFit />
      <CareerData />
      <StudyWSU />
      <ReadyApply />
      <Footer />
    </div>
  );
}
