import $ from 'jquery';
import style from "./style/style.scss"
import icon from "./images/nikon.jpg"
import { Router } from './router/router';
import { nav } from './navigation/nav';


// $("#c1").text("jq działą")
// console.log("hej")
// let myicon=new Image();
// myicon.src=icon
// document.querySelector("div").appendChild(myicon)


const main = $('main');

const router = new Router();
router.mount(main);
router.init()
main.before(nav());

// console.log("loc path "+location.pathname)
// let id=location.pathname
// $('#c2').on("click",()=>{
//     $('#c2').text("cccclikkk")
//     history.pushState({id},`${id}`,`${id}`);
//     $('#c2').text(location.pathname)
//     router.navigate(`/${id}`)
    
// })