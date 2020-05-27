import $ from 'jquery';
import { service } from '../common/service';
import { Cart } from '../cart/cart';
import { registrationService } from '../registration/registration';
import icon from "../images/treatments/two_persons.jpg"

export const treatments = () => {
  const fragment = $(new DocumentFragment());
  let cartCookie = new Cart
  let login=registrationService.getloginName()
  
  $('main').height(1320)
  let cartCookieContent = () => {
    if (cartCookie.get()[0]) {
      return cartCookie.get()[0]
    } else { return "Reservation/" }
  }
  return service.getRooms("treatments").then(res => {
    let treatments=res.map(treatment=>{
      let numbersOfTreatments=res.length
      let divBig = $('<div class="col-lg-4 col-md-6 mb-4"></div>')
      let div = $('<div class="card-body"></div>')
      let h4 = $(`<h4 class="card-title">${treatment.name}</h4>`)
      let availability = $(`<div class="justify-content-center"></div>`)
      let description = $(`<p class="card-text">Część ciała: ${treatment.area}, czas: ${treatment.time} minut, cena: ${treatment.price} zł</p>`)
      let image=$(`<img class="card-img-top" src=${icon} alt="">`)
      let button=""
      if(login){button = $('<button class="btn btn-secondary">Rezerwuj</button>')
      availability.append("<h6>Dostępny</h6>")
    }
        else
        {
          if(numbersOfTreatments%treatment.id==0){
            button = $('<button class="btn btn-secondary" disabled>Rezerwuj</button>')
            availability.append("<h6>Oferta promocyjna tylko dla zalogowanych użytkowników</h6>")
          }else {button = $('<button class="btn btn-secondary">Rezerwuj</button>')
          availability.append("<h6>Dostępny</h6>")
        }
        }
          
      button.on("click", () => {
          alert(`Zarezerwowałeś: ${treatment.name} `)
          cartCookie.set([cartCookieContent() + `Reservation/${treatment.name}/` + treatment.area + "/" + treatment.time+ "/" + treatment.price])
      })
      div.append(h4,availability,description,image,button)
     
      return divBig.append(div)
    })
 
    return fragment
    .append(treatments.map(treatment => { return treatment }))
  }).catch(er=>{
    return fragment
    .append('<h2>Wystąpiły problemy z połączeniem. Prosimy spróbować później</h2>')
  })
};