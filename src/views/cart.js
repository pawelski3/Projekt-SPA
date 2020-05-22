import $ from 'jquery';
//import { service } from '../common/service';
import { Cart } from '../cart/cart';

export const cart = () => {
  const fragment = $(new DocumentFragment());

  let cartCookie = new Cart
  let divBig=$('<div class="container"></div>')
  let info=$('<div id="RegistrationInfo" ></div>')
  let h2=$('<h2  class="fontColor">Koszyk:</h2>')
  //let sum=$('<div></div>')


  // let ert=cartCookie.get()
  let getContent=cartCookie.get()[0]
  let StringInArr=getContent?getContent:"Reservation/Brak rezerwacji."
  console.log("cartcpokie:", StringInArr)
  
  //let w = cartCookie.get()[0].split('Reservation/')
  let w = StringInArr.split('Reservation/')
  console.log("w: " , w)
  let addId = w.map(elem => {
    //console.log("key "+this.key)
    let id = Math.random().toString(36).substr(2, 9)
   
    //console.log("id + elem " + id + "/" + elem)
    return id + "/" + elem
  })
  let c = addId.slice(2)////////////////////////////////////
  console.log("c: " + c)
  let arr = c.map(e => {
    e.split("/")
    return e
  })
  //console.log(arr)
  let toDelete = (item) => {
    let arrToDelete = arr.find(e => {
      return e.startsWith(item)
    })
    // console.log("arr z toDelete ", arr)
    // console.log("arrtoDelete ", arrToDelete)
    let newArr = []
    for (const i of arr) {
      console.log("i " + i)
      if (i != arrToDelete) {
        //console.log("do skasowania: " + i)
        //alert("Usunąłeś produkt: "+i.split("/"))
        newArr.push(i)
      }

    }
    //console.log(newArr, " startwith; ")
    let newArr2 = ['Reservation/']
    newArr.map(e => {
      let item = e.split("/")
      //item[0]="Reservation:"
      item.shift()
      item.unshift('Reservation')
      let it2 = item.join("/")
      //console.log("sdf: ", it2)
      newArr2.push(it2)
    })
    //console.log("newAr2  ", newArr2.join(""))
    cartCookie.set([newArr2.join("")])
    arr = newArr
    return arrToDelete
  }

  let ul = $('<ul ></ul>')
 
  let toPay=[]
  let li = arr.map(elem => {
    
    let content = elem.split("/")
    let typeOfSubject=content[1].startsWith("Pokój")
    console.log("elem: " , typeOfSubject,content[4])
    let daysDifference=1
    if(typeOfSubject){
    daysDifference=Math.ceil(Math.abs(new Date(content[3]).getTime()-new Date(content[2]).getTime()))/(1000 * 3600 * 24)
    toPay.push(content[4]*daysDifference)}else{
    toPay.push(parseInt(content[4]))}
    //console.log("cont różnica: " , daysDifference)
    let button = $('<button class="btn btn-secondary">Usuń</button>')
    button.on("click", () => {
      console.log("Onclick: " + $(`li[id="${content[0]}"]`).val())
      $(`li[id="${content[0]}"]`).fadeOut(500)
      console.log(sum)
      if(typeOfSubject){
      sum=sum-(content[4]*daysDifference)}else{
      sum=sum-content[4]}
      $(`div[id="sum"]`).text("Razem: "+sum+" zł")
      toDelete(content[0])
    })
    let li1
    if(typeOfSubject){
    li1 = $(`<li class="align-middle lista" id=${content[0]}>${content[1]} od ${content[2]} do ${content[3]}, cena: ${content[4]} zł/doba, ilość dób: ${daysDifference}, do zapłaty: `+content[4]*daysDifference +' zł </li>'
          )}
          else{
    li1 = $(`<li class="align-middle lista" id=${content[0]}>Voucher: ${content[1]}, cześć ciała: ${content[2]}, czas: ${content[3]} minut, cena: `+parseInt(content[4])+' zł</li>')}
    li1.append(button)
    return li1
  })
  ul.append(li)
  //divBig.append(h2,ul)
  //console.log("li: " + li)

  let sum = 0;
  toPay.forEach(e=> {
    sum += e;
    //console.log("sum: ",sum)
  })

  let sumDisplay=$(`<div  id="sum">Razem: ${sum} zł</div>`)
  divBig.append(info,h2,ul,sumDisplay)
//console.log(sum)
  fragment
    //.append('<h2>Koszyk:</h2>')
    //.append(`<ul>${li.join("")}</ul>`)
    .append(divBig)
    //.append(`<div id="sum">${sum} zł</div>`)
  //.append(li.map(elem => { console.log(room); return room }))
  //.append('<p>get: '+cartCookie.get()+'</p>')
  // .append('<hr><p>cookie: '+cartCookie.cookie()+'</p>')
  // .append(cartCookie.get()+'<p>Lorem ipsum dolor sit amet...</p>');

  return Promise.resolve(fragment);
};