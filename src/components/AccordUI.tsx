import React from "react";

const AccordUI = ({ title, children, Id, Index, setIndex }) => {
  const handleSetIndex = (Id) => Index !== Id && setIndex(Id);

  return (
    <>
      <div onClick={() => handleSetIndex(Id)}>
        <div className="">
          {Index !== Id ? (
            <div className="w-[23rem] border border-med-blue rounded-tr-2xl rounded-bl-2xl rounded-br-md rounded-tl-md p-4 text-white flex flex-col items-center bg-backgrounds-dark-blue mb-4">
              <div className="flex group cursor-pointer">
                <div className="text-white font-semibold group-hover:text-white">
                  {title}
                </div>
              </div>
            </div>
          ) : (
            <div className="group cursor-pointer w-[23rem] border border-[#f9f1f2] rounded-tr-2xl rounded-bl-2xl rounded-br-md rounded-tl-md p-4 text-white flex flex-col gap-2 items-start bg-pine-green-54 mb-4">
              <div className="flex group cursor-pointer">
                <div className="text-white font-semibold pl-10 group-hover:text-white">
                  {title}
                </div>
              </div>
              {Index === Id && (
                <div className="pl-10  font-semibold text-white w-full h-auto p-4 mb-2 ">
                  {children}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AccordUI;
