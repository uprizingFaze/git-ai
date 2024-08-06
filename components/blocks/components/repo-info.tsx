async function RepoInfo({
  username = "vercel",
  repository = "ai-chatbot",
}: {
  username?: string;
  repository?: string;
}) {
  const repoInfo = await fetchRepoInfo(username, repository);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{repoInfo.name}</h1>
      <p className="mb-2">{repoInfo.description}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="dark:bg-black bg-white rounded-md border py-5 pl-4">
          Lenguaje:{" "}
          <div className="text-xl font-bold text-muted-foreground">
            {repoInfo.language}
          </div>
        </div>
        <div className="dark:bg-black bg-white rounded-md border py-5 pl-4">
          Estrellas{" "}
          <div className="text-3xl font-bold text-muted-foreground">
            {repoInfo.stargazers_count}
          </div>
        </div>
        <div className="dark:bg-black bg-white rounded-md border py-5 pl-4">
          Forks{" "}
          <div className="text-3xl font-bold text-muted-foreground">
            {repoInfo.forks_count}
          </div>
        </div>
        <div className="dark:bg-black bg-white rounded-md border py-5 pl-4">
          Issues abiertas <div className="text-3xl font-bold text-muted-foreground">{repoInfo.open_issues_count}</div>
        </div>
        <div className="dark:bg-black bg-white rounded-md border py-5 pl-4">
          Última actualización
          <div className="text-xl font-bold text-muted-foreground">

          {new Date(repoInfo.updated_at).toLocaleDateString()}
          </div>
        </div>
      </div>
      <a
        href={repoInfo.html_url}
        className="text-blue-500 mt-4 block"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver en GitHub
      </a>
    </div>
  );
}

import { fetchRepoInfo } from "@/app/api/github-api";
export default RepoInfo;
