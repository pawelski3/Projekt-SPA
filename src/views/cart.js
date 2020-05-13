import $ from 'jquery';
//import { service } from '../common/service';
import { Cart } from '../cart/cart';

export const cart = () => {
  const fragment = $(new DocumentFragment());

  let cartCookie=new Cart
  //cartCookie.set("Zamówienie nr 1")
// service.setCookie("fgfgf","iii8i",6)
// service.setCookie("nnnnn","gggggi",6)
  fragment
    .append('<h2>Koszyk</h2>')
    .append('<p>get: '+cartCookie.get()+'</p>')
    .append('<p>cookie: '+cartCookie.cookie()+'</p>')
    .append(cartCookie.get()+'<p>Lorem ipsum dolor sit amet...</p>');

    return Promise.resolve(fragment);
};