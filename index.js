import { catsData } from "./data.js";

const emotionRadios = document.getElementById("emotion-radios")
const getImage = document.getElementById("get-image-btn")
const closeModalBtn = document.getElementById("meme-modal-close-btn")
const modal = document.getElementById("meme-modal")
const container = document.getElementById("meme-modal-inner")

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

// returns an array of cat objects that matches the user's criteria

function getMatchingCatsArray() {
  const isGif = document.getElementById('gifs-only-option').checked
  if (document.querySelector(`input[type='radio']:checked`)) {
    const checkedOption = document.querySelector(`input[type='radio']:checked`).value
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

//return a single cat object selected from the array
//must have an array first 

function getSingleCatObject() {
  const catsArray = getMatchingCatsArray()
  //check if there is 1 cat in array, return it
  if (catsArray.length === 1) {
    return catsArray[0]
  }
  //if more than 1, random
  else {
    //floor(): round down
    //random between 0 - catsArray.length - 1 (random() return 0 - <1)
    let randomCat = Math.floor(Math.random()*(catsArray.length))
    return catsArray[randomCat]
  }
  return null
}

//render the HTML string of the cat object provided
//must have a single cat

function renderCat() {
  const CAT = getSingleCatObject()
  if (CAT == null) return
  let html = ``
  html = `
      <img class="cat-img" src=${CAT.image} alt=${CAT.alt}>
  `
  //change the display from none -> inline
  modal.style.display = "flex"
  container.innerHTML = html
}

//what events should listen to ?
// renderCat -> render String HTML

getImage.addEventListener('click', renderCat)
closeModalBtn.addEventListener('click', function() {
  modal.style.display = "none"
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