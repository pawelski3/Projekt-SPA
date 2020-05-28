import $ from 'jquery';
import { Cart } from '../cart/cart';

export const cart = () => {
  const fragment = $(new DocumentFragment());

  let cartCookie = new Cart
  let divBig = $('<div class="container"></div>')
  let info = $('<div id="RegistrationInfo" ></div>')
  let h2 = $('<h2  class="fontColor">Koszyk:</h2>')
  $('main').height(750)

  let getContent = cartCookie.get()[0]
  let StringInArr = getContent ? getContent : "Reservation/Brak rezerwacji."

  let w = StringInArr.split('Reservation/')
  let addId = w.map(elem => {
    let id = Math.random().toString(36).substr(2, 9)
    return id + "/" + elem
  })
  let c = addId.slice(2)
  let arr = c.map(e => {
    e.split("/")
    return e
  })
  let toDelete = (item) => {
    let arrToDelete = arr.find(e => {
      return e.startsWith(item)
    })

    let newArr = []
    for (const i of arr) {
      if (i != arrToDelete) {
        newArr.push(i)
      }
    }
    let newArr2 = ['Reservation/']
    newArr.map(e => {
      let item = e.split("/")
      item.shift()
      item.unshift('Reservation')
      let it2 = item.join("/")
      newArr2.push(it2)
    })
    cartCookie.set([newArr2.join("")])
    arr = newArr
    return arrToDelete
  }

  let ul = $('<ul class="list-group"></ul>')

  let toPay = []
  let li = arr.map(elem => {

    let content = elem.split("/")
    let typeOfSubject = content[1].startsWith("Pokój")
    let daysDifference = 1
    if (typeOfSubject) {
      daysDifference = Math.ceil(Math.abs(new Date(content[3]).getTime() - new Date(content[2]).getTime())) / (1000 * 3600 * 24)
      toPay.push(content[4] * daysDifference)
    } else {
      toPay.push(parseInt(content[4]))
    }
    let button = $('<button class="btn btn-secondary">Usuń</button>')
    button.on("click", () => {
      $(`li[id="${content[0]}"]`).fadeOut(500)
      if (typeOfSubject) {
        sum = sum - (content[4] * daysDifference)
      } else {
        sum = sum - content[4]
      }
      $(`div[id="sum"]`).text("Razem: " + sum + " zł")
      toDelete(content[0])
    })
    let li1
    if (typeOfSubject) {
      li1 = $(`<li class="align-middle lista" id=${content[0]}>${content[1]} od ${content[2]} do ${content[3]}, cena: ${content[4]} zł/doba, ilość dób: ${daysDifference}, do zapłaty: ` + content[4] * daysDifference + ' zł</li>'
      )
    }
    else {
      li1 = $(`<li class="align-middle lista" id=${content[0]}>Voucher: ${content[1]}, cześć ciała: ${content[2]}, czas: ${content[3]} minut, cena: ` + parseInt(content[4]) + ' zł</li>')
    }
    li1.append(button)
    return li1
  })
  ul.append(li)
  let sum = 0;
  toPay.forEach(e => {
    sum += e;
  })

  let sumDisplay = $(`<div  id="sum">Do zapłaty: ${sum} zł</div>`)
  divBig.append(info, h2, ul, sumDisplay)

  fragment
    .append(divBig)

  return Promise.resolve(fragment);
};