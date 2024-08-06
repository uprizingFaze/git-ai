import { ScrollArea } from "@/components/ui/scroll-area";

export default async function Test() {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(1000);

  const githubData = await fetch(
    "https://api.github.com/repos/uprizingFaze/git-ai/commits",
    {
      next: { revalidate: 10 },
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const githubCommits = await githubData.json();

  return (
    <ScrollArea className="h-72 max-w-2xl ">
      <div className="p-4">
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
  );
}