import React from "react";
import Results from "components/Questionnaire/Results/Results";
import Link from "next/link";

function ResultsPage() {

  const results =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("matchs"))
      : null;

  return <>{results && <Results results={results} />} </>;
}

export default ResultsPage;
