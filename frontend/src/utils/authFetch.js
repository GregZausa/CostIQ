import {apiUrl} from "../config/apiUrl"

const refreshAccessToken = async () => {
  const res = await fetch(`${apiUrl}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });
  if (!res.ok) throw new Error("Refresh failed");
  const result = await res.json();
  localStorage.setItem("token", result.token);
  return result.token;
};

export const authFetch = async (url, options = {}) => {
  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  const makeRequest = (accessToken) =>
    fetch(url, {
      ...options,
      credentials: "include",
      headers: {
        ...(!isFormData && { "Content-Type": "application/json" }),
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    });

  let res = await makeRequest(token);

  if (res.status === 401) {
    try {
      const newToken = await refreshAccessToken();
      res = await makeRequest(newToken);
    } catch {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }

  return res;
};
