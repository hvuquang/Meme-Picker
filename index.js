import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios");

function getEmotionsArray(cats) {
  const emotionArray = [];
  for (let cat of cats) {
    for (let emotion of cat.emotionTags) {
      if (!emotionArray.includes(emotion)) {
        emotionArray.push(emotion);
      }
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

emotionRadios.addEventListener("change", function(e) {
  if(e.target.id === null) return
  const selectedItem = document.getElementById(e.target.id)
  console.log(e.target.id)
  selectedItem.classList.toggle("hightlight")
})

/*========== Shopping List ==================== */

const inputItem = document.getElementById("item-input")
const addBtn = document.getElementById("add-item-btn")
const listOfItem = document.getElementById("list")

const shoppingList = []

inputItem.addEventListener("keypress", function(e) {
  let inputValue = inputItem.value
  if (e.key === "Enter") {
    if (isItemsInList(inputValue) === true) {
      alert("Item already in list")
      return;
    }
    shoppingList.push(inputValue)
    renderShoppingItems()
  }
})

addBtn.addEventListener("click", function(e) {
  let inputValue = inputItem.value
  if (isItemsInList(inputValue) === true) {
    alert("Item already in list")
    return;
  }
  shoppingList.push(inputValue)
  renderShoppingItems()
})

function renderShoppingItems() {
  let html = ``
  for ( let item of shoppingList) {
    html +=  `
    <li class="shopping-item">${item}</li>
  `
  }
  listOfItem.innerHTML = html
}

function isItemsInList(item) {
  if (shoppingList.includes(item) === true) return true
  return false
}