import $ from 'jquery';


export const home = () => {
  // $("#c1").click(function() {
  //   alert( "Handler for .click() called." );
  // });//text("sdsss")//on("click",alert("ddddd"))
  const fragment = $(new DocumentFragment());

  fragment
    .append('<h2>Home</h2>')
    .append('<p>Lorem ipsum dolor sit amet...</p>');

    return Promise.resolve(fragment);
};
