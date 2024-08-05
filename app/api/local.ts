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

export function getDataLocal(): DataLocal[] {
  if (typeof window !== 'undefined') {
    const storedData = localStorage.getItem('datalocal');
    
    if (storedData) {
      try {
        const jsonData = JSON.parse(storedData);
        if (Array.isArray(jsonData) && jsonData.every(item => 'repos' in item && 'token' in item)) {
          return jsonData;
        }
      } catch (error) {
        console.error('Error parsing local storage data:', error);
      }
    }
  }
  return [];
}

export function addDataLocal(newData: DataLocal): void {
  const data = getDataLocal();
  data.push(newData);
  localStorage.setItem('datalocal', JSON.stringify(data));
}

export function updateDataLocal(index: number, updatedData: DataLocal): void {
  const data = getDataLocal();
  if (index >= 0 && index < data.length) {
    data[index] = updatedData;
    localStorage.setItem('datalocal', JSON.stringify(data));
  }
}

export function deleteDataLocal(index: number): void {
  const data = getDataLocal();
  if (index >= 0 && index < data.length) {
    data.splice(index, 1);
    localStorage.setItem('datalocal', JSON.stringify(data));
  }
}

export function addRepo(index: number, newRepo: Repo): void {
  const data = getDataLocal();
  if (index >= 0 && index < data.length) {
    data[index].repos.push(newRepo);
    localStorage.setItem('datalocal', JSON.stringify(data));
  }
}

export function deleteRepo(index: number, repoIndex: number): void {
  const data = getDataLocal();
  if (index >= 0 && index < data.length && repoIndex >= 0 && repoIndex < data[index].repos.length) {
    data[index].repos.splice(repoIndex, 1);
    localStorage.setItem('datalocal', JSON.stringify(data));
  }
}

export function addToken(index: number, newToken: Token): void {
  const data = getDataLocal();
  if (index >= 0 && index < data.length) {
    data[index].token.push(newToken);
    localStorage.setItem('datalocal', JSON.stringify(data));
  }
}

export function deleteToken(index: number, tokenIndex: number): void {
  const data = getDataLocal();
  if (index >= 0 && index < data.length && tokenIndex >= 0 && tokenIndex < data[index].token.length) {
    data[index].token.splice(tokenIndex, 1);
    localStorage.setItem('datalocal', JSON.stringify(data));
  }
}

export function updateRepo(index: number, repoIndex: number, updatedRepo: Repo): void {
  const data = getDataLocal();
  if (index >= 0 && index < data.length && repoIndex >= 0 && repoIndex < data[index].repos.length) {
    data[index].repos[repoIndex] = updatedRepo;
    localStorage.setItem('datalocal', JSON.stringify(data));
  }
}

export function updateToken(index: number, tokenIndex: number, updatedToken: Token): void {
  const data = getDataLocal();
  if (index >= 0 && index < data.length && tokenIndex >= 0 && tokenIndex < data[index].token.length) {
    data[index].token[tokenIndex] = updatedToken;
    localStorage.setItem('datalocal', JSON.stringify(data));
  }
}