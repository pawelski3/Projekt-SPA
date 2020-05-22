import $ from 'jquery';
import style from "./style/style.scss"
import icon from "./images/background2.jpg"
import { Router } from './router/router';
import { nav } from './navigation/nav';
import { Cart } from './cart/cart';
//import icon from "/images/treatments/kabel skrętka.jpg"
//import { cart } from './views/cart';

//<a href="https://www.freepik.com/free-photos-vectors/frame">Frame photo created by freepik - www.freepik.com</a>


const main = $('main');

const router = new Router();
router.mount(main);
router.init()
main.before(nav());
$('main').attr('style','background-image: url("'+icon+'")') 

// var imageUrl =  
// "https://www.geeksforgeeks.org/wp-content/uploads/jquery-banner-768x256.png"; 
//                // $("main").css("background-image", "url:('"+icon+"')"); 


$('nav>ul>li:nth-child(5) a').on("click", () => {
  $('#dymek').remove()
})

$('nav>ul>li:nth-child(5) a').mouseover(() => {
  $('#dymek').remove()
  
  let e = window.event;
  let posX = e.clientX;
  let posY = e.clientY+12;
  //console.log("hover")
  let cartCookie = new Cart
  //let getContent=cartCookie.get()[0]
  // let StringInArr=cartCookie.get()[0]?cartCookie.get()[0]:""
  console.log("StringInArr:z dymka ", cartCookie.get(),cartCookie.get()[0])
  if(cartCookie.get()&&cartCookie.get()[0]){//[0]
  let w = cartCookie.get()[0].split('Reservation/')
  console.log("w:z dymka ", w)

  let w1 = w.slice(2)///////////////
  //console.log("c: " + c)
  let arr = w1.map(e => {
    e.split("/")
    return e
  })
  //console.log(arr)

  let ul = $("<ul></ul>")
  let toPay = []
  let li = arr.map(elem => {
    let content = elem.split("/")
    let typeOfSubject = content[0].startsWith("Pokój")
    console.log("elem: ", typeOfSubject, content[4])
    let daysDifference = 1
    if (typeOfSubject) {
      daysDifference = Math.ceil(Math.abs(new Date(content[2]).getTime() - new Date(content[1]).getTime())) / (1000 * 3600 * 24)
      toPay.push(content[3] * daysDifference)
    } else {
      toPay.push(parseInt(content[3]))
    }
    //console.log("cont różnica: " , daysDifference)

    let li1
    if (typeOfSubject) {
      li1 = $(`<li >${content[0]} od ${content[1]} do ${content[2]}, cena: ${content[3]} zł/doba, ilość dób: ${daysDifference}, do zapłaty: ` + content[3] * daysDifference + ' zł </li>'
      )
    }
    else {
      li1 = $(`<li >Voucher: ${content[0]}, cześć ciała: ${content[1]}, czas: ${content[2]} minut, cena: ` + parseInt(content[3]) + ' zł </li>')
    }

    return li1
  })
  let sum = 0;
  toPay.forEach(e => {
    sum += e;
    console.log("sum: ", sum)
  })

  let divSum = $(`<div id="sum1">Do zapłaty: ${sum} zł</div>`)
  let container = $(`<container id="dymek"></container`)
  ul.append(li)

  container.append(ul, divSum)
  container.css("left", posX)
  container.css("top", posY)
  $("body").append(container)

  setTimeout(function () { $('#dymek').fadeOut(500) }, 2000);
}
})

