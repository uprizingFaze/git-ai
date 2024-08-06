import { fetchPr } from "@/app/api/github-api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function RepoPull({
  username = "vercel",
  repository = "ai-chatbot",
}: {
  username?: string;
  repository?: string;
}) {
  const repoPull = await fetchPr(username, repository);

  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-bold">Pr open</h2>
      <ScrollArea className="h-72 max-w-2xl my-4 mx-3 pr-4">
        {repoPull.map((pull: any) => (
          <div
            key={pull.id}
            className="mb-4 dark:bg-black bg-white border rounded-lg p-3"
          >
            <div className="mt-4 flex items-center mb-6">
              <Avatar className="h-16 w-16 mr-4">
                <AvatarImage src={pull.user.avatar_url} alt={pull.user.login} />
                <AvatarFallback>GA</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-bold">{pull.user.login}</h3>
                <p className="text-muted-foreground">{pull.title}</p>
              </div>
            </div>
            <div className="bg-background border rounded-md p-2 inline-flex m-1">
              Estado: <p className="text-muted-foreground">{pull.state}</p>
            </div>
            <div className="bg-background border rounded-md p-2 inline-flex m-1">
              Autor:
              <p className="text-muted-foreground">{pull.user.login}</p>
            </div>
            <div className="bg-background border rounded-md p-2 inline-flex m-1">
              Fecha de creación:{" "}
              <p className="text-muted-foreground">
                {new Date(pull.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="bg-background border rounded-md p-2 inline-flex m-1">
              Última actualización:{" "}
              <p className="text-muted-foreground">
                {new Date(pull.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default RepoPull;
