import React, { useEffect, useRef, useState } from "react";
import { AccordionData } from "./types";

function AccordionItems({
  data,
  isOpen,
  btnOnClick,
}: {
  data: AccordionData;
  isOpen: boolean;
  btnOnClick: () => void;
}) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [color, setBg] = useState('red');

  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current as HTMLDivElement;

      setHeight(contentEl.scrollHeight);
      setBg('white');
    } else {
      setHeight(0);
      setBg('red');
    }
  }, [isOpen]);

  return (
    <li className={'w-[23rem] bg-${color} border border-[#f9f1f2] rounded-tr-2xl rounded-bl-2xl rounded-br-md rounded-tl-md p-4 text-white flex flex-col items-start'}>
      
      <h2 className="w-80 m-0 flex items-start justify-center">
        <button
          className="flex items-center justify-center w-full border-0 p-0 text-base font-bold cursor-pointer select-none"
          onClick={btnOnClick}
        >
          {data.career}
        </button>
      </h2>
      <div
        className="transition-[height] ease-in-out duration-200 overflow-hidden"
        style={{ height }}
      >
        <div ref={contentRef} className="m-[10px]">{data.description}</div>
      </div>
    </li>
  );
}

export default AccordionItems;
