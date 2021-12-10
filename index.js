

//domElements

const body = document.body;
const runningTotal = document.querySelector(".running-total")
const runningTotalFaves = document.querySelector(".running-total-faves")

//containers
const collectionContainer = document.querySelector(".collection-container");
const favoritesContainer = document.querySelector(".favorites-container");
const pokemonCollection = document.querySelector(".pokemon-collection");
const pokemonFavorites = document.querySelector(".pokemon-favorites");

//filter buttons 
const aToZBtn = document.querySelectorAll(".alphabetical");
const typeBtn = document.querySelectorAll(".type");
const hpBtn = document.querySelectorAll(".hitPoints");
const all = document.querySelectorAll(".all");
const rareHolo = document.querySelectorAll(".rareHolo");
const rare = document.querySelectorAll(".rare");
const uncommon = document.querySelectorAll(".uncommon");
const common = document.querySelectorAll(".common");


//painting the dom 

function domPainting (arr = []){
  pokemonCollection.innerHTML = ''
  console.log(arr) 
  let domElements = arr.forEach((item) => {
    const slideCard = document.createElement('div')
    // const h3tag = document.createElement("h3");
    const hpTag = document.createElement("span");
    const rarityTag = document.createElement("h3");
    const imageTag = document.createElement("img");
    const pTag = document.createElement("p");
    const pokemonCard = document.createElement("div");
    const favoritesBtn = document.createElement("button");
    const star = "<i class='fas fa-star'></i>";
    
    slideCard.setAttribute("class", "slide-card animation")
    hpTag.setAttribute("class", "hp")
    rarityTag.setAttribute("class", "rarity");

    favoritesBtn.innerHTML = star;
    pokemonCollection.append(pokemonCard);
    
    hpTag.textContent = item.hp;
    rarityTag.textContent = item.rarity;
    pTag.innerHTML = `${item.type}`;
    imageTag.src = `${item.picture}`;

    pokemonCard.append(imageTag)
    pokemonCard.append(slideCard)

    // slideCard.append(h3tag)
    slideCard.append(rarityTag)
    pTag.append(hpTag)
    slideCard.append(pTag)
    slideCard.append(favoritesBtn)

    favoritesFilter(favoritesBtn)
    
  })

}

function domPaintingFaves (arr = []){
  pokemonFavorites.innerHTML = ''
  console.log(arr) 
  let domElements = arr.forEach((item) => {
    const h3tag = document.createElement("h3");
    const hpTag = document.createElement("span");
    const rarityTag = document.createElement("span");
    const imageTag = document.createElement("img");
    const pTag = document.createElement("p");
    const pokemonCard = document.createElement("div");
    const favoritesBtn = document.createElement("button");
    const star = "<i class='fas fa-star'></i>";
    
    hpTag.setAttribute("class", "hp")
    rarityTag.setAttribute("class", "rarity");

    favoritesBtn.innerHTML = star;
    pokemonFavorites.append(pokemonCard);
    
    // h3tag.textContent = item.name;
    hpTag.textContent = item.hp;
    rarityTag.textContent = item.rarity;
    pTag.innerHTML = `${item.type}`;
    imageTag.src = `${item.picture}`;

    pokemonCard.append(h3tag)
    pokemonCard.append(rarityTag)
    pokemonCard.append(hpTag)
    pokemonCard.append(pTag)
    pokemonCard.append(favoritesBtn)
    pokemonCard.append(imageTag)

    favoritesFilter(favoritesBtn)
    
  })

}

//favorite button

function favoritesFilter(starBtn){
  [starBtn].forEach((item) => {
    item.addEventListener("click", function(){
      if(item.parentElement.parentElement.parentElement.className === 'pokemon-collection'){
        pokemonFavorites.append(item.parentElement.parentElement) 

      } else if(item.parentElement.parentElement.parentElement.className === 'pokemon-favorites'){
        pokemonCollection.append(item.parentElement.parentElement)
      }
    })
  })
}



//sorting feature a-z, hp high to low , rarity sorting
//after each filter method, you must reset press reset and build the list over again.
let desc = false;

