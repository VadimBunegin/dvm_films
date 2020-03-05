axios.get('/new_user').then(function(res) {
    let alert = document.createElement('div')
    alert.className = "alert alert-primary position-fixed"
    alert.style.left = "0"
    alert.style.top = "0"
    alert.style.width = "100%"
    alert.innerHTML = "Ваш номер пользователя: " + res.data
    document.body.appendChild(alert);
    setTimeout(function() {
        alert.remove()
    }, 1000)
    console.log(res.data)
})