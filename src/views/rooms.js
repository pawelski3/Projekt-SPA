import $ from 'jquery';
import { service } from '../common/service';
import { Cart } from '../cart/cart';

export const rooms = () => {
  const fragment = $(new DocumentFragment());
  let cartCookie = new Cart

  let cartCookieContent = () => {
    return cartCookie.get()
  }
  console.log(cartCookieContent)
  return service.getRooms("rooms")


    .then(res => {
      let rooms = res.map(room => {
        let div = $("<div></div>")
        let h4 = $(`<h4>${room.name}</h4>`)
        let description = $(`<p>Liczba łóżek: ${room.beds}, ilość osób: ${room.guests}, cena: ${room.price}</p>`)
        let arrival = $(`<label>Data przyjazdu: <input type="date" id="${room.name}Arrival" min="${service.getDate()}" value="${service.getDate()}"></label>`)
        let departure = $(`<label>Data wyjazdu: <input type="date" id="${room.name}Departure"></label>`)
        let button = $("<br><button>Rezerwuj</button>")
        button.on("click", () => {
          alert(`Zarezerwowałeś: ${room.name} od ` + $(`${room.name}Arrival`).val() + " do " + $(`${room.name}Departure`).val())
        })

        return div.append(h4, description, arrival, departure, button)
      })


      return fragment

        .append('<h2>Pokoje</h2>')
        .append(rooms.map(room => { console.log(room); return room }))
        // .append($(`#Pokój trójkowy`).on("click", function(){
        //   alert("The paragraph was clicked.");
        // }))
        .append('<p>Lorem ipsum dolor sit amet...</p>');
    }).catch(er => {
      return fragment
        .append('<h2>Wystąpiły problemy z połączeniem. Prosimy spróbować później</h2>')
    })


};

