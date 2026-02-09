export default function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm flex flex-col h-full animate-pulse">
      <div className="aspect-square bg-gray-200" />
      <div className="p-5 flex flex-col flex-grow space-y-3">
        <div className="h-6 bg-gray-300 rounded w-4/5" />
        <div className="h-5 bg-gray-300 rounded w-1/3" />
        <div className="h-10 bg-gray-300 rounded mt-auto" />
      </div>
    </div>
  );
}
