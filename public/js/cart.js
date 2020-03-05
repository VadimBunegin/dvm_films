class CardItem {
  constructor(title, count, price) {
    this.title = title
    this.count = count
    this.price = price
  }
}

class Cart {
  constructor(shopList) {
    this.shopList = shopList
    this.cardItems = []
  }

  addItem(title, price) {
    for (let cardItem of this.cardItems) {
      if (cardItem.title === title) {
        cardItem.count++
        this.refresh()
        return
      }
    }
    // Если товар не нашёлся
    this.cardItems.push(new CardItem(title, 1, price))
    this.refresh()
  }

  refresh() {
    this.shopList.innerHTML = ""
    for (let cardItem of this.cardItems) {
      let listItem = document.createElement("li")
      listItem.className = "list-group-item"
      listItem.innerHTML =
        cardItem.title + ", " + cardItem.price + ", " + cardItem.count
      listItem.addEventListener("click", function(e) {
        alert("Нажали на элемент " + cardItem.title)
      })
      this.shopList.appendChild(listItem)
    }
    if (!this.cardItems.length) {
      let listItem = document.createElement("li")
      listItem.className = "list-group-item"
      listItem.innerHTML = "Покупок нет. Купите что-нибудь, пожалуйста!"
      this.shopList.appendChild(listItem)
    }
  }
}

let cartElement = document.getElementById("shoppingCart")
let btnOpenCart = document.getElementById("btnOpenCart")

btnOpenCart.addEventListener("click", function(e) {
  e.stopPropagation()
  cartElement.classList.toggle("shopping-cart_hidden")
})

document.body.addEventListener("click", function(e) {
  cartElement.classList.add("shopping-cart_hidden")
})

let shopList = cartElement.querySelector(".list-group")
let cart = new Cart(shopList)
cart.refresh()

setTimeout(function() {
  let shoppingItems = document.getElementById("shoppingItems")
  let shoppingButtons = shoppingItems.querySelectorAll(".btn")
  shoppingButtons.forEach(function(button) {
    button.addEventListener("click", function(e) {
      e.stopPropagation()
      let cardBody = e.target.parentElement
      let itemName = cardBody.querySelector(".card-title")
      cart.addItem(itemName.innerHTML, button.innerHTML)
    })
  })
}, 1000)

let submitCart = document.getElementById("submitCart")
submitCart.addEventListener("click", function(e) {
  let jwt = localStorage.getItem("jwt")
  if (!jwt) return alert("Для покупки авторизуйтесь или зарегистрируйтесь")
  jwt = JSON.parse(jwt)
  axios.post("/submit_cart", { cart: cart, jwt: jwt }).then(function(res) {
    console.log(res.data)
  })
})
