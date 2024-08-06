import { fetchContributors } from "@/app/api/github-api";

async function RepoContributors({
  username = "shuding",
  repository = "next-view-transitions",
}: {
  username?: string;
  repository?: string;
}) {
  const repoContributors = await fetchContributors(username, repository);

  return (
    <div className="p-4">
      <h2 className="mb-2">Contribuidores</h2>
      {repoContributors.map((contributor: any) => (
        <div key={contributor.id} className="mb-4">
          <h3>{contributor.login}</h3>
          <p>Contribuciones: {contributor.contributions}</p>
        </div>
      ))}
    </div>
  );
}

export default RepoContributors;