import { ScrollArea } from "@/components/ui/scroll-area";
import { fetchRepoCommit } from "@/app/api/github-api";

export default async function CommitList({
  username = "vercel",
  repository = "ai-chatbot",
}: {
  username?: string;
  repository?: string;
}) {
  const githubCommits = await fetchRepoCommit(username, repository);

  return (
    <section className="">
      <h4 className="mb-4 text-xl font-medium leading-none">Commits</h4>
      <ScrollArea className="h-72 max-w-2xl my-4 mx-3 pr-4">
        {githubCommits.map((commit: any) => {
          const message = commit.commit.message;
          const truncatedMessage =
            message.length > 50 ? message.substring(0, 50) + "..." : message;
          return (
            <div
              key={commit.sha}
              className=" text-muted-foreground dark:bg-black bg-white border rounded-md my-2 p-2 flex justify-between items-center"
              title={message}
            >
              <p>{truncatedMessage}</p>
              <a
                className="dark:text-blue-700 text-blue-500 mr-8"
                href={`https://github.com/${username}/${repository}/commit/${commit.sha}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver
              </a>
            </div>
          );
        })}
      </ScrollArea>
    </section>
  );
}
