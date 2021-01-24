const template1 = document.createElement('template');
template1.innerHTML = `
<style>
        :host{
            display: inline-block;
        }
        a{
            text-decoration: none;
            color: #FFFFFF;
            font-weight: bolder;
            font-size: 1.2rem;
        }
        ul{
            display: inline-block;
            padding-inline-start: 0px;
            background-color: #0f0f0f;
            margin: 0;
        }
        li{
            display: block;
            float: left;
            padding: 5px 10px;
            position: relative;
            list-style: none;
        }
        
        li:hover{
            cursor: pointer;
        }
        li:hover > ul{
            display: block;
        }
        a:hover {
            border-bottom: 1px solid white;
        }
        ul ul{
            z-index: 10;
            position: absolute;
            display: none;
            margin: 0;
            padding: 5px 10px;
        }
        ul ul li{
            display: block;
        }
        
        ul ul ul{
            z-index: 10;
            position: absolute;
            top: 0;
            left: 100%;
        }
</style>
<ul id="menu-list">

</ul>
`;

class ThreeLvlMenu extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode:'open'});
        this.shadowRoot.appendChild(template1.content.cloneNode(true));
        this.#loadMenu();

    }

    connectedCallback() {

    }

    #loadMenu(){
        let menu = this.shadowRoot.getElementById('menu-list');
        fetch('resources/menu.json')
            .then(response => response.json())
            .then(json => {
                json.menu.forEach( (item) => {
                    this.#createList(item, menu);
                });
            });

    }

    #createList(item, parent){
        let listItem = document.createElement('li');
        let address = document.createElement('a');
        if(item.href !== '#'){
            address.href = item.href;
        }
        address.innerHTML = item.title;
        listItem.appendChild(address);
        if( item.submenu.length){
            let newLevelList = document.createElement('ul');
            item.submenu.forEach((itemSub) => {
                this.#createList(itemSub, newLevelList)
            })
            listItem.appendChild(newLevelList);
        }
        parent.appendChild(listItem)
    }
}



window.customElements.define('threelvl-menu', ThreeLvlMenu);