let order = [];
let filterOrder = order.slice();
let saveDet;
document.addEventListener("DOMContentLoaded", () => {
    const filter = document.getElementById("filter");
    saveDet = filter.trim === "";

    order = getOrderCookie();
    fetch('images/photos.json')
        .then(response => response.json())
        .then(json => {
                imagesCnt = Object.keys(json.photos).length;
                if(order.length === imagesCnt){
                    filterOrder = order
                    loadByOrder(json.photos,filterOrder)
                }else{
                    order = firstLoad(json.photos);
                    filterOrder = order;
                }

            filter.addEventListener("input", () => {
                if(filter.value.trim() === ""){
                    filterOrder = order.slice();
                    saveDet = true;
                    showPhotos(order);
                }
                else{
                    saveDet = false;
                    hidePhotos(order);
                    filterOrder = order.filter( (value) => {
                            return ( json.photos[value].title.toLowerCase().includes(filter.value) ||
                                     json.photos[value].description.toLowerCase().includes(filter.value));
                        }
                    );
                    showPhotos(filterOrder);
                }
            })
        });
});

function showPhotos(order){

    order.forEach((value) =>{
        document.getElementById("img" + value).style.display = "";
    })
}

function hidePhotos(order){
    order.forEach((value) =>{
        document.getElementById("img" + value).style.display = "none";
    })
}
function loadByOrder(photos, order){
    order.forEach(function (index){
        loadPhoto(photos[index],index);
    });
}
function firstLoad(photos){
    var arr = [];
    photos.forEach((item, index) => {
        loadPhoto(item, index);
        arr.push(index);
    });
    return arr;
}

function  loadPhoto(item, index){
    const gallery = document.getElementById('galleryWrapper');
    let galleryItem = document.createElement('img');
    const slideshow = document.querySelector('.slide-show-content');
    let slideshowItem = document.createElement('div');
    let slideShowItemTitle = document.createElement('div');
    let slideShowItemDesc = document.createElement('div');
    slideshowItem.classList.add('slides');
    slideshowItem.setAttribute('id',index);
    slideShowItemTitle.innerHTML = item.title;
    slideShowItemTitle.classList.add('item-title');
    slideShowItemDesc.innerHTML = item.description;
    slideShowItemDesc.classList.add('item-description');

    galleryItem.setAttribute("src", "images/" + item.src);

    slideshowItem.appendChild(galleryItem.cloneNode());
    slideshowItem.appendChild(slideShowItemTitle);
    slideshowItem.appendChild(slideShowItemDesc);
    slideshow.appendChild(slideshowItem);

    galleryItem.classList.add('img-thumbnail');
    galleryItem.id = "img" + index;
    galleryItem.setAttribute("onclick", "openModal(id)")
    gallery.appendChild(galleryItem);
}
function updateOrder(index, value){
    if(index === 0){
        updateOrder.counter = 0;
    }
    if(saveDet){
        order[index] = Number(value.id.substr(3));
        filterOrder[index] = Number(value.id.substr(3));
    }else{
        if(value.style.display !== "none"){
            order[index] = Number(value.id.substr(3));
            filterOrder[updateOrder.counter] = Number(value.id.substr(3));
            updateOrder.counter++;
        }
    }
}
function setOrderCookie(arr){
    var json_str = JSON.stringify(arr);
    setCookie('order', json_str,30);
}
function getOrderCookie(){
    const json_str = getCookie('order');

    return json_str==="" ? [] : JSON.parse(json_str);
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}