
let login = document.getElementById('login')
login.addEventListener('click', function (e) {
    axios.post('/login', { username: username.value, password: password.value }).then(function (res) {
        let jwt = res.data
        let username = jwt.username
        let key = jwt.key
        localStorage.setItem('jwt', JSON.stringify(jwt));
        loginForm.style.display = 'none'
        userData.innerHTML = username
        userData.classList.remove('d-none')
    })
})

let jwt = localStorage.getItem('jwt');
if (jwt) {
    jwt = JSON.parse(jwt)
    let username = jwt.username
    loginForm.style.display = 'none'
    userData.innerHTML = username
    userData.classList.remove('d-none')
    //Разлогинить
    userData.addEventListener('click', function (e) {
        localStorage.removeItem('jwt')
        loginForm.style.display = 'block'
        userData.classList.add('d-none')
    })
}
