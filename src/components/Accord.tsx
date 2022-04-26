import React, { useState } from "react";
import AccordUI from "../components/AccordUI";
import { Data1 } from "components/Data1";

const Accord = () => {
  const [Index, setIndex] = useState(1);
  return (
    <div>
      {Data1.map((Data1) => {
        return (
          <AccordUI
            title={Data1.career}
            Id={Data1.id}
            children={Data1.description}
            Index={Index}
            setIndex={setIndex}
          ></AccordUI>
        );
      })}
    </div>
  );
};
export default Accord;
