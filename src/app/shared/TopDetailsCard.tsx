export default function TopDetailsCard({
  children,
  title,
}: {
  children: any;
  title: any;
}) {
  return (
    <div className="flex flex-col items-center rounded-2xl border-[1px] border-primary">
      <div className=" w-full">
        <div className="mb-5 mt-2 flex h-full items-center justify-start px-4 pt-4">
          <h4 className="select-none text-sm font-light text-white">{title}</h4>
        </div>
      </div>
      <div className="h-auto w-full">
        <div className="p-2">{children}</div>
      </div>
    </div>
  );
}
