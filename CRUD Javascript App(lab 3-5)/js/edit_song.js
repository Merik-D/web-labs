import { updateSong } from "./api.js";

const editSongButton = document.getElementById("edit_song_button");

const editTitleInput = document.getElementById("edit_song_title");
const editDurationInput = document.getElementById("edit_song_duration");
const editAuthorInput = document.getElementById("edit_song_author");
const editAuditionsInput = document.getElementById("edit_song_auditions");

const song_to_edit = JSON.parse(localStorage.getItem("song_to_edit"));

const getEditInputValues = () => {
  return {
    id: song_to_edit.id,
    title: editTitleInput.value,
    duration: editDurationInput.value,
    author: editAuthorInput.value,
    auditions: editAuditionsInput.value,
  };
};

export const fillEditSongForm = ({id, title, duration, author, auditions }) => {
  editTitleInput.value = title;
  editDurationInput.value = duration;
  editAuthorInput.value = author;
  editAuditionsInput.value = auditions;
};

const clearCreateFormInputs = () => {
  editTitleInput.value = "";
  editDurationInput.value = "";
  editAuthorInput.value = "";
  editAuditionsInput.value = "";
};

editSongButton.addEventListener("click", (event) => {
  event.preventDefault();

  const song = getEditInputValues();
  clearCreateFormInputs();
  console.log(song)
  updateSong(song_to_edit.id, song);
  alert("Song edit");
});

fillEditSongForm(song_to_edit);
console.log(song_to_edit)
