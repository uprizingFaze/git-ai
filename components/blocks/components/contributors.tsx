import { fetchContributors } from "@/app/api/github-api";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";

async function RepoContributors({
  username = "uprizingFaze",
  repository = "git-ai",
}: {
  username?: string;
  repository?: string;
}) {
  const repoContributors = await fetchContributors(username, repository);

  return (
    <div className="">
      <h2 className="mb-2 text-2xl font-semibold">Contribuidores</h2>
      <ScrollArea className="h-72 max-w-2xl my-4 mx-3 pr-4">
        {repoContributors.map((contributor: any) => (
          <div
            key={contributor.id}
            className="mb-4 flex items-center dark:bg-black bg-white p-2 border rounded-md"
          >
            <div className="flex items-center bg-background border rounded-md p-1">
              <Avatar className="mr-4 h-7 w-7">
                <AvatarImage
                  src={contributor.avatar_url}
                  alt={contributor.login}
                />
                <AvatarFallback>GA</AvatarFallback>
              </Avatar>
              <h3 className="mr-4">{contributor.login}</h3>
            </div>
            <p className="ml-auto text-right mr-4">
              Contribuciones: {contributor.contributions}
            </p>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default RepoContributors;
