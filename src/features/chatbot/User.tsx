export default function User({ content }: { content: string }) {
  return (
    <>
      <div className="flex justify-end mb-4">
        <div
          className="inline-flex p-4 bg-scaleGray-200 rounded-md items-center gap-2 w-auto"
          style={{ maxWidth: "320px" }}
        >
          <div className="text-right text-black text-sm font-normal leading-tight">{content}</div>
        </div>
      </div>
    </>
  );
}
