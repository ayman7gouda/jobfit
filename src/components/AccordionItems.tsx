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
  const [background, setBg] = useState('backgrounds-light-grey');

  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current as HTMLDivElement;

      setHeight(contentEl.scrollHeight);
      setBg('pine-green-54');
    } else {
      setHeight(0);
      setBg('backgrounds-light-grey');
    }
  }, [isOpen]);

  return (
    <li className="w-[23rem] border border-[#f9f1f2] rounded-tr-2xl rounded-bl-2xl rounded-br-md rounded-tl-md p-4 text-white flex flex-col items-start bg-[background]"
    style={{ background }}>
      <h2 className="w-80 m-0 flex items-start justify-center">
        <button
          className="flex items-center justify-center w-full border-0 p-0 text-base font-bold cursor-pointer select-none"
          onClick={btnOnClick}
        >
          {data.title}
        </button>
      </h2>
      <div
        className="transition-[height] ease-in-out duration-200 overflow-hidden"
        style={{ height }}
      >
        <div ref={contentRef} className="m-[10px]">{data.content}</div>
      </div>
    </li>
  );
}

export default AccordionItems;
