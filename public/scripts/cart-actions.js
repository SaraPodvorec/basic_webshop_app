async function addToCartAtHome(productId){
    await fetch(`/cart/add/${productId}`, {
        method: 'GET',
    })
    .then(() => {
        location.reload()
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}

async function addToCartAtCart(productId){
    await fetch(`/cart/add/${productId}`, {
        method: 'GET',
    }).then(() => {
        location.reload()
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}

async function removeFromCart(productId){
    console.log('fetching');
    await fetch(`/cart/remove/${productId}`, {
        method: 'GET',
    })
    .then(() => {
        location.reload()
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}

//zbog back tipke
window.addEventListener("pageshow", function (event) {
    if (event.persisted) {
      location.reload();
    }
  });