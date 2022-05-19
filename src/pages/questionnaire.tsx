import { Questionnaire } from 'components/Questionnaire/Questionnaire';

function Page() {
  return (
    <>
      <Questionnaire />
      <style jsx global>{`
        body {
          background: rgb(31 41 55);
          width: 100%;
          height: 100%;
        }
        html,
        body,
        #__next {
          height: 100%;
        }
      `}</style>
    </>
  );
}

export default Page;
