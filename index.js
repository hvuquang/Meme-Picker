import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios")
const getImage = document.getElementById("get-image-btn")

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

function hightlightCheckOption(e) {
  checkOptionHasHightLight()
  if(e.target.id === null) return
  const selectedItem = document.getElementById(e.target.id).parentElement
  selectedItem.classList.add("hightlight")
}

function checkOptionHasHightLight() {
  const itemsArray = document.getElementsByClassName('radio')
  for (let i of itemsArray) {
    i.classList.remove('hightlight')
  }
}

emotionRadios.addEventListener("change", hightlightCheckOption)

function getMatchingCatsArray() {
  const isGif = document.getElementById('gifs-only-option').checked
  if (document.querySelector(`input[type='radio']:checked`)) {
    const checkedOption = document.querySelector(`input[type='radio']:checked`).value
    // console.log(checkedOption.value)
    const FILTERRED_CAT = catsData.filter(function(cat) {
      if (isGif) {
        return cat.emotionTags.includes(checkedOption) && cat.isGif == isGif
      }
      else {
        return cat.emotionTags.includes(checkedOption)
      }

    })
    return FILTERRED_CAT
  }
}

function getSingleCatObject() {
  console.log(getMatchingCatsArray())
}

function renderCat() {
  getSingleCatObject()
}

getImage.addEventListener('click', renderCat)

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