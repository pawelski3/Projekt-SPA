import $ from 'jquery';
import style from "./style/style.scss"
import icon from "./images/background2.jpg"
import { Router } from './router/router';
import { nav } from './navigation/nav';
import { Cart } from './cart/cart';


//<a href="https://www.freepik.com/free-photos-vectors/frame">Frame photo created by freepik - www.freepik.com</a>


const main = $('main');

const router = new Router();
router.mount(main);
router.init()
main.before(nav());
$('main').attr('style', 'background-image: url("' + icon + '")')

$('nav>ul>li:nth-child(6) a').on("click", () => {
  $('#dymek').remove()
})

$('nav>ul>li:nth-child(6) a').mouseover(() => {
  $('#dymek').remove()

  let e = window.event;
  let posX = (e.clientX - 235 < 1207) ? (e.clientX - 235) : 1207;
  let posY = (e.clientY + 12 > 63) ? (e.clientY + 12) : 63;
  let cartCookie = new Cart
  if (cartCookie.get() && cartCookie.get()[0]) {//[0]
    let w = cartCookie.get()[0].split('Reservation/')
    let w1 = w.slice(2)
    let arr = w1.map(e => {
      e.split("/")
      return e
    })

    let ul = $("<div></div>")
    let toPay = []
    let li = arr.map(elem => {
      let content = elem.split("/")
      let typeOfSubject = content[0].startsWith("Pokój")
      let daysDifference = 1
      if (typeOfSubject) {
        daysDifference = Math.ceil(Math.abs(new Date(content[2]).getTime() - new Date(content[1]).getTime())) / (1000 * 3600 * 24)
        toPay.push(content[3] * daysDifference)
      } else {
        toPay.push(parseInt(content[3]))
      }

      let li1
      if (typeOfSubject) {
        li1 = $(`<p>${content[0]} od ${content[1]} do ${content[2]}, cena: ${content[3]} zł/doba, ilość dób: ${daysDifference}, do zapłaty: ` + content[3] * daysDifference + ' zł </p>'
        )
      }
      else {
        li1 = $(`<p>Voucher: ${content[0]}, cześć ciała: ${content[1]}, czas: ${content[2]} minut, cena: ` + parseInt(content[3]) + ' zł </p>')
      }

      return li1
    })
    let sum = 0;
    toPay.forEach(e => {
      sum += e;
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

