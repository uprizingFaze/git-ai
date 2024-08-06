import RepoInfo from "@/components/blocks/components/repo-info";
import CommitList from "@/components/blocks/components/commit-list";
import { SkeletonDemo } from "@/components/blocks/skeletons/test";
import { Suspense } from "react";
import type { Metadata } from "next";
import CommitActivity from "@/components/blocks/components/commit-ac";
import RepoBranch from "@/components/blocks/components/branches";
import RepoPull from "@/components/blocks/components/pulls";
import RepoPullClosed from "@/components/blocks/components/pulls-closed";
import RepoIssues from "@/components/blocks/components/issues";
import RepoContributors from "@/components/blocks/components/contributors";
import UserInfo from "@/components/blocks/components/users-info";

export const metadata: Metadata = {
  title: "Git Ai - UI",
  description: "...",
};

function Uipage() {
  return (
    <main>
      <section className="m-6 rounded-xl p-4 dark:bg-black bg-white border ">
        <p className="text-center pt-16 pb-10 text-9xl md:text-[10rem] lg:text-[12rem] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-300 dark:to-neutral-700 inset-x-0">
          Components
        </p>
      </section>
      <section className="border gap-4 bg-black m-6 rounded-xl p-6">
        <p className="text-center mb-12 text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 dark:from-neutral-950 to-neutral-300 dark:to-neutral-700 inset-x-0">
          Commits
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg bg-background h-min">
            <Suspense fallback={<SkeletonDemo />}>
              <CommitList />
            </Suspense>
          </div>
          <div className="border rounded-lg bg-background">
            <SkeletonDemo />
          </div>
        </div>
      </section>
      <section className="grid border grid-cols-1 md:grid-cols-2 gap-4 bg-black m-6 rounded-xl p-6">
        <div className="border rounded-lg bg-background">
          <RepoInfo />
        </div>
        <div className="border rounded-lg bg-background">
          <CommitActivity />
        </div>
      </section>
      <section className="grid border grid-cols-1 md:grid-cols-2 gap-4 bg-black m-6 rounded-xl p-6">
        <div className="border rounded-lg bg-background">
          <RepoBranch />
        </div>
        <div className="border rounded-lg bg-background">
          <RepoPull />
        </div>
      </section>
      <section className="grid border grid-cols-1 md:grid-cols-2 gap-4 bg-black m-6 rounded-xl p-6">
        <div className="border rounded-lg bg-background">
          <RepoPullClosed />
        </div>
        <div className="border rounded-lg bg-background">
          <UserInfo />
        </div>
      </section>
      <section className="grid border grid-cols-1 md:grid-cols-2 gap-4 bg-black m-6 rounded-xl p-6">
        <div className="border rounded-lg bg-background">
          <RepoIssues />
        </div>
        <div className="border rounded-lg bg-background">
          <RepoContributors />
        </div>
      </section>
      
    </main>
  );
}

export default Uipage;
