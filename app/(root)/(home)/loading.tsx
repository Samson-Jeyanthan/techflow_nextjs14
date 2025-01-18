import { Skeleton } from "@/components/ui/skeleton";

const loading = () => {
  return (
    <section className="flex w-full flex-col items-center gap-8">
      <div className="mb-2 mt-11 flex flex-wrap items-center justify-between gap-5">
        <Skeleton className="h-40 flex-1" />
      </div>

      <div className="flex flex-col gap-6">
        {[1, 2, 3, 4, 5, 6].map((item) => (
          <Skeleton key={item} className="h-[32rem] w-5/6 rounded-xl" />
        ))}
      </div>
    </section>
  );
};

export default loading;
