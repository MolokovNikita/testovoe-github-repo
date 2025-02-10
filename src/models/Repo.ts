export type Repo = {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  updated_at: string;
};
export type ReposState = {
  repos: Repo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  page: number;
  hasMore: boolean;
};
export type RepoCardProps = {
  repo: Repo;
};

export type RepoListProps = {
  repos: Repo[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  hasMore: boolean;
  loadMoreRepos: () => void;
};
