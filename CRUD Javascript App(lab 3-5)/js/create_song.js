const createSongButton = document.getElementById("create_song_button");

const titleInput = document.getElementById("song_title");
const durationInput = document.getElementById("song_duration");
const authorInput = document.getElementById("song_author");
const auditionsInput = document.getElementById("song_auditions");

const getInputValues = () => {
  return {
    title: titleInput.value,
    duration: durationInput.value,
    author: authorInput.value,
    auditions: auditionsInput.value,
  };
};

const clearCreateFormInputs = () => {
  titleInput.value = "";
  durationInput.value = "";
  authorInput.value = "";
  auditionsInput.value ="";
};

const addSong = ({title, duration, author, auditions}) => {
  const songs = localStorage.getItem("songs") ? JSON.parse(localStorage.getItem("songs")) : [];

  const generatedId = uuid.v1();

  const newSong = {
    id: generatedId,
    title: title,
    duration: duration,
    author: author,
    auditions: auditions,
  };
  
  console.log(songs)
  songs.push(newSong);
  localStorage.setItem("songs", JSON.stringify(songs))
}

createSongButton.addEventListener("click", (event) => {
  event.preventDefault();

  const {title, duration, author, auditions} = getInputValues()
  clearCreateFormInputs()

  addSong({title, duration, author, auditions})
  alert("Song added")
});
