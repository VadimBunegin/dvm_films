class ShopItem {
  constructor(item) {
    this.item = item
  }
  append(container) {
    let col = document.createElement("div")
    col.className = "col col-lg-4 col-md-6 col-12"
    let card = document.createElement("div")
    card.className = "card"
    // card.style.minWidth = "300px"
    let img = document.createElement("img")
    img.src = this.item.img
    img.alt = this.item.img_alt
    img.className = "card-img-top shop-item__img"
    let card_body = document.createElement("div")
    card_body.className = "card-body"
    let card_title = document.createElement("h5")
    card_title.className = "card-title"
    card_title.innerHTML = this.item.title
    let card_text = document.createElement("p")
    card_text.className = "card-title"
    card_text.innerHTML = this.item.text
    let card_button = document.createElement("button")
    card_button.className = "btn btn-primary"
    card_button.innerHTML = this.item.price
    col.appendChild(card)
    card.appendChild(img)
    card.appendChild(card_body)
    card_body.appendChild(card_title)
    card_body.appendChild(card_text)
    card_body.appendChild(card_button)
    container.appendChild(col)
  }
}

axios.get("/shop_items").then(function(res) {
  let shopItems = res.data
  let container = document.getElementById("shoppingItems")
  for (let shopItem of shopItems) {
    new ShopItem(shopItem).append(container)
  }
})
