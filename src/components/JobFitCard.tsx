import React from "react";

export default function JobFitCard({ title, imageURL }) {
  return (
    <div className="flex-1 w-full rounded-lg overflow-hidden shadow-sm">
      <img src={imageURL} alt="" className=" w-full h-48 object-cover" />
      <div className="p-6 place-content-center">
        <h3 className="font-bold text-lg text-center">{title}</h3>
      </div>
    </div>
  );
}
