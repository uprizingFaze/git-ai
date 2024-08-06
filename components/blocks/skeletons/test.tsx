import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
  return (
    <section className="m-6 w-[28rem]">
      <Skeleton className="h-6 w-32" />
      <div className="space-y-2 mt-3">
        <Skeleton className="h-9 max-w-2xl" />
        <Skeleton className="h-9 max-w-2xl" />
        <Skeleton className="h-9 max-w-2xl" />
        <Skeleton className="h-9 max-w-2xl" />
        <Skeleton className="h-9 max-w-2xl" />
      </div>
    </section>
  );
}
