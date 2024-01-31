export default function StandingsShimmer({ size }:{size:number}) {
  const arr = Array(size).fill(0);

  return (
    <div className="mb-2 mt-8 space-y-4 p-5">
      {arr.map((shimmer, index) => (
        <div className="grid grid-cols-12 gap-3" key={index}>
          <div className="col-span-1 h-6 w-full animate-pulse rounded-md bg-gray-300"></div>
          <div className="col-span-2 h-6 w-full animate-pulse rounded-md bg-gray-300"></div>
          <div className="col-span-1 h-6 w-full animate-pulse rounded-md bg-gray-300"></div>
          <div className="col-span-1 h-6 w-full animate-pulse rounded-md bg-gray-300"></div>
          <div className="col-span-1 h-6 w-full animate-pulse rounded-md bg-gray-300"></div>
          <div className="col-span-1 h-6 w-full animate-pulse rounded-md bg-gray-300"></div>
          <div className="col-span-1 h-6 w-full animate-pulse rounded-md bg-gray-300"></div>
          <div className="col-span-1 h-6 w-full animate-pulse rounded-md bg-gray-300"></div>
          <div className="col-span-1 h-6 w-full animate-pulse rounded-md bg-gray-300"></div>
          <div className="col-span-1 h-6 w-full animate-pulse rounded-md bg-gray-300"></div>
          <div className="col-span-1 h-6 w-full animate-pulse rounded-md bg-gray-300"></div>
        </div>
      ))}
    </div>
  );
}
