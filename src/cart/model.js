import $ from 'jquery';
import { service } from '../common/service';

export class PurchaseOrder {

    constructor() {
    //this.date=this.getDate()  
    this.key = 'IT_SPA_CART';
    this.rooms=[]
    
    }
    
    setRooms(room){
        this.rooms.push(room)
    }

    getRooms(){
        return this.rooms
    }

    getDate(){
        let utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
        return utc
    }

}