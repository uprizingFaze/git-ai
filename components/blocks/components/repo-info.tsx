import React from 'react';
import { fetchRepoInfo } from '@/app/api/github-api';

async function RepoInfo({
  username = "shadcn-ui",
  repository = "ui",
}: {
  username?: string;
  repository?: string;
}) {

  const repoInfo = await fetchRepoInfo(username, repository);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{repoInfo.name}</h1>
      <p className="mb-2">
        <strong>Descripción:</strong> {repoInfo.description}
      </p>
      <p className="mb-2">
        <strong>Lenguaje principal:</strong> {repoInfo.language}
      </p>
      <p className="mb-2">
        <strong>Estrellas:</strong> {repoInfo.stargazers_count}
      </p>
      <p className="mb-2">
        <strong>Forks:</strong> {repoInfo.forks_count}
      </p>
      <p className="mb-2">
        <strong>Issues abiertas:</strong> {repoInfo.open_issues_count}
      </p>
      <p className="mb-2">
        <strong>Última actualización:</strong>{" "}
        {new Date(repoInfo.updated_at).toLocaleDateString()}
      </p>
      <a
        href={repoInfo.html_url}
        className="text-blue-500"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver en GitHub
      </a>
    </div>
  );
}

export default RepoInfo;