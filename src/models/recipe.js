import axios from 'axios';
import {key,proxy} from "../views/config"

export default class recipe {
    constructor(id) {
        this.id=id;
        //console.log(this.id);
    }
    async getrecipe(){
      try{
        const res =await axios(`${proxy}https://www.food2fork.com/api/get?key=${key}&rId=${this.id}`);
        // console.log(res);
        this.title =res.data.recipe.title;
        this.author =res.data.recipe.publisher;
        this.img = res.data.recipe.image_url;
        this.url = res.data.recipe.source_url;
        this.ingredients = res.data.recipe.ingredients;
        //console.log(this.ingredients);
      }catch(error)
      {
          console.log(error);
          alert('something went wrong');
      }
    }

    calctime(){

        //assuming that we need 15 minutes for each 3 ingredients
        const numing = this.ingredients.length;
        const period = Math.ceil(numing/3);
        this.time = period * 15;
    }

    calcserving(){
        this.servings =4;
    }
    parseingredients(){
        const unitlong =['tablespoons','tablespoon','ounces','ounce','teaspoons','teaspoon','cups','pounds'];
        const unitshort =['tbsp','tbsp','oz','oz','tsp','tsp','cup','pound'];
        const units =[...unitshort,'kg','g'];
        const newingredients = this.ingredients.map(el =>{
            //uniform units              // converting all elements into lowercase
            let ingredient = el.toLowerCase();
                  //replace unitlong with unitshort
            // console.log(ingredient);
            unitlong.forEach((unit,i) => {
                ingredient=ingredient.replace(unit,unitshort[i]);
            });
            //remove paranthesis  
            ingredient=ingredient.replace(/ *\([^)]*\) */g, ' ');
            // parse ingredients to count,unit and ingredients
            const arring=ingredient.split(' ');
            const unitindex =arring.findIndex(el2 => unitshort.includes(el2));

            let objing;
            if(unitindex >-1){
                //there is an unit
                const arrcount =arring.slice(0,unitindex);
                let count;
                if(arrcount.length === 1){
                    count =eval(arring[0].replace('-','+'));
                }
                else{
                    count =eval(arring.slice(0,unitindex).join('+'));
                }

                objing ={
                    count,
                    unit : arring[unitindex],
                    ingredient: arring.slice(unitindex+1).join(" ")
                };
            }else if(parseInt(arring[0],10)){
               //there is no unit but the first element is number
               objing ={
                   count : parseInt(arring[0],10),
                   unit : '',
                   ingredient : arring.slice(1).join(' ')
               }
            }
            else if(unitindex ===-1){
                //there is no unit and no number in 1st position
                objing ={
                    count :1,
                    unit :'',
                    ingredient
                }
            }
            return objing;
        });
        this.ingredients =newingredients;
  
    }
    updateservings(type){
      //servings
      const newservings = type ==='dec' ? this.servings -1 : this.servings +1;
      //ingredients
      this.ingredients.forEach(el => {
          el.count = el.count * (newservings/this.servings);
      });
      this.servings =newservings;
    }
}
