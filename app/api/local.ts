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
        console.error('Error parsing stored data:', error);
      }
    }
  }
  return [];
}

export function addDataLocal(newData: DataLocal): void {
  const currentData = getDataLocal();
  currentData.push(newData);
  localStorage.setItem('datalocal', JSON.stringify(currentData));
}

export function updateDataLocal(index: number, updatedData: DataLocal): void {
  const currentData = getDataLocal();
  if (index >= 0 && index < currentData.length) {
    currentData[index] = updatedData;
    localStorage.setItem('datalocal', JSON.stringify(currentData));
  }
}

export function deleteDataLocal(index: number): void {
  const currentData = getDataLocal();
  if (index >= 0 && index < currentData.length) {
    currentData.splice(index, 1);
    localStorage.setItem('datalocal', JSON.stringify(currentData));
  }
}