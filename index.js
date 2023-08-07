import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");

function getEmotionsArray(cats) {
  const emotionArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      emotionArray.push(emotion);
    }
  }
  return emotionArray;
}

function renderEmotionsRadios(cats) {
  const emotions = getEmotionsArray(cats);
  let radioItems = ``;
  for (let emotion of emotions) {
    radioItems += `
        <div class="radio">
            <label for=${emotion}>${emotion}</label>
            <input
            id=${emotion}
            name="radioItem"
            value=${emotion}
            type="radio"
            >
        </div>
        `;
  }
  emotionRadios.innerHTML = radioItems;
}

renderEmotionsRadios(catsData);
