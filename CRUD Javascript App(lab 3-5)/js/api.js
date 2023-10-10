const BASE_URL = "http://localhost:8080";
const RESOURSE_URL = `${BASE_URL}/songs`;

const baseRequest = async ({ urlPath = "", method = "GET", body = null }) => {
  try {
    const reqParams = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
    };

    if (body) {
      reqParams.body = JSON.stringify(body);
    }

    return await fetch(`${RESOURSE_URL}${urlPath}`, reqParams);
  } catch (error) {
    console.error("HTTP ERROR: ", error);
  }
};

// public functionality

export const getAllSongs = async () => {
  const rawResponse = await baseRequest({ method: "GET" });
  if (rawResponse.status === 200) {
    const songs = await rawResponse.json();
    return songs;
  } else{
    return [];
  }
};

export const postSong = (body) => baseRequest({ method: "POST", body });

export const updateSong = (id, body) =>
  baseRequest({ urlPath: `/${id}`, method: "PUT", body });

export const deleteSong = (id) =>
  baseRequest({ urlPath: `/${id}`, method: "DELETE" });
