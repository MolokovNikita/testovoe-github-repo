import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUsername } from "../features/userSlice.ts";
import { resetRepos } from "../features/repoSlice.ts";
import SearchBar from "../components/SearchBar.tsx";
import { incrementPage } from "../features/repoSlice.ts";
import { useAppDispatch } from "../hooks/useAppDispatch.ts";
import { useAppSelector } from "../hooks/useAppSelector.ts";
import RepoList from "../components/RepoList.tsx";
import { fetchRepos } from "../api/githubApi.ts";
import Logo from "../assets/github_logo.png";
const MainPage: React.FC = () => {
  // SearchBar
  const [inputValue, setInputValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    const trimmedValue = inputValue.trim();
    if (!trimmedValue) return;

    const handler = setTimeout(() => {
      dispatch(setUsername(trimmedValue));
      dispatch(resetRepos());
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, dispatch]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
  };

  // RepoList
  const appDispatch = useAppDispatch();
  const { repos, status, error, hasMore } = useAppSelector(
    (state) => state.repos,
  );
  const username = useAppSelector((state) => state.user.username);

  useEffect(() => {
    if (username && repos.length === 0) {
      appDispatch(fetchRepos());
    }
  }, [appDispatch, username]);

  const loadMoreRepos = () => {
    if (hasMore && status !== "loading") {
      appDispatch(incrementPage());
      appDispatch(fetchRepos());
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex-grow container mx-auto p-4">
        <img className="w-30 ml-auto mr-auto" src={Logo} alt="ghlogo" />
        <SearchBar inputValue={inputValue} onInputChange={handleInputChange} />
        <RepoList
          repos={repos}
          status={status}
          error={error}
          hasMore={hasMore}
          loadMoreRepos={loadMoreRepos}
        />
      </div>
    </div>
  );
};
export default MainPage;
