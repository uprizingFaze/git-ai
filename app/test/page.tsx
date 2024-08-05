"use client"
import React, { useState, useEffect } from 'react';
import { getDataLocal, addDataLocal, updateDataLocal, deleteDataLocal } from '@/app/api/local';

interface Repo {
  user: string;
  repo: string;
}

interface Token {
  name: string;
  value: string;
}

interface DataLocal {
  repos: Repo[];
  token: Token[];
}

const DataLocalComponent: React.FC = () => {
  const [dataLocal, setDataLocal] = useState<DataLocal[]>([]);
  const [newRepo, setNewRepo] = useState<Repo>({ user: '', repo: '' });
  const [newToken, setNewToken] = useState<Token>({ name: '', value: '' });

  useEffect(() => {
    const data = getDataLocal();
    setDataLocal(data);
  }, []);

  const handleAddData = () => {
    const newData: DataLocal = {
      repos: [newRepo],
      token: [newToken],
    };
    addDataLocal(newData);
    setDataLocal(getDataLocal());
  };

  const handleUpdateData = (index: number) => {
    const updatedData: DataLocal = {
      repos: [newRepo],
      token: [newToken],
    };
    updateDataLocal(index, updatedData);
    setDataLocal(getDataLocal());
  };

  const handleDeleteData = (index: number) => {
    deleteDataLocal(index);
    setDataLocal(getDataLocal());
  };

  return (
    <div className="bg-black m-6 p-4 border rounded-lg">
      <h1 className='text-xl'>Datos Locales</h1>
      {dataLocal.length === 0 ? (
        <p>No hay datos disponibles.</p>
      ) : (
        dataLocal.map((data, index) => (
          <div key={index}>
            <h2>Repositorios</h2>
            <ul>
              {data.repos.map((repo, repoIndex) => (
                <li key={repoIndex}>
                  Usuario: {repo.user}, Repositorio: {repo.repo}
                </li>
              ))}
            </ul>
            <h2>Tokens</h2>
            <ul>
              {data.token.map((token, tokenIndex) => (
                <li key={tokenIndex}>
                  Nombre: {token.name}, Valor: {token.value}
                </li>
              ))}
            </ul>
            <button onClick={() => handleUpdateData(index)}>Actualizar</button>
            <button onClick={() => handleDeleteData(index)}>Eliminar</button>
          </div>
        ))
      )}
      <div>
        <h2>Añadir Nuevo</h2>
        <input
          type="text"
          placeholder="Usuario"
          value={newRepo.user}
          onChange={(e) => setNewRepo({ ...newRepo, user: e.target.value })}
        />
        <input
          type="text"
          placeholder="Repositorio"
          value={newRepo.repo}
          onChange={(e) => setNewRepo({ ...newRepo, repo: e.target.value })}
        />
        <input
          type="text"
          placeholder="Nombre del Token"
          value={newToken.name}
          onChange={(e) => setNewToken({ ...newToken, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Valor del Token"
          value={newToken.value}
          onChange={(e) => setNewToken({ ...newToken, value: e.target.value })}
        />
        <button onClick={handleAddData}>Añadir</button>
      </div>
    </div>
  );
};

export default DataLocalComponent;