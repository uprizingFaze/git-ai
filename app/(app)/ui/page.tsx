import Repo from "@/components/blocks/components/repo";
import Test from "@/components/blocks/components/test";
import { SkeletonDemo } from "@/components/blocks/skeletons/test";
import { Suspense } from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Git Ai - UI",
  description: "...",
};

function Uipage() {
  return (
    <div className="m-4 p-4 dark:bg-black bg-white border rounded-md">
      <p className="text-center pt-16 pb-10 text-9xl md:text-[10rem] lg:text-[12rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-300 dark:to-neutral-700 inset-x-0">
        Components
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 ">
        <Suspense fallback={<SkeletonDemo />}>
          <div className="border p-2">
            <Test />
          </div>
        </Suspense>
        <div className="border p-2">
          <SkeletonDemo />
        </div>
        <div className="border p-2">
          <Repo />
        </div>
      </div>
    </div>
  );
}

export default Uipage;
