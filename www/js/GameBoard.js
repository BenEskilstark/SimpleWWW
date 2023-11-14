
export default class GameBoard extends HTMLElement {
  token = null;

  connectedCallback() {
    this.registerState();
    const width = parseInt(this.getAttribute("width"));
    const height = parseInt(this.getAttribute("height"));
    this.dispatch({width, height});
    this.token = this.subscribe(onChange.bind(this))
  }

  registerState() {
    const storeEvent = new CustomEvent('requestStore', {bubbles: true, detail: {}});
    this.dispatchEvent(storeEvent);
    Object.assign(this, storeEvent.detail);
  }

  disconnectedCallback() {
    unsubscribe(this.token);
  }
}

function onChange (state) {
  if (state.turn % 2 == 1) {
    this.style.backgroundColor = "rgb(100,100,100)";
  } else {
    this.style.backgroundColor = "white";
  }
}


