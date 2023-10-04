const searchInput = document.getElementById("search_input");
const searchButton = document.getElementById("search_button");
const cancelSearchButton = document.getElementById("clear_button");
const countButton = document.getElementById("count_button");
const songsContainer = document.querySelector(".songs");
const sortSelect = document.querySelector(".select");

const songs = [
  {
    id: 1,
    title: "My Name Is",
    duration: "4:28",
    author: "Eminem",
    auditions: 10000000,
  },
  {
    id: 2,
    title: "Шибеник",
    duration: "3:06",
    author: "Харцизи",
    auditions: 940410,
  },
  {
    id: 3,
    title: "Armee der Tristen",
    duration: "3:26",
    author: "Rammstein",
    auditions: 1,
  },
  {
    id: 4,
    title: "Axel F",
    duration: "2:48",
    author: "Crazy Frog",
    auditions: 10000000000,
  },
  {
    id: 5,
    title: "Surrender",
    duration: "4:07",
    author: "Billy Talent",
    auditions: 99999900,
  },
  {
    id: 6,
    title: "More the Victim",
    duration: "2:41",
    author: "Linkin Park",
    auditions: 999999,
  },
  {
    id: 7,
    title: "1Armee der Tristen",
    duration: "3:26",
    author: "Rammstein",
    auditions: 2,
  },
  {
    id: 8,
    title: "2Armee der Tristen",
    duration: "3:26",
    author: "Rammstein",
    auditions: 3,
  },
  {
    id: 9,
    title: "3Armee der Tristen",
    duration: "3:26",
    author: "Rammstein",
    auditions: 4,
  },
];

const addItemToPage = ({ id, title, duration, author, auditions }) => {
  const itemTemplate = `
      <div class="song_item" id="item-${id}">
        <h3>Title: ${title}</h3>
        <h4>Author: ${author}</h4>
        <p>Duration: ${duration}</p>
        <p>Auditions: ${auditions}</p>
        <div>
          <button>Edit</button>
          <button>Remove</button>
        </div>
      </div>
    `;
  songsContainer.insertAdjacentHTML("beforeend", itemTemplate);
};

export const renderItemsList = (items, onEditItem, onRemoveItem) => {
  songsContainer.innerHTML = "";

  if (items.length === 0) {
    songsContainer.innerHTML = "<p>No results found.</p>";
  } else {
    for (const item of items) {
      addItemToPage(item, onEditItem, onRemoveItem);
    }
  }
};

export const clearInputs = () => {
  searchInput.value = "";
  renderItemsList(songs);
};

export const countTotalAuditionsAndAlert = () => {
  const searchText = searchInput.value.toLowerCase().trim();
  const totalAuditions = songs.filter((song) => {
    return (
      song.title.toLowerCase().includes(searchText) ||
      song.author.toLowerCase().includes(searchText)
    );
  }).reduce(
    (total, song) => total + song.auditions,
    0
  );
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

  renderItemsList(filteredSongs)
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
}

searchButton.addEventListener("click", search);

cancelSearchButton.addEventListener("click", clearInputs);

countButton.addEventListener("click", countTotalAuditionsAndAlert);

sortSelect.addEventListener("change", sort);

renderItemsList(songs);
