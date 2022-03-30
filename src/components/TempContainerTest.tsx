export default function TempContainerTest(){

    return (
        <div className="bg-black w-64 h-64 relative">
            <div className="w-32 h-32 absolute top-4 left-4 z-10">
                <img
                src="images/image.png"
                alt=""
                className=""
              />
            </div>
            <div className="w-32 h-32 absolute bottom-4 right-4 z-20">
            <img
                src="images/dude.png"
                alt=""
                className=""
              />
            </div>
            <div className="bg-[#e90133] h-16 w-32 content-center absolute -bottom-16 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                <button className="text-white">Try jobFit</button>
            </div>
        </div>

    );
}