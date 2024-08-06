import { fetchPrClose } from "@/app/api/github-api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

async function RepoPullClosed({
  username = "vercel",
  repository = "ai-chatbot",
}: {
  username?: string;
  repository?: string;
}) {
  const repoPull = await fetchPrClose(username, repository);

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-bold">Pr closed</h2>
      <ScrollArea className="h-72 max-w-2xl my-4 mx-3 pr-4">
        {repoPull.map((pull: any) => (
          <div
            key={pull.id}
            className="mb-4 dark:bg-black bg-white border rounded-lg p-2"
          >
            <div className="flex max-w-48 items-center bg-background border rounded-md p-1">
              <Avatar className="mr-4 h-7 w-7">
                <AvatarImage src={pull.user.avatar_url} alt={pull.user.login} />
                <AvatarFallback>GA</AvatarFallback>
              </Avatar>
              <h3 className="mr-4">{pull.user.login}</h3>
            </div>
            <div className="ml-2">
              <div className="my-3">
                Mensaje
                <h1 className="text-muted-foreground">{pull.title}</h1>
              </div>
              <div>
                Estado: <Badge variant="secondary">{pull.state}</Badge>{" "}
              </div>
              <div>
                Fecha de creación:{" "}
                <span className="text-muted-foreground">
                  {new Date(pull.created_at).toLocaleDateString()}
                </span>
              </div>
              <div>
                Última actualización:{" "}
                <span className="text-muted-foreground">
                  {new Date(pull.updated_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default RepoPullClosed;
