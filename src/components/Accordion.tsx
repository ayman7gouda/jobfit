import React, { useState } from "react";
import { AccordionData } from "./types";
import AccordionItems from "./AccordionItems";

function Accordion({ items }: { items: Array<AccordionData> }) {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const btnOnClick = (idx: number) => {
    setCurrentIdx((currentIdx) => (currentIdx !== idx ? idx: -1));
  };
  return (
    <ul className="list-none m-0 p-0 flex flex-col gap-6">
      {items.map((item, idx) => (
        <AccordionItems
          key={idx}
          data={item}
          isOpen={idx === currentIdx}
          btnOnClick={() => btnOnClick(idx)}
        />
      ))}
    </ul>
  );
}

export default Accordion;
