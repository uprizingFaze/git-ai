// src/localStorage.ts
import { DataStructure, Repo, Token } from './types';

const DATA_KEY = 'data';

export const loadData = (): DataStructure => {
    const data = localStorage.getItem(DATA_KEY);
    return data ? JSON.parse(data) : { repos: [], token: [] };
};

export const saveData = (data: DataStructure) => {
    localStorage.setItem(DATA_KEY, JSON.stringify(data));
};

export const addRepo = (repo: Repo) => {
    const data = loadData();
    data.repos.push(repo);
    saveData(data);
};

export const addToken = (token: Token) => {
    const data = loadData();
    data.token.push(token);
    saveData(data);
};

export const deleteRepo = (repo: Repo) => {
    const data = loadData();
    data.repos = data.repos.filter(r => r.repo !== repo.repo);
    saveData(data);
};

export const deleteToken = (token: Token) => {
    const data = loadData();
    data.token = data.token.filter(t => t.name !== token.name);
    saveData(data);
};