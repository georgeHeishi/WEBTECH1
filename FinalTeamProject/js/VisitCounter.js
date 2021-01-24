
class PersonalCounter extends HTMLElement{
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
        this.#loadCounter();
    }
    connectedCallback(){

    }
    #loadCounter(){
        let n = localStorage.getItem('on_load_counter');
        if (n === null) {
            n = 0;
        }
        n++;
        localStorage.setItem("on_load_counter", n);
        let nums = n.toString().split('').map(Number);
        this.shadowRoot.innerHTML = 'Stránku si navštívil: ';
        for (var i of nums) {
            this.shadowRoot.innerHTML += '<span class="counter-item">' + i + '</span>';
        }
    }
}
customElements.define('my-counter', PersonalCounter);