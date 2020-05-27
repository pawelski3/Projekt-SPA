import $ from 'jquery';
import icon from "../images/crew.png"
import homeImg from "../images/home.jpg"

export const home = () => {
  const fragment = $(new DocumentFragment());
  $('main').height(750)
  const div=$('<div></div>')
  const h2=$('<h2 class="fontColor">IT SPA</h2>')
  const divFlex=$('<div class="divFlex"></div>')
  const h3=$('<h4 class="card-title">O nas</h4>')
  const image=$(`<img class="card-img-top" src=${homeImg} alt="">`)
  const textContainer=$('<div></div>')
  const text=$('<p>Ponad czterdziestolenia obecność na rynku zarówno w branży wellness jak i produkcji złośliwego oprogramowania sprawia, że nasza oferta oraz poziom realizacji jest bardzo wysoki. Przepiękna lokalizacja obiektu, zaledwie 600 metrów od sklepu z używanymi komputerami, powoduje, że nasz obiekt to idealne miejsce na wakacje jak i zwykłe popłudnie.</p>')
  textContainer.append(h3,text)
  divFlex.append(textContainer,image)
  const divFlex1=$('<div class="divFlex"></div>')
  const h31=$('<h4 class="card-title">Nasz zespół</h4>')
  const image1=$(`<img class="card-img-top" src=${icon} alt="">`)
  const textContainer1=$('<div></div>')
  const text1=$('<p>Nasz zespół stanowi doświadczona kadra. Nasi specjaliści zdobywali doświadczenie zarówno w ośrodkach krajowych jak i zagranicznych. Wielu z nich uczestniczyło w szkoleniach, organizowanych przez renomowanych instruktorów.</p>')
  textContainer1.append(h31,text1)
  divFlex1.append(image1,textContainer1)
  
  div.append(h2,divFlex,divFlex1)

  fragment
    .append(div)
    return Promise.resolve(fragment);
};