pokeFetcher().then(function(result){

  // domPainting(result)

  aToZBtn.forEach((btn) => {
    btn.addEventListener('click', () => {
      if(btn.parentElement.parentElement.nextElementSibling.className === "pokemon-favorites"){
        let array = favoritesObjBuilder()
        desc = !desc
        let sortedArr = sortArrBy(array, ['name'], desc);
        domPaintingFaves(sortedArr);
      }
      else if(btn.parentElement.parentElement.nextElementSibling.className === "pokemon-collection"){
        let array = collectionObjBuilder();
        desc = !desc
        let sortedArr = sortArrBy(array, ['name'], desc)
        domPainting(sortedArr);
      }

    })
  })

  typeBtn.forEach((btn) =>{
    btn.addEventListener('click', () => {
      if(btn.parentElement.parentElement.nextElementSibling.className === "pokemon-favorites"){
        let array = favoritesObjBuilder()
        desc = !desc
        let sortedArr = sortArrBy(array, ['type'], desc);
        domPaintingFaves(sortedArr);
      }
      else if(btn.parentElement.parentElement.nextElementSibling.className === "pokemon-collection"){
        let array = collectionObjBuilder();
        desc = !desc
        let sortedArr = sortArrBy(array, ['type'], desc)
        domPainting(sortedArr);
      }
    })
   })
  

  hpBtn.forEach((btn) =>{
    btn.addEventListener('click', () => {
      if(btn.parentElement.parentElement.nextElementSibling.className === "pokemon-favorites"){
        let array = favoritesObjBuilder()
        desc = !desc
        let sortedArr = sortArrBy(array, ['hp'], desc);
        domPaintingFaves(sortedArr);
      }
      else if(btn.parentElement.parentElement.nextElementSibling.className === "pokemon-collection"){
        let array = collectionObjBuilder();
        desc = !desc
        let sortedArr = sortArrBy(array, ['hp'], desc)
        domPainting(sortedArr);
      }
    })
   })


  all.forEach((btn) =>{
    btn.addEventListener("click", () => {
     domPainting(result)
     pokemonFavorites.innerHTML = ""
     runningTotalFaves.innerHTML = ""
     runningTotal.innerHTML = ""
     console.log(result)
  })
  })
  
  
  rareHolo.forEach((btn) => {
    btn.addEventListener("click", () =>{
      if(btn.parentElement.parentElement.parentElement.className === "collection-container"){
        let array = collectionObjBuilder();
        let filteredArr = filterAndCount(array, "Rare Holo")
        domPainting(filteredArr)
        runningTotal.innerHTML = `There are ${filteredArr.length} Rare Holos`

      } else if(btn.parentElement.parentElement.parentElement.className === "favorites-container"){
        let array = favoritesObjBuilder();
        let filteredArr = filterAndCount(array, "Rare Holo")
        domPaintingFaves(filteredArr)  
        runningTotalFaves.innerHTML = `There are ${filteredArr.length} Rare Holos`     
      }
    })
  })

  rare.forEach((btn) => {
    btn.addEventListener("click", () =>{
      if(btn.parentElement.parentElement.parentElement.className === "collection-container"){
        let array = collectionObjBuilder();
        let filteredArr = filterAndCount(array, "Rare")
        domPainting(filteredArr)
        runningTotal.innerHTML = `There are ${filteredArr.length} Rares` 

      } else if(btn.parentElement.parentElement.parentElement.className === "favorites-container"){
        let array = favoritesObjBuilder();
        let filteredArr = filterAndCount(array, "Rare")
        domPaintingFaves(filteredArr)   
        runningTotalFaves.innerHTML = `There are ${filteredArr.length} Rares`    
      }
    })
  })

  uncommon.forEach((btn) => {
    btn.addEventListener("click", () =>{
      if(btn.parentElement.parentElement.parentElement.className === "collection-container"){
        let array = collectionObjBuilder();
        let filteredArr = filterAndCount(array, "Uncommon")
        domPainting(filteredArr)
        runningTotal.innerHTML = `There are ${filteredArr.length} Uncommon`

      } else if(btn.parentElement.parentElement.parentElement.className === "favorites-container"){
        let array = favoritesObjBuilder();
        let filteredArr = filterAndCount(array, "Uncommon")
        domPaintingFaves(filteredArr)   
        runningTotalFavorites.innerHTML = `There are ${filteredArr.length} Uncommon`    
      }
    })
  })

  common.forEach((btn) => {
    btn.addEventListener("click", () =>{
      if(btn.parentElement.parentElement.parentElement.className === "collection-container"){
        let array = collectionObjBuilder();
        let filteredArr = filterAndCount(array, "Common")
        domPainting(filteredArr)
        runningTotal.innerHTML = `There are ${filteredArr.length} Uncommon` 

      } else if(btn.parentElement.parentElement.parentElement.className === "favorites-container"){
        let array = favoritesObjBuilder();
        let filteredArr = filterAndCount(array, "Common")
        domPaintingFaves(filteredArr) 
        runningTotalFavorites.innerHTML = `There are ${filteredArr.length} Common`       
      }
    })
  })

}) 

