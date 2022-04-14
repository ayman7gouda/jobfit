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

  useEffect(() => {
    if (isOpen) {
      const contentEl = contentRef.current as HTMLDivElement;

      setHeight(contentEl.scrollHeight);
    } else {
      setHeight(0);
    }
  }, [isOpen]);

  return (
    <li className="border border-white flex flex-col items-start ">
      <h2 className="w-full m-0 flex items-start justify-center">
        <button
          className="flex items-start justify-start w-full border-0 p-10 text-lg font-bold cursor-pointer select-none"
          onClick={btnOnClick}
        >
          {data.title}
        </button>
      </h2>
      <div
        className="transition-[height] ease-in-out duration-200 overflow-hidden"
        style={{ height }}
      >
        <div ref={contentRef} className="m-[20px]">{data.content}</div>
      </div>
    </li>
  );
}

export default AccordionItems;
