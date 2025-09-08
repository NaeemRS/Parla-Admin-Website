export default function Loader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-[5px] bg-white/10">
      <div className="animate-spin rounded-full h-24 w-24 border-b-[10px] border-orange-500"></div>
    </div>
  );
}
