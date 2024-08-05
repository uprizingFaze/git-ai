
export default async function Repo() {
  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
  await delay(1000);

  const githubData = await fetch(
    "https://api.github.com/repos/shuding/next-view-transitions",
    {
      next: { revalidate: 10 },
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
    }
  );

  const repoInfo = await githubData.json();

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{repoInfo.name}</h1>
      <p className="mb-2"><strong>Descripción:</strong> {repoInfo.description}</p>
      <p className="mb-2"><strong>Lenguaje principal:</strong> {repoInfo.language}</p>
      <p className="mb-2"><strong>Estrellas:</strong> {repoInfo.stargazers_count}</p>
      <p className="mb-2"><strong>Forks:</strong> {repoInfo.forks_count}</p>
      <p className="mb-2"><strong>Issues abiertas:</strong> {repoInfo.open_issues_count}</p>
      <p className="mb-2"><strong>Última actualización:</strong> {new Date(repoInfo.updated_at).toLocaleDateString()}</p>
      <a href={repoInfo.html_url} className="text-blue-500" target="_blank" rel="noopener noreferrer">Ver en GitHub</a>
    </div>
  );
}