# Simple Web Applications

This project is trying to do complex web applications with as few dependencies as possible.

To this end, I implement by hand a poor man's redux for state management.
And rely on html web components for defining my own html tags.
I still use express on the server though because it's so convenient.

This means that there's no build step. Just
```> npm start```
to get the code running and refresh the page to get new code on the client
whenever you make changes.



Two ways to do high level app organization:

  1. simple html and global state:
    - ```import {getState, dispatch} from 'state/store.js'``` anywhere to access a singleton
      version of the state that is global to everything on the webpage.
    - Super simple to set up, and anyone who has a reference to dispatch can trigger
      a state update. (ie window.dispatch in index.js and then in html you can have:
      ```html
    <button onclick="dispatch({type: 'TURN'})">End Turn</button>
      ```
    - register callbacks for whenever state changes with ```subscribe``` also from store.js. Subscribe returns a token that you pass to ```unsubscribe``` when you're done. Same as like ```setTimeout``` and ```clearTimeout```

  2. StatefulClient for independent state in different parts of the application
    - Use ```<stateful-client>``` tags wrapped around all children that should share state.
    - In html, you can dispatch the slightly more complicated way:
       ```html
      <button onclick="this.closest('stateful-client').dispatch({type: 'TURN'})">
       ```
    - Or in custom components, you can grab references to the store functions by calling
      this function in connectedCallback:
      ```
      registerState() {
        const storeEvent = new CustomEvent('requestStore', {bubbles: true, detail: {}});
        this.dispatchEvent(storeEvent);
        Object.assign(this, storeEvent.detail);
      }
      ```
      See GameBoard.js for how this is used in practice
