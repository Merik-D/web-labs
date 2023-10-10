import { getAllSongs } from "./api.js";
import { searchInput, renderItemsList, clearSearchInput } from "./dom_utils.js";

const searchButton = document.getElementById("search_button");
const cancelSearchButton = document.getElementById("clear_button");
const countButton = document.getElementById("count_button");

const sortSelect = document.querySelector(".select");

export let songs = []

export const countTotalAuditionsAndAlert = () => {
  const searchText = searchInput.value.toLowerCase().trim();
  const totalAuditions = songs.filter((song) => {
    return (
      song.title.toLowerCase().includes(searchText) ||
      song.author.toLowerCase().includes(searchText)
    );
  }).reduce((count, song) => count += Number(song.auditions), 0);
  alert(`Total number of listens for all songs: ${totalAuditions}`);
};

export const search = () => {
  const searchText = searchInput.value.toLowerCase().trim();
  const filteredSongs = songs.filter((song) => {
    return (
      song.title.toLowerCase().includes(searchText) ||
      song.author.toLowerCase().includes(searchText)
    );
  });

  renderItemsList(filteredSongs);
  return filteredSongs;
};

export const sort = () => {
  const selectedOption = sortSelect.value;
  const filteredSongs = search();

  if (selectedOption === "Name") {
    filteredSongs.sort((a, b) => a.title.localeCompare(b.title));
  } else if (selectedOption === "Auditions") {
    filteredSongs.sort((a, b) => b.auditions - a.auditions);
  }
  renderItemsList(filteredSongs);
};

export const refetchAllSongs = async () => {
  const allSongs = await getAllSongs();

  songs = allSongs;
  console.log(songs.length)
  renderItemsList(songs)
}

searchButton.addEventListener("click", search);

cancelSearchButton.addEventListener("click", clearSearchInput);

countButton.addEventListener("click", countTotalAuditionsAndAlert);

sortSelect.addEventListener("change", sort);

refetchAllSongs()
