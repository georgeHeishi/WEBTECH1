const template2 = document.createElement('template');
template2.innerHTML = `
    <div>
        <div>
            <input type="checkbox" id="slider">
            <label id="label" for="slider"></label>
        </div>
        <div id="hidden-input">
            <input type="range" id="amplitude-slider" value="1" step="0.5" min="0.5" max="5">
            <div class="slider-value" id="slider-value">1</div>   
        </div>
        <style>

            #hidden-input{
                margin-left: auto;
                margin-right: auto;
                width: 129px;
                display: none;
                position: relative;
            }
            .slider-value{
                position: absolute;
                left: 18px;
            }   
        </style>
    </div>
`;

class SliderInput extends HTMLElement {
    constructor() {
        super();

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template2.content.cloneNode(true));
        this.shadowRoot.querySelector('#label').innerText = this.getAttribute('label');
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#slider').addEventListener('click', () =>
        {
            if(this.shadowRoot.querySelector('#slider').checked === true){
                this.shadowRoot.querySelector('#hidden-input').style.display = "block";
            }else{
                this.shadowRoot.querySelector('#hidden-input').style.display = "none";
            }
        });
        this.shadowRoot.querySelector('#amplitude-slider').addEventListener('input', () =>
            {
                const slider = this.shadowRoot.querySelector('#amplitude-slider');
                const sliderD = this.shadowRoot.querySelector("#slider-value");
                const newValue = Number( (slider.value - slider.min) * 100 / (slider.max - slider.min)),
                      newPosition =  3 - (newValue * 0.143);
                sliderD.innerHTML = `<span>${slider.value}</span>`;
                sliderD.style.left = `calc(${newValue}% + (${newPosition}px))`;
            });
    }
}

window.customElements.define('slider-input', SliderInput);