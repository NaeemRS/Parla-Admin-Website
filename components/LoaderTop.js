function LoaderTop() {
  return (
    <div className="fixed top-0 bottom-0 left-0 right-0 overflow-hidden z-[999999] backdrop-blur-lg">
      <div className="flex h-[100vh]">
        <div className="m-auto">
          <img
            // width={"300"}
            // height={"450"}
            src="/images/logo.svg"
            alt="Loader"
            className="animate-pulse md:w-[300px] w-[100px]"
          />
          <div className="flex justify-center mt-5">
            <div className="loader"></div></div>
        </div>
      </div>
    </div>
  );
}
export default LoaderTop;