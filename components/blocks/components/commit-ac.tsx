
import { fetchRepoCommit } from "@/app/api/github-api";

async function CommitActivity({
  username = "uprizingFaze",
  repository = "git-ai",
}: {
  username?: string;
  repository?: string;
}) {
  const commits = await fetchRepoCommit(username, repository);

  const dateCounts: { [key: string]: number } = {};

  commits.forEach((commit: any) => {
    const date = commit.commit.committer.date.split("T")[0];
    dateCounts[date] = (dateCounts[date] || 0) + 1; 
  });

  const commitData = Object.entries(dateCounts).map(([date, count]) => ({
    date,
    count,
  }));

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Actividad de Commits</h2>
      <table className="min-w-full  border ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Fecha</th>
            <th className="py-2 px-4 border-b">Cantidad de Commits</th>
          </tr>
        </thead>
        <tbody>
          {commitData.map((commit) => (
            <tr key={commit.date}>
              <td className="py-2 px-4 border-b">{commit.date}</td>
              <td className="py-2 px-4 border-b">{commit.count}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommitActivity;
