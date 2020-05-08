import $ from 'jquery';
import { routes } from './routes';
import { oops } from '../views';
import { routeChange } from './route-change';

export class Router {

  constructor() {
    this.body = $(document.body);
    this.outlet = $('main');
    this.routes = routes;
    console.log("constr")
    console.log("loc path const " + location.pathname)
  }

  mount(outlet) {
    this.outlet = outlet;

    // detail to, np. { path: '/booking' }
    this.body.on(routeChange, (event, detail) => {
      console.log("zmiana routa")
      this.navigate(detail.path);





    });

    // TODO: uzyj zdarzenia 'popstate', aby wyrenderowac odpowiednia
    // sciezke, gdy uzytkownik klika Wstecz (<-) lub Naprzod (->)
   
    window.addEventListener('popstate', e => {
      console.log(e + "loc path w popstate: " + location.pathname);

    //   //divs.forEach(v=>{document.getElementById(v.id).classList.remove('w2');})
    //   console.log("state id= " + e.state.id);
    this.navigate(location.pathname,null)
    //   // if (e.state.id){
    //   // document.getElementById(e.state.id).classList.toggle('w2');}


    })
  }



  init() {
    console.log("loc patname w init: " + location.pathname)
    this.navigate(location.pathname);
    var f = window.location.pathname
    // this.body.on(routeChange, (event, f) => {
    //   //this.navigate(detail.path);
    //   console.log("route change "+event)
    // this.navigate(f)
    // });
  }

  get(path) {
    //console.log(this.routes.find(route => route.path === path ))

    return this.routes.find(route => route.path === path);
  }

  has(path) {
    return this.get(path) !== undefined;
  }

  navigate(path, data = {}) {
    // sciezka istnieje, mozna nawigowac
    if (this.has(path)) {
      // // { path: '/booking', data: {}, component: booking }
      // const { component } = this.get(path);
      // console.log("Component: " + component)
      // //$('div').text(component)
      // this.outlet.empty().append(component);

 // { path: '/booking', data: {}, component: booking }
 const { component } = this.get(path);
      
 component()// dostaje Promise zaw. html widoku
   .then(html => {
     // renderuje ten html wew. outletu
     this.outlet.empty().append(html);
   })


    } else {
      console.log("navigate brak")
      this.outlet.empty().append(oops);
    }
    console.log(data)
    if(data){
    history.pushState(data, '', path);}

  }

  

}