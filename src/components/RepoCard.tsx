import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { RepoCardProps } from "../models/Repo.ts";

const RepoCard: React.FC<RepoCardProps> = ({ repo }) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-4 bg-white shadow-md rounded-xl border border-gray-200 hover:shadow-lg transition-all flex flex-col gap-2 md:gap-4 mb-5">
      <h2 className="text-lg md:text-xl font-semibold text-gray-900 truncate">
        {repo.name}
      </h2>
      {repo.description && (
        <p className="text-sm md:text-base text-gray-600 truncate">
          {repo.description}
        </p>
      )}
      <div className="flex items-center justify-between text-sm md:text-base">
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline flex items-center gap-1"
        >
          🔗 Перейти
        </a>
        <span className="text-gray-700">
          <StarIcon
            className={
              repo.stargazers_count > 0 ? "text-yellow-500" : "text-gray-500"
            }
          />
          {repo.stargazers_count}
        </span>
      </div>
      <p className="text-xs md:text-sm text-gray-500">
        📆 Обновлено: {new Date(repo.updated_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default RepoCard;
