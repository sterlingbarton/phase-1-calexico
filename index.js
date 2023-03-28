 // Write your code here...
//Challenge #1
fetch ('http:localhost:3000/menu')
.then (function (res) {
    return res.json()
})
.then ((data) => {
    createMenu(data)
})

function createMenu (menuObj) {
    menuObj.forEach((meal) => {
        const menuItem = document.createElement('span')
        menuItem.className = 'menu-item'
        menuItem.id = meal.id
        menuItem.textContent = meal.name
        document.querySelector('#menu-items').appendChild(menuItem)

        menuItem.addEventListener('click', (e) => {
            let mealID = e.target.id
            mealID -= 1 //this is kinda hacky
            displayMenuItem(menuObj, mealID)
        })
    })
}

document.addEventListener('DOMContentLoaded', handleLoad());

function handleLoad() {
    fetch ('http:localhost:3000/menu')
    .then (function (res) {
        return res.json()
    })
    .then((data) => {
        displayMenuItem(data, 0)
        document.querySelector('#cart-form').addEventListener('submit', handleSubmit)
        function handleSubmit(e) {
            e.preventDefault()
            
            const numAddToCart = document.querySelector('#cart-amount').value
            document.querySelector('#number-in-cart').textContent = numAddToCart

            fetch (`http:localhost:3000/menu/${e.target[1].id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({number_in_bag: numAddToCart})
            }) 
            .then ((res) => res.json())
            .then ((data) => console.log(data))
         }
    })
}

function displayMenuItem(menuObj, id) {
    const img = menuObj[id].image
    const name = menuObj[id].name
    const description = menuObj[id].description
    const price = menuObj[id].price
    const addToCartButton = document.querySelector('#cart-form input[type="submit"')
    const numInCart = menuObj[id].number_in_bag

    document.querySelector('#dish-image').src = img
    document.querySelector('#dish-name').textContent = name
    document.querySelector('#dish-description').textContent = description
    document.querySelector('#dish-price').textContent = `$ ${price}`
    addToCartButton.id = menuObj[id].id
    document.querySelector('#number-in-cart').textContent = numInCart
}