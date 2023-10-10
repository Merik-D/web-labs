import { postSong } from "./api.js";

const createSongButton = document.getElementById("create_song_button");

const titleInput = document.getElementById("song_title");
const durationInput = document.getElementById("song_duration");
const authorInput = document.getElementById("song_author");
const auditionsInput = document.getElementById("song_auditions");

const getInputValues = () => {
  const title = titleInput.value;
  const duration = durationInput.value;
  const author = authorInput.value;
  const auditions = auditionsInput.value;

  if (title.trim() === '' || duration.trim() === '' || author.trim() === '' || auditions.trim() === '') {
    alert('Please fill in all input fields.');
    return null;
  }

  return {
    title,
    duration,
    author,
    auditions,
  };
};


const clearCreateFormInputs = () => {
  titleInput.value = "";
  durationInput.value = "";
  authorInput.value = "";
  auditionsInput.value ="";
};

createSongButton.addEventListener("click", (event) => {
  event.preventDefault();

  const {title, duration, author, auditions} = getInputValues()
  clearCreateFormInputs()

  postSong({title, duration, author, auditions})
  alert("Song added")
});
