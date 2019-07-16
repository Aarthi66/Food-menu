export const elements = {
    searchForm: document.querySelector('.search'),
    searchinput: document.querySelector('.search__field'),
    searchresult: document.querySelector('.results'),
    searchResList: document.querySelector('.results__list'),
    searchrespages : document.querySelector('.results__pages'),
    recipe : document.querySelector('.recipe'),
    shopping  : document.querySelector('.shopping__list'),
    likesmenu :document.querySelector('.likes__field'),
    likeslist :document.querySelector('.likes__list')
};

export const elementstring = {
    loader: 'loader'
};

export const renderloader = parent => {        //SVG-Scalable Vector Graphics
    const loader = `
          <div class='${elementstring.loader}'>
              <svg>
                 <use href="img/icons.svg#icon-cw"></use>
              </svg>
          </div>
    `;
    parent.insertAdjacentHTML('afterbegin', loader);
};

export const clearloader = () => {
    const loader = document.querySelector(`.${elementstring.loader}`);
    if (loader){
        loader.parentElement.removeChild(loader);
    }
};