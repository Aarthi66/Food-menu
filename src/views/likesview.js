import { elements } from './base';
import {limitreceipetitle} from './searchView';
export const togglebtn = isliked => {
    const iconstring = isliked ? 'icon-heart' : 'icon-heart-outlined';
    document.querySelector('.recipe__love use').setAttribute('href', `img/icons.svg#${iconstring}`);
};
export const togglelikebtn = numlikes => {
    elements.likesmenu.style.visibility = numlikes > 0 ? 'visible' : 'hidden';
};
/* 
*@author Aarthi sWitchig t nexr 
ghdjshdevaj
*/
export const renderlike = like => {
    const markup = `
     <li>
        <a class="likes__link" href="#${like.id}">
            <figure class="likes__fig">
                <img src="${like.img}" alt="Test">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitreceipetitle(like.title)}</h4>
                <p class="likes__author">${like.author}</p>
            </div>
        </a>
     </li>
     `;
     elements.likeslist.insertAdjacentHTML('beforeend',markup);
};

export const deletelike = id =>{
    const el =document.querySelector(`.likes__link[href*="#${id}"]`).parentElement;
    if(el) el.parentElement.removeChild(el);
}