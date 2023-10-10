import { songs, refetchAllSongs, } from "./index.js";
import { deleteSong } from "./api.js";
export const searchInput = document.getElementById("search_input");
export const songsContainer = document.querySelector(".songs");

export const clearSearchInput = () => {
  searchInput.value = "";
  renderItemsList(songs);
};

export const addItemToPage = ({ id, title, duration, author, auditions }) => {
  const itemTemplate = `
        <div class="song_item" id="item-${id}">
          <h3>Title: ${title}</h3>
          <h4>Author: ${author}</h4>
          <p>Duration: ${duration}</p>
          <p>Auditions: ${auditions}</p>
          <div>
            <button id="edit_button ${id}">Edit</button>
            <button id="remove_button ${id}">Remove</button>
          </div>
        </div>
      `;
  songsContainer.insertAdjacentHTML("beforeend", itemTemplate);

  const removeButton = document.getElementById(`remove_button ${id}`);
  removeButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const id = removeButton.getAttribute("id").split(" ")[1];
    console.log("id:", id);
    if (confirm(`Do you want to delete ${title}?`)) {
      await deleteSong(id);
      refetchAllSongs();
    }
  });

  const editButton = document.getElementById(`edit_button ${id}`);
  console.log(editButton)
  editButton.addEventListener("click", (event) => {
    event.preventDefault();
    id = editButton.getAttribute("id").split(" ")[1];
    console.log(id)
    localStorage.setItem("song_to_edit", JSON.stringify({ id, title, duration, author, auditions }))
    window.location.href = "./edit_song.html"
  });
};

export const renderItemsList = (items) => {
  songsContainer.innerHTML = "";

  if (items.length === 0) {
    songsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    for (const item of items) {
      addItemToPage(item);
    }
  }
};
