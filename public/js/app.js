
// 
// Q) Goal: Reander content to paragraphs
// 
// 1. Select the secound message p from JavaScript
// 2. Jsut befor fetch, render loading mesage and empty p
// 3. If error, render error
// 4. If no error,render location and forcast
// 5. Test your work! Search for errors and for valid location

const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

// messageOne.textContent = 'Form JavaScript'

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    fetch('/weather?address=' + location).then((responce) => {
        responce.json().then((data) => {
            if (data.error) {
                messageOne.textContent = data.error
            } else {
                messageOne.textContent = data.location
                // messageTwo.textContent = data.forecast
                messageTwo.textContent = Object.entries(data.forecast)
                // .map(([key, value]) => `${key}: ${value}`)
                // .join('\n');
                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
})