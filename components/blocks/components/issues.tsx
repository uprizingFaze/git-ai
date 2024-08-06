import { fetchIssues } from "@/app/api/github-api";

async function RepoIssues({
  username = "shuding",
  repository = "next-view-transitions",
}: {
  username?: string;
  repository?: string;
}) {
  const repoIssues = await fetchIssues(username, repository);

  return (
    <div className="p-4">
      <h2 className="mb-2">Issues</h2>
      {repoIssues.map((issue: any) => (
        <div key={issue.id} className="mb-4">
          <h3>{issue.title}</h3>
          <p>Estado: {issue.state}</p>
          <p>Autor: {issue.user.login}</p>
          <p>
            Fecha de creación: {new Date(issue.created_at).toLocaleDateString()}
          </p>
          <p>
            Última actualización:{" "}
            {new Date(issue.updated_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default RepoIssues;