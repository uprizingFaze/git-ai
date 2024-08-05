"use client";
// src/app/tasks/page.tsx (o src/pages/tasks.tsx)
import { useEffect, useState } from "react";
import {
  loadData,
  addRepo,
  addToken,
  deleteRepo,
  deleteToken,
} from "./localStorage";
import { Repo, Token, DataStructure } from "./types";

const TasksPage = () => {
  const [data, setData] = useState<DataStructure>({ repos: [], token: [] });
  const [repoUser, setRepoUser] = useState<string>("");
  const [repoName, setRepoName] = useState<string>("");
  const [repoToken, setRepoToken] = useState<string>(""); // Nuevo estado para el token del repo
  const [tokenName, setTokenName] = useState<string>("");
  const [tokenValue, setTokenValue] = useState<string>("");

  useEffect(() => {
    setData(loadData());
  }, []);

  const handleRepoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addRepo({ user: repoUser, repo: repoName, token: repoToken }); // Agregar token al repo
    setData(loadData());
    setRepoUser("");
    setRepoName("");
    setRepoToken(""); // Resetear el campo token
  };

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToken({ name: tokenName, value: tokenValue });
    setData(loadData());
    setTokenName("");
    setTokenValue("");
  };

  const handleDeleteRepo = (repo: Repo) => {
    deleteRepo(repo);
    setData(loadData());
  };

  const handleDeleteToken = (token: Token) => {
    deleteToken(token);
    setData(loadData());
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Gestión de Repos y Tokens</h1>

      <h2 className="text-xl font-semibold mt-6 mb-2">Agregar Repo</h2>
      <form onSubmit={handleRepoSubmit} className="mb-4">
        <input
          type="text"
          value={repoUser}
          onChange={(e) => setRepoUser(e.target.value)}
          placeholder="Usuario"
          className="border border-gray-300 rounded p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          value={repoName}
          onChange={(e) => setRepoName(e.target.value)}
          placeholder="Repositorio"
          className="border border-gray-300 rounded p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          value={repoToken}
          onChange={(e) => setRepoToken(e.target.value)}
          placeholder="Token"
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Agregar Repo
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6 mb-2">Agregar Token</h2>
      <form onSubmit={handleTokenSubmit} className="mb-4">
        <input
          type="text"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          placeholder="Nombre"
          className="border border-gray-300 rounded p-2 w-full mb-2"
          required
        />
        <input
          type="text"
          value={tokenValue}
          onChange={(e) => setTokenValue(e.target.value)}
          placeholder="Valor"
          className="border border-gray-300 rounded p-2 w-full"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded mt-2"
        >
          Agregar Token
        </button>
      </form>

      <h2 className="text-xl font-semibold mt-6">Repos</h2>
      <ul className="border border-gray-300 rounded-lg p-4">
        {data.repos.map((repo, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{`${repo.user} / ${repo.repo} - Token: ${repo.token}`}</span>{" "}
            {/* Mostrar token */}
            <button
              onClick={() => handleDeleteRepo(repo)}
              className="text-red-500"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>

      <h2 className="text-xl font-semibold mt-6">Tokens</h2>
      <ul className="border border-gray-300 rounded-lg p-4">
        {data.token.map((token, index) => (
          <li key={index} className="flex justify-between items-center mb-2">
            <span>{`${token.name}: ${token.value}`}</span>
            <button
              onClick={() => handleDeleteToken(token)}
              className="text-red-500"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TasksPage;
