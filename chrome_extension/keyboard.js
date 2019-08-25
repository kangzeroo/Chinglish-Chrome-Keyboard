console.log('loading keyboard.js ...')

document.addEventListener('focusin', function(e) {
    console.log('focusin!', e)
    e.srcElement.value = "HELLO WORLD"
    e.srcElement.addEventListener("keydown", event => {
        console.log(`Event with keyCode: ${event.keyCode}`, event)
    })
    // should have some code to remove event listener
})

