import $ from 'jquery';
import style from "./style/style.scss"
import icon from "./images/nikon.jpg"
import { Router } from './router/router';
import { nav } from './navigation/nav';




const main = $('main');

const router = new Router();
router.mount(main);
router.init()
main.before(nav());
