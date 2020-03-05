let express = require("express")
let bodyParser = require("body-parser")
let app = express()
let users_count = 0
let fs = require("fs")



class User {
  constructor(username, password) {
    this.username = username
    this.password = password
  }
}

let users = []
let tokens = []

fs.readFile("users.json", function(err, data) {
  if (err) return console.log(err)
  users = JSON.parse(data.toString())
  console.log(users)
})

app.use("/", express.static("public"))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get("/new_user", function(req, res) {
  users_count++
  res.send(users_count.toString())
})

app.get("/shop_items", function(req, res) {
  fs.readFile("shop_items.json", function(err, data) {
    if (err) return res.status(404).send("Нечего продавать")
    let shopItems = JSON.parse(data.toString())
    res.send(shopItems)
  })
})

app.post("/register", function(req, res) {
  let username = req.body.username
  let password = req.body.password
  users.push(new User(username, password))
  // Обновление всех пользователей в файле
  fs.writeFile("users.json", JSON.stringify(users), function(err) {
    if (err) return console.log(err)
  })
  res.send(username)
})

app.post("/login", function(req, res) {
  let username = req.body.username
  let password = req.body.password
  let user = users.find(function(user) {
    return user.username === username && user.password === password
  })
  let jwt = {
    username: username,
    key: Math.random()
      .toString()
      .slice(0, 5),
  }
  tokens.push(jwt)
  if (user) res.send(jwt)
  else res.sendStatus(404)
})
let WebSocket = require('ws')


app.post("/submit_cart", function(req, res) {
  let cart = req.body.cart
  let jwt = req.body.jwt
  let token = tokens.find(function(token) {
    return token.key === jwt.key
  })
  if (!token) return res.sendStatus(403)

  let user = users.find(function(user) {
    return user.username === token.username
  })

  if (user) res.send(user)
  else res.sendStatus(404)
})

app.listen(3000, function() {
  console.log("app run on 3000")
})


class Message {
    constructor(user, text) {
        this.user = user
        this.text = text
    }
}

let messages = []

let clients = []

app.use('/', express.static('./public'))

app.get('/hello', function (req, res) {
    // req - запрос пользователя
    // res - ваш ответ
    res.send('hello, user!')
})

app.get('/send', function (req, res) {
    let user = req.query.user
    let text = req.query.text
    let message = new Message(user, text)
    messages.push(message)
    for (client of clients) {
        client.send(JSON.stringify(message)) // JSON.stringify(messages) - преобразуем массив сообщений в строку
    }
    res.send('ok')
})

app.get('/receive', function (req, res) {
    res.send(messages)
    
})



let wsServer = new WebSocket.Server({server: app, path:"/ws" })
wsServer.on('connection', function(ws){
    clients.push(ws)
})
