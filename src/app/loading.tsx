import Header from "@/components/Header";
const loading = () => {
  return (
    <div>
      <Header />
      <div
        className={`bg-background m-0 p-0 h-[100vh] w-[100vw] flex justify-center items-center relative`}
      >
        <div
          className={`bg-white rounded-xl m-0 p-0 h-[300px] w-[300px] flex justify-center items-center relative`}
        >
          <div className="flex gap-3 text-H text-black relative">
            <span className=" animate-[blur_3s_infinite_0ms]">L</span>
            <span className=" animate-[blur_3s_infinite_200ms]">O</span>
            <span className=" animate-[blur_3s_infinite_400ms]">A</span>
            <span className="animate-[blur_3s_infinite_800ms]">D</span>
            <span className=" animate-[blur_3s_infinite_1200ms]">E</span>
            <span className=" animate-[blur_3s_infinite_1400ms]">R</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default loading;
