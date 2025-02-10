import { Repo } from "../models/Repo.ts";
import { RootState } from "../store/index.ts";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

export const fetchRepos = createAsyncThunk<
  Repo[],
  undefined,
  { state: RootState; rejectValue: string }
>("repos/fetchRepos", async (_, { getState, rejectWithValue }) => {
  const { user, repos } = getState();
  const { username } = user;
  const { page } = repos;

  try {
    const response = await axios.get<Repo[]>(
      `https://api.github.com/users/${username}/repos`,
      {
        params: {
          per_page: 20,
          page,
          sort: "updated",
        },
      },
    );
    return response.data;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      const status = error.response?.status;
      const message =
        status === 404
          ? "Пользователь не найден."
          : status === 403
            ? "Превышен лимит запросов к GitHub API."
            : status
              ? `Ошибка: ${status}`
              : "Ошибка при загрузке данных.";
      return rejectWithValue(message);
    }
    return rejectWithValue("Ошибка при загрузке данных.");
  }
});
