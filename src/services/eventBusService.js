
function on(eventName, listener) {
    const callListener = ({ detail }) => {
        listener(detail)
    }
    window.addEventListener(eventName, callListener)
    return () => {
        window.removeEventListener(eventName, callListener)
    }
}

function emit(eventName, data) {
    window.dispatchEvent(new CustomEvent(eventName, { detail: data }));
}


export const eventBus = { on, emit }


// This is just a sample:

// eventBus.on('show-msg', (msg)=>{
//     console.log('I also got that msg:', msg);
// });

// var unsubscribeFunc = eventBus.on('puk', (ev)=>{
//     console.log('Puk Just happened!', ev);
// })

// setInterval(()=>{
//     eventBus.emit('puk', Math.random())
// }, 1000)

// setTimeout(()=>{
//     unsubscribeFunc();
// }, 5000)