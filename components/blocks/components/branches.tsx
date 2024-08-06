import { fetchBranches } from "@/app/api/github-api";
import { ScrollArea } from "@/components/ui/scroll-area";

async function RepoBranch({
  username = "uprizingFaze",
  repository = "git-ai",
}: {
  username?: string;
  repository?: string;
}) {
  const repoBranch = await fetchBranches(username, repository);

  return (
    <div className="p-4">
      <div className="mb-2">
        <h2 className="text-2xl font-bold">Ramas</h2>
        <ScrollArea className="max-h-40">
          {repoBranch.map((branch: any) => (
            <div
              key={branch.name} 
              className="text-muted-foreground dark:bg-black my-2 border rounded-lg p-2 flex justify-between items-center"
            >
              <p>{branch.name}</p>
              <a
                className="dark:text-blue-700 text-blue-500 mr-8"
                href={`https://github.com/${username}/${repository}/tree/${branch.name}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Ver
              </a>
            </div>
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}

export default RepoBranch;