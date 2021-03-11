const template = document.createElement('template');
template.innerHTML = `
  <style>
  :host {
    display: inline-block;
  }
  input {
    display: none;
  }
  label {
    outline: 0;
    display: block;
    width: 4em;
    height: 2em;
    position: relative;
    cursor: pointer;
    user-select: none;
    background: #FFF;
    border-radius: 2em;
    padding: 2px;
    transition: all .4s ease;
    border: 1px solid #E5E5E5;
  }
  label:after, label:before {
    position: relative;
    display: block;
    content: "";
    width: 50%;
    height: 100%;
    border-radius: 50%;
    background: #FFF;
    transition: all .2s ease;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.101987);
    box-shadow: 0px 3px 8px rgba(0, 0, 0, 0.15), 0px 1px 1px rgba(0, 0, 0, 0.16), 0px 3px 1px rgba(0, 0, 0, 0.1);
  }
  label:after {
    left: 0;
  }
  label:before {
    display: none;
  }
  input:checked + label:after {
    left: 50%;
  }
  input:checked + label {
    background: #56C0AD;
    border-color: #56C0AD;
  }
  </style>
  <div class="toggle">
    <input id="toggle" type="checkbox">
    <label for="toggle"></label>
  </div>`;

export default class ToggleButton extends HTMLElement {
  constructor() {
    super();
    this._root = this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.$checkbox = this._root.querySelector('input');
    this.$checkbox.addEventListener('change', (e) => {
      this.dispatchEvent(
        new CustomEvent('change', { detail: { value: e.target.checked } }),
      );
    });
  }

  static get observedAttributes() {
    return ['checked'];
  }

  get checked() {
    return this.getAttribute('checked');
  }

  set checked(value) {
    this.setAttribute('checked', value);
    this.$checkbox.checked = value;
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.$checkbox.checked = this.checked;
  }
}