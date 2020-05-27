import $ from 'jquery';
import { registrationService } from '../registration/registration';
import { checkPasswordStregth } from '../registration/passwordComplexity';
//import icon from "../images/treatments/two_persons.jpg"

export const registration = () => {

  $('main').height(750)
  const fragment = $(new DocumentFragment());

  const div = $('<div id="registration" class="col-lg-4 col-md-6 mb-4"></div>')
  const info = $('<div id="RegistrationInfo" ></div>')
  const form = $('<form class="form-signin"></form>')
  const part1 = $(`
    <h1 class="h3 mb-3 font-weight-bold fontColor">Zarejestruj się</h1>
   
    <label for="inputName" class="sr-only">Imię</label>
    <input type="text" id="inputName" class="form-control" placeholder="Imię"  >
    <label for="inputSurname" class="sr-only">Nazwisko</label>
    <input type="text" id="inputSurname" class="form-control" placeholder="Nazwisko" >
    
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" >
    
    `)
  const input = $('<input type="password" id="inputPassword" class="form-control" placeholder="Password">')
  const progress = $('<progress id="passwordComplexity" value="0"></progress>')

  const button = $('<button id="btnReg" class="btn btn-lg btn-primary btn-block" type="submit">Wyślij</button>')

  button.on("click", function (e) {
    registrationService.przycisk(e)
  });

  input.on('keyup', function () {
    checkPasswordStregth($('input[id="inputPassword"]').val())
  });

  form.append(part1, input, progress, button)
  div.append(info, form)
  //fragment.append(form)
  return Promise.resolve(fragment.append(div))

};