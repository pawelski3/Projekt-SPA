import $ from 'jquery';

// spodziewamy sie funkcji click, ktora bedzie wywolywana przez element anchor
// chcemy, aby klikniecie w element anchor powodowalo nawigacje do innej sciezki
export const navItem = (text, click) => {
  const navItem = $('<li class="nav-item active"></li>');
  const anchor = $('<a class="btn btn-link text-light"></a>');
  //console.log("click= "+click);
  anchor.text(text).on('click', click);

document.crea

  navItem.append(anchor);

  return navItem;
};
