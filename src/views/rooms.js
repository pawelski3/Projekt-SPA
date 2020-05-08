import $ from 'jquery';
import { service } from '../common/service';

export const rooms = () => {
  const fragment = $(new DocumentFragment());
 
  return service.getRooms("rooms")
 
  .then(res => {
    let rooms = res.map(room => {

      return `<p id="${room.name}">${room.name}</p>`
    })
  
    return fragment
  
      .append('<h2>Pokoje</h2>')
      .append(rooms.map(room => { return room}))
      // .append($(`#Pokój trójkowy`).on("click", function(){
      //   alert("The paragraph was clicked.");
      // }))
      .append('<p>Lorem ipsum dolor sit amet...</p>');
  }).catch(er => {
    return fragment
      .append('<h2>Wystąpiły problemy z połączeniem. Prosimy spróbować później</h2>')
  })

  
};

