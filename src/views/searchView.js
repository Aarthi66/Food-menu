// ****ES6 MODULE *******

// export const add =(a,b) => a+b;
// export const multiply =(a,b) => a*b;
// export const ID =20;

import { elements } from './base';

export const getInput = () => document.querySelector('.search__field').value;
export const clearinput = () => {
    document.querySelector('.search__field').value = '';
}
export const clearlist = () => {
    
    elements.searchResList.innerHTML='';
    elements.searchrespages.innerHTML='';
}
export const highlightselected = id =>  {
    const resultarr =Array.from(document.querySelectorAll('.results__link'));
    resultarr.forEach(el=>{
        el.classList.remove('results__link--active');
    })
   document.querySelector(`.results__link[href*="#${id}"]`).classList.add('results__link--active');
}
/* ex for limit receipe title
title : the complete pasta center
acc =0 , acc+cur.length =3 <=17 
acc =3 ,acc+cur.length =11 <=17
acc=11, acc+cur.length =16 <=17
acc=16 ,acc+cur.length =22 >17
*/
export const limitreceipetitle = (title, limit = 17) => {
    const receipetitle = [];
    if (title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if (acc + cur.length <= limit) {
                receipetitle.push(cur);
            }
            return acc + cur.length;             // return value is acc
        }, 0);
        return `${receipetitle.join(' ')} ...`;
    }
    return title;
}
const renderRecipes = recipe => {
    const markup = `
    <li>                                   
       <a class="results__link" href="#${recipe.recipe_id}">
          <figure class="results__fig">
            <img src="${recipe.image_url}" alt="${recipe.title}">
             </figure>
          <div class="results__data">
            <h4 class="results__name">${limitreceipetitle(recipe.title)}</h4>
            <p class="results__author">${recipe.publisher}</p>
          </div>
       </a>
   </li>        
    `;
    document.querySelector('.results__list').insertAdjacentHTML('beforeend', markup);
};          //li is to represent the each individual items in the list
// alt to specify alternate text for an image


//type prev or next
const createbutton = (page, type) => `
             <button class="btn-inline results__btn--${type}" data-goto=${type === 'prev' ? page - 1 : page + 1}>
                <span>Page ${type === 'prev' ? page - 1 : page + 1}</span>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                </button>
`;
const renderbutton = (page, numResults, resperpage) => {
    const pages = Math.ceil(numResults / resperpage);
    let button;
    if (page === 1 && pages > 1) {
        // enable next button only
        button=createbutton(page, "next");
    }
    else if(page < pages)
    {
        //Both buttons
        button=`${createbutton(page, "prev")};
        ${createbutton(page, "next")};`;
    }
    else if(page === pages && pages > 1)
    {
        //only previous button
        button=createbutton(page, "prev");
    }
    elements.searchrespages.insertAdjacentHTML('afterbegin',button);
}
export const renderResults = (recipes, page = 2, resperpage = 10) => {
    const start = (page - 1) * resperpage;
    const end = page * resperpage;
    //console.log(recipes);
    recipes.slice(start, end).forEach(renderRecipes);

    renderbutton(page,recipes.length,resperpage);
};