//function sections
pokemonFavorites.removeChild(pokemonFavorites.firstChild)

//I needed a function that would create the favorites object array so that I can easily apply array methods
function favoritesObjBuilder(){
  const h3Nodes = pokemonFavorites.getElementsByTagName("h3")
  const hpNode = pokemonFavorites.querySelectorAll(".hp")
  const rarity = pokemonFavorites.querySelectorAll(".rarity")
  const img = pokemonFavorites.getElementsByTagName("img");
  const button = pokemonFavorites.getElementsByTagName("button");
  const pTag = pokemonFavorites.getElementsByTagName("p");

  const [...title] = h3Nodes;
  const [...hp] = hpNode;
  const [...rari] = rarity;
  const [...pic] = img;
  const [...but] = button;
  const [...p] = pTag;


  const favePokeCollection = []

  for(let i = 0; i < title.length; i++){
    favePokeCollection.push({
      name: title[i].textContent,
      hp: parseInt(hp[i].textContent),
      rarity: rari[i].textContent,
      picture: pic[i].currentSrc,
      btn: but[i],
      type: p[i].textContent
    })
  }
  return favePokeCollection
}

//this function is to handle objects displayed in the collection section. Helps me apply methods to only the collection section and not the whole dom
//Not so DRY tho 

function collectionObjBuilder(){
  const h3Nodes = pokemonCollection.getElementsByTagName("h3")
  const hpNode = pokemonCollection.querySelectorAll(".hp")
  const rarity = pokemonCollection.querySelectorAll(".rarity")
  const img = pokemonCollection.getElementsByTagName("img");
  const button = pokemonCollection.getElementsByTagName("button");
  const pTag = pokemonCollection.getElementsByTagName("p");

  const [...title] = h3Nodes;
  const [...hp] = hpNode;
  const [...rari] = rarity;
  const [...pic] = img;
  const [...but] = button;
  const [...p] = pTag;


  const pokeCollection = []

  for(let i = 0; i < title.length; i++){
    pokeCollection.push({
      name: title[i].textContent,
      hp: parseInt(hp[i].textContent),
      rarity: rari[i].textContent,
      picture: pic[i].currentSrc,
      btn: but[i],
      type: p[i].textContent
    })
  }
  return pokeCollection
}

//this function takes in the object array and returns the array passed in sorted by the category in the sort param. desc is passed as the on off switch checking if its descending or ascending
function sortArrBy(array, sort, desc){
  array.sort(function(a, b){
    if(a[sort] < b[sort]) return -1;
    if(a[sort] > b[sort]) return 1;
    return 0
  })
  if(desc) array.reverse();
  return array
}

function filterAndCount (array, filter){
 return array.filter(a => a.rarity === filter)
}

async function pokeFetcher (){
  const api = 'https://api.pokemontcg.io/v2/cards/'
  const pokeData = await fetch(api);
  const json = await pokeData.json()
  //this api delivers 250 pokemon so i made a copy and sliced it to get 30
  const firstThirty = json.data.slice(0,30)

  const pokedex = firstThirty.map((data) =>({
    name: data.name,
    hp: parseInt(data.hp),
    type: data.types.join(", "),
    rarity: data.rarity,
    picture: data['images']['small']
  }))
   domPainting(pokedex)
   return pokedex
}
