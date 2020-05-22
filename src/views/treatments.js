import $ from 'jquery';
import { service } from '../common/service';
import { Cart } from '../cart/cart';
import { registrationService } from '../registration/registration';
import icon from "../images/treatments/two_persons.jpg"

export const treatments = () => {
  const fragment = $(new DocumentFragment());
  let cartCookie = new Cart
  let login=registrationService.getloginName()
  
  //$('main').attr('style','height: 1300px;') 
  $('main').height(1320)
  let cartCookieContent = () => {
    if (cartCookie.get()[0]) {
      return cartCookie.get()[0]
    } else { return "Reservation/" }
  }
  //class="col-lg-4 col-md-6 mb-4"
  return service.getRooms("treatments").then(res => {
    let treatments=res.map(treatment=>{
      let numbersOfTreatments=res.length
      let divBig = $('<div class="col-lg-4 col-md-6 mb-4"></div>')
      let div = $('<div class="card-body"></div>')
      let h4 = $(`<h4 class="card-title">${treatment.name}</h4>`)
      let availability = $(`<div class="justify-content-center"></div>`)
      let description = $(`<p class="card-text">Część ciała: ${treatment.area}, czas: ${treatment.time} minut, cena: ${treatment.price} zł</p>`)
      let image=$(`<img class="card-img-top" src=${icon} alt="">`)
      // let arrival = $(`<label>Data przyjazdu: <input type="date" id="${room.name}Arrival" min="${service.getDate()}" max="${yearPlus.toJSON().slice(0, 10).replace(/-/g, '-')}" value="${service.getDate()}"></label>`)
      // let departure = $(`<label>Data wyjazdu: <input type="date" id="${room.name}Departure" min="${service.getDate()}" max="${yearPlus.toJSON().slice(0, 10).replace(/-/g, '-')}"></label>`)
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
          
      
      //let button = $("<br><button>Rezerwuj</button>")
      button.on("click", () => {
        //if ($(`input[id="${room.name}Arrival"]`).val() && $(`input[id="${room.name}Departure"]`).val()) {
          alert(`Zarezerwowałeś: ${treatment.name} `)
          cartCookie.set([cartCookieContent() + `Reservation/${treatment.name}/` + treatment.area + "/" + treatment.time+ "/" + treatment.price])
        // }
        // else { alert("Wprowadź datę przyjazdu i odjazdu") }
      })
      div.append(h4,availability,description,image,button)
     
      return divBig.append(div)
    })
 


    return fragment
    //.append('<h2>treatments</h2>')
    //.append(treatments.join(""))
    .append(treatments.map(treatment => { console.log(treatment); return treatment }))
    //.append('<p>Lorem ipsum dolor sit amet...</p>');
  }).catch(er=>{
    return fragment
    .append('<h2>Wystąpiły problemy z połączeniem. Prosimy spróbować później</h2>')
    
  })
};