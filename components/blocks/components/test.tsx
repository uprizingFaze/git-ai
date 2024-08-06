import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchRepoCommit } from "@/app/api/github-api";

export default async function Test({
  username = "uprizingFaze",
  repository = "git-ai",
}: {
  username?: string;
  repository?: string;
}) {

  const githubCommits = await fetchRepoCommit(username, repository);

  return (
    <section className="">
      <ScrollArea className="h-72 max-w-2xl ">
        <div className="p-6">
          <h4 className="mb-4 text-xl font-medium leading-none">Commits</h4>
          {githubCommits.map((commit: any) => {
            const message = commit.commit.message;
            const truncatedMessage =
              message.length > 50 ? message.substring(0, 50) + "..." : message;
            return (
              <div
                key={commit.sha}
                className="text-sm dark:bg-black bg-white border rounded-md my-2 p-2"
                title={message}
              >
                {truncatedMessage}
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </section>
  );
}
