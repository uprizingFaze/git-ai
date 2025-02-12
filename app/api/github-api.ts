const API_BASE_URL = "https://api.github.com";

export const fetchRepoInfo = async (username: string, repository: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/repos/${username}/${repository}`,
      {
        next: { revalidate: 10 },
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fetchRepoCommit = async (username: string, repository: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/repos/${username}/${repository}/commits`,
      {
        next: { revalidate: 10 },
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fetchBranches = async (username: string, repository: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/repos/${username}/${repository}/branches`,
      {
        next: { revalidate: 10 },
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fetchPr = async (username: string, repository: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/repos/${username}/${repository}/pulls`,
      {
        next: { revalidate: 10 },
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fetchPrClose = async (username: string, repository: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/repos/${username}/${repository}/pulls?state=closed`,
      {
        next: { revalidate: 10 },
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const fetchIssues = async (username: string, repository: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/repos/${username}/${repository}/issues`,
      {
        next: { revalidate: 10 },
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
export const fetchContributors = async (username: string, repository: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/repos/${username}/${repository}/contributors`,
      {
        next: { revalidate: 10 },
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
export const fetchUser = async (username: string) => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${username}`,
      {
        next: { revalidate: 10 },
        headers: {
          Accept: "application/vnd.github+json",
          Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
          "X-GitHub-Api-Version": "2022-11-28",
        },
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};