import $ from 'jquery';
import { service } from '../common/service';
// export const treatments = () => {
//   const fragment = $(new DocumentFragment());

//   fragment
//     .append('<h2>Treatments</h2>')
//     .append('<p>Lorem ipsum dolor sit amet...</p>');

//   return fragment;
// };

export const treatments = () => {
  const fragment = $(new DocumentFragment());

  return service.getRooms("treatments").then(res => {
    let treatments=res.map(treatment=>{
      return `<p>${treatment.name}</p>`
    })
    //console.log(treatments.join(""))


    return fragment
    .append('<h2>treatments</h2>')
    .append(treatments.join(""))
    //.append(pokoje.map(pok=>{return `<p>${pok.name}</p>`}))
    .append('<p>Lorem ipsum dolor sit amet...</p>');
  }).catch(er=>{
    return fragment
    .append('<h2>Wystąpiły problemy z połączeniem. Prosimy spróbować później</h2>')
    
  })
};