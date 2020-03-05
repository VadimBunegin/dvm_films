let modal = document.getElementById('exampleModalCenter')
let button = document.getElementById('openModal')
let close = document.getElementById('modalCloseBtn')
let close2 = document.getElementById('modalCloseBtn2')


button.addEventListener('click', function() {
    modal.style.display = 'block'
})

close.addEventListener('click', function() {
    modal.style.display = 'none'
})
close2.addEventListener('click', function() {
    modal.style.display = 'none'
})

