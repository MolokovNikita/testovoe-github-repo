import React from "react";
import RepoCard from "../components/RepoCard.tsx";
import { RepoListProps } from "../models/Repo.ts";
import { useInfiniteScroll } from "../hooks/useInfiniteScroll.ts";
import { Loader } from "./Loader.tsx";
import { ErrorMessage } from "./ErrorMessage.tsx";

const RepoList: React.FC<RepoListProps> = ({
  repos,
  status,
  error,
  hasMore,
  loadMoreRepos,
}) => {
  const [setLastElement] = useInfiniteScroll(
    () => {
      if (hasMore && status !== "loading") {
        loadMoreRepos();
      }
    },
    { threshold: 1.0 },
  );

  return (
    <div className="flex flex-col items-center w-full max-w-2xl mx-auto px-4">
      {status === "idle" && (
        <p className="text-gray-500">🔍 Введите имя пользователя GitHub</p>
      )}

      {status === "loading" && repos.length === 0 && <Loader />}

      {status === "failed" && <ErrorMessage message={error} />}

      {status === "succeeded" && repos.length === 0 && (
        <p className="text-gray-500">Репозитории не найдены.</p>
      )}

      {repos.map((repo, index) => (
        <div
          key={repo.id}
          ref={repos.length === index + 1 ? setLastElement : undefined}
          className="w-full"
        >
          <RepoCard repo={repo} />
        </div>
      ))}

      {status === "loading" && repos.length > 0 && <Loader />}
      {!hasMore && repos.length > 0 && (
        <p className="text-gray-500 mt-4">✅ Все репозитории загружены</p>
      )}
    </div>
  );
};

export default RepoList;
