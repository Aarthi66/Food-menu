export default class Likes {
    constructor(){
        this.likes = [];
    }
    addlikes(id,title,author,img){
        const like ={id,title,author,img};
        this.likes.push(like);
        //persist the data in localStorage
        this.persistdata();
        return like;
    }
    deletelikes(id){
        const index =this.likes.findIndex(el => el.id ===id);
        this.likes.splice(index,1);
        //persist the data in localStorage
        this.persistdata();
    }
    isliked(id){
        return this.likes.findIndex(el => el.id ===id) !== -1;
    }
    getnumlikes(){
        return this.likes.length;
    }
    persistdata(){
        localStorage.setItem('likes',JSON.stringify(this.likes));
    }
    readstorage(){
        const storage =JSON.parse(localStorage.getItem('likes'));
        if(storage) this.likes =storage;
    }
}