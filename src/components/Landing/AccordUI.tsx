import React from "react";

const AccordUI = ({ title, children, Id, Index, setIndex }) => {
  const handleSetIndex = (Id) => Index !== Id && setIndex(Id);

  return (
    <>
      <div onClick={() => handleSetIndex(Id)}>

          {Index !== Id ? (
            <div className="w-full flex flex-col items-center justify-center bg-backgrounds-dark-blue
                            border border-med-blue rounded-tr-2xl rounded-bl-2xl rounded-br-md rounded-tl-md 
                            px-6 py-4 text-white">
              <div className="flex items-center justify-center group cursor-pointer">
                <div className="text-white text-base leading-wsu group-hover:text-white text-center">
                  {title}
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full flex flex-col gap-2 items-start bg-pine-green-54 group cursor-pointer 
                            border border-[#f9f1f2] rounded-tr-2xl rounded-bl-2xl rounded-br-md rounded-tl-md 
                            p-6 text-white">
              <div className="flex items-center justify-center group cursor-pointer">
                <div className="text-white text-2xl leading-wsu font-bold group-hover:text-white">
                  {title}
                </div>
              </div>
              {Index === Id && (
                <div className="w-full text-base text-white leading-wsu self-stretch">
                  {children}
                </div>
              )}
            </div>
          )}

      </div>
    </>
  );
};

export default AccordUI;
