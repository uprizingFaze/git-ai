import { fetchPr } from "@/app/api/github-api";

async function RepoPull({
  username = "uprizingFaze",
  repository = "git-ai",
}: {
  username?: string;
  repository?: string;
}) {
  const repoPull = await fetchPr(username, repository);

  return (
    <div className="p-4">
      <h2 className="mb-2">Pr open</h2>
      {repoPull.map((pull: any) => (
        <div key={pull.id} className="mb-4">
          <h3>{pull.title}</h3>
          <p>Estado: {pull.state}</p>
          <p>Autor: {pull.user.login}</p>
          <p>
            Fecha de creación: {new Date(pull.created_at).toLocaleDateString()}
          </p>
          <p>
            Última actualización:{" "}
            {new Date(pull.updated_at).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
}

export default RepoPull;
