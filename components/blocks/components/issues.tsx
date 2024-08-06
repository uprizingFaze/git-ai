import { fetchIssues } from "@/app/api/github-api";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

async function RepoIssues({
  username = "shuding",
  repository = "next-view-transitions",
}: {
  username?: string;
  repository?: string;
}) {
  const repoIssues = await fetchIssues(username, repository);

  return (
    <div className="">
      <h2 className="mb-2 text-2xl font-bold">Issues</h2>
      <ScrollArea className="h-72 max-w-2xl my-4 mx-3 pr-4">
        {repoIssues.map((issue: any) => (
          <div key={issue.id} className="mb-4 bg-black border rounded-md p-4">
            <div className=" flex items-center ">
              <div className="inline-flex items-center bg-background border rounded-md p-1 mb-2">
                <Avatar className="mr-4 h-7 w-7">
                  <AvatarImage src={issue.user.avatar_url} />
                  <AvatarFallback>GA</AvatarFallback>
                </Avatar>
                <h3>{issue.user.login}</h3>
              </div>
              <h2 className="ml-auto text-right mr-4">Issue: {issue.number}</h2>
            </div>
            <div className="font-bold my-4">
              Mensaje:
              <p className="font-light text-muted-foreground ml-2">{issue.title}</p>
            </div>
            <div className="mt-2 mb-6">
              Estado:
              <Badge>{issue.state}</Badge>{" "}
            </div>
            <div className="mt-2">
              Fecha de creación
              <p className="font-light text-muted-foreground ml-2">
                {new Date(issue.created_at).toLocaleDateString()}
              </p>
            </div>
            <div className="mt-2">
              Última actualización
              <p className="font-light text-muted-foreground ml-2">{new Date(issue.updated_at).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </ScrollArea>
    </div>
  );
}

export default RepoIssues;
