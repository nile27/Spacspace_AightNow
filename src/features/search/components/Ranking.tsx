export default function Ranking({ data }: { data: { rank: number; name: string } }) {
  return (
    <div className="w-64 py-2 justify-start items-start gap-4 inline-flex">
      <div className="justify-start items-start gap-4 flex">
        <div className="w-4 text-mainNavy-900 text-base font-bold leading-normal">{data.rank}</div>
        <div className="text-scaleGray-600 text-base font-medium leading-normal">{data.name}</div>
      </div>
    </div>
  );
}
