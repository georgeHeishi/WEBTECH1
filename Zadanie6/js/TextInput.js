const template1 = document.createElement('template');
template1.innerHTML = `
    <div>
        <div>
            <input type="checkbox" id="text">
            <label id="label" for="text"></label>
        </div>
        <div id="hidden-input">
            <input type="number" id="amplitude-text" value="1" step="0.5" min="0.5" max="5" >
            <label for="amplitude-text">Amplitude</label>
        </div>
        <style>
            #hidden-input{
                display: none;
            }
        </style>
    </div>
`;

class TextInput extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template1.content.cloneNode(true));
        this.shadowRoot.querySelector('#label').innerText = this.getAttribute('label');
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#text').addEventListener('click', () =>
        {
            if(this.shadowRoot.querySelector('#text').checked === true){
                this.shadowRoot.querySelector('#hidden-input').style.display = "block";
            }else{
                this.shadowRoot.querySelector('#hidden-input').style.display = "none";
            }
        });
    }
}

window.customElements.define('text-input', TextInput);