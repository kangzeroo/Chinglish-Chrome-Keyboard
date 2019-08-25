// const React = require('react');
// const ReactDOM = require('react-dom');
// const App = require('./App');



console.log('loading keyboard.js ...')

const createKeyboardPanel = (ref) => {
    var newEl = document.createElement('div');
    newEl.innerHTML = `
        <div style="position:fixed;top:0;right:0;height:100%;z-index:99999;width:200px;background-color:black;padding: 10px;color:white;">
            <span style="color:white; padding: 10px">Option 1</span>
            <span style="color:white; padding: 10px">Option 2</span>
            <span style="color:white; padding: 10px">Option 3</span>
            <span style="color:white; padding: 10px">Option 4</span>
            <span style="color:white; padding: 10px">Option 5</span>
            <span style="color:white; padding: 10px">Option 6</span>
        </div>`;
    document.body.appendChild(newEl)
    // needs to be able to clear this keyboard panel automatically on blur()
    // and explicitly on press x button
}

document.addEventListener('focusin', function(e) {
    console.log('focusin!', e)
    e.srcElement.value = "HELLO WORLD"
    createKeyboardPanel(e.srcElement)
    e.srcElement.addEventListener("keydown", event => {
        console.log(`Event with keyCode: ${event.keyCode}`, event)
    })
    // needs to unsubscribe from eventListener automatically on blur()
})


// needs to port over the rxjs keyboard code from /src/App.js