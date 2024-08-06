import { fetchBranches } from "@/app/api/github-api";

async function RepoBranch({
  username = "shuding",
  repository = "next-view-transitions",
}: {
  username?: string;
  repository?: string;
}) {
  const repoBranch = await fetchBranches(username, repository);

  return (
    <div className="p-4">
      <div className="mb-2">
        <h2>Ramas</h2>
        {repoBranch.map((branch: any) => (
          <p>{branch.name}</p>
        ))}
      </div>
    </div>
  );
}

export default RepoBranch;
