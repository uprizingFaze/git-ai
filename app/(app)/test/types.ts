export interface Repo {
    user: string;
    repo: string;
    token: string; // Añadido el campo token
}

export interface Token {
    name: string;
    value: string;
}

export interface DataStructure {
    repos: Repo[];
    token: Token[];
}