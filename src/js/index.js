// ****ES6 MODULE *******

// import string from '../models/Search';
// // import {add as a,multiply as m,ID} from '../views/searchView';       //or
// import * as sea from '../views/searchView';
// console.log(`${string} : add result ${sea.add(sea.ID,10)} :multiply result ${sea.multiply(2,sea.ID)}`);

//to get API ID (food2fork.com -> browse ->recipe API ->search api,Recipe api )

//f5962abb84f10664c08251c0b0033498   API Key
//https://www.food2fork.com/api/search       Search link
//(key: API Key
//q: (optional) Search Query (Ingredients should be separated by commas). If this is omitted top rated recipes will be returned.
//sort: (optional) How the results should be sorted. See Below for details.
//page: (optional) Used to get additional results)


import Search from '../models/Search';
import recipe from '../models/recipe';
import list from '../models/list';
import likes from '../models/likes';
import * as searchView from '../views/searchView';
import * as recipeview from '../views/recipeview';
import * as listview from '../views/listview';
import * as likesview from '../views/likesview';
import { elements,renderloader ,clearloader} from '../views/base';

/*global state of the app
*  search object
*  current recipe object
*  shopping list object
*  liked recipe
*/

const state ={};
//window.state =state;

/*
search controller
*/

const controlSearch = async ()=>{
    //get the query from the view
    const query = searchView.getInput();
    //console.log(query);
    //const query = 'pizza';

    if(query){
        //New search object and add to state
        state.search= new Search(query);
        
        //prepare UI for results
        searchView.clearinput();
        searchView.clearlist();
        renderloader(elements.searchresult);
        try{
            //search the recipe
        await state.search.getResults();

        //render the result on UI
        //console.log(state.search.result);
        clearloader();
        searchView.renderResults(state.search.result);

        }
        catch(err){
            alert("something wrong with the search");
            clearloader();
        }
    }
}
elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();             // to prevent default function on clicking 
    controlSearch();
});



elements.searchrespages.addEventListener('click',e => {
    const btn =e.target.closest('.btn-inline');

    if(btn){
        const gotopage =parseInt(btn.dataset.goto,10);
        searchView.clearlist();
        searchView.renderResults(state.search.result,gotopage);
        //console.log(gotopage);
    }
});


/*
recipe controller
*/
// const r= new recipe(47000);
// r.getrecipe();
// console.log(r);

const controlrecipe =async () =>{
    const id =window.location.hash.replace('#','');
    //console.log(id);

    if(id){
        //prepare UI for changes
        recipeview.clearrecipe();
        renderloader(elements.recipe);
        //highligt the selected 
        if(state.search) {searchView.highlightselected(id);}
        //create new recipe object
         state.recipe= new recipe(id);
         
         try{
             //get recipe data and parse ingredients
         await state.recipe.getrecipe();
         console.log(state.recipe.ingredient);
         state.recipe.parseingredients();
         //calculate serving n time
         state.recipe.calctime();
         state.recipe.calcserving();
         //render recipe
         clearloader();
         //console.log(state.recipe);
         recipeview.renderrecipe(state.recipe, state.likes.isliked(id));
         }
         catch(err){
             alert('error processing recipe');
         }
        
    }
}
// window.addEventListener('hashchange',controlrecipe);
// window.addEventListener('load',controlrecipe);

// this is replaced by

['hashchange','load'].forEach(event => window.addEventListener(event,controlrecipe));

//handling recipe button clicks

//list controller

const controllist=()=>{
    //create a new list
    if(!state.list) state.list=new list();

    //add new ingredients to list
    state.recipe.ingredients.forEach(el => {
        const item =state.list.additem(el.count,el.unit,el.ingredient);
        listview.renderitem(item);
    });

}
//Handle delete and update list item events
elements.shopping.addEventListener('click', e => {
      const id =e.target.closest('.shopping__item').dataset.itemid;

      //handle the delete button
      if(e.target.matches('.shopping__delete, .shopping__delete *')){
          // delete the state
          state.list.deleteitem(id);

          //delete UI
          listview.deleteitem(id);
      }else if(e.target.matches('.shopping__count-value')){
         const val = parseFloat(e.target.value,10);
         state.list.updatecount(id,val);
      }
});


/* like controller*/


const controllikes =()=>{
    if(!state.likes) state.likes=new likes();
    const currid=state.recipe.id;
   
    //user has not yet liked current recipe
    if(!state.likes.isliked(currid)){
       //add like to the state
      const newlikes = state.likes.addlikes(
        currid,
        state.recipe.title, 
        state.recipe.author,
        state.recipe.img 
      );
      //toggle the like button
      likesview.togglebtn(true);
      //add like to UI List
      likesview.renderlike(newlikes);
      console.log(state.likes);

    }     //user has liked current recipe
    else{
        //remove like to the state
        state.likes.deletelikes(currid);
      //toggle the like button
      likesview.togglebtn(false);
      //remove like to UI List
      console.log(state.likes);
    }
    console.log(state.likes.getnumlikes());
    likesview.togglelikebtn(state.likes.getnumlikes());

}
//restore the liked recipe on page load

window.addEventListener('load', () =>{
    state.likes=new likes();
    //restore the likes
    state.likes.readstorage();
    //toggle the like menu
    likesview.togglelikebtn(state.likes.getnumlikes());
    //render the existing likes
    state.likes.likes.forEach(like =>
     likesview.renderlike(like)
    )
})
elements.recipe.addEventListener('click', el =>{
    if(el.target.matches('.btn-decrease , .btn-decrease *')) {
        if(state.recipe.servings >1){
            state.recipe.updateservings('dec');
            recipeview.updateservingingredients(state.recipe);
        }
       
    } else if(el.target.matches('.btn-increase , .btn-increase *')) {
        state.recipe.updateservings('inc');
        recipeview.updateservingingredients(state.recipe);
     }else if(el.target.matches('.recipe__btn--add,recipe__btn--add *')){
         controllist();
     }else if(el.target.matches('.recipe__love, .recipe__love *')){
         controllikes()
     }
     
});


window.l = new list();