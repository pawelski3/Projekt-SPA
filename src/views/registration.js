import $ from 'jquery';
import { registrationService } from '../registration/registration';
import { checkPasswordStregth } from '../registration/passwordComplexity';
import icon from "../images/treatments/two_persons.jpg"

export const registration = () => {
  
  //$('main').css('background-image',"url('images/treatments/two_persons.jpg')") 
  //$('main').attr('style','background-image: url("'+icon+'")') 
  $('main').height(600)
    const fragment = $(new DocumentFragment());

    const div=$('<div id="registration" class="col-lg-4 col-md-6 mb-4"></div>')
    const info=$('<div id="RegistrationInfo" ></div>')
    const form=$('<form class="form-signin"></form>')
    const part1=$(`
    <h1 class="h3 mb-3 font-weight-normal fontColor">Zarejestruj się</h1>
   
    <label for="inputName" class="sr-only">Imię</label>
    <input type="text" id="inputName" class="form-control" placeholder="Imię"  >
    <label for="inputSurname" class="sr-only">Nazwisko</label>
    <input type="text" id="inputSurname" class="form-control" placeholder="Nazwisko" >
    
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" >
    
    `)
    //<label for="inputPassword" class="sr-only">Password</label>
    const input=$('<input type="password" id="inputPassword" class="form-control" placeholder="Password">')
    const progress=$('<progress id="passwordComplexity" value="0"></progress>')
    
    const button=$('<button id="btnReg" class="btn btn-lg btn-primary btn-block" type="submit">Wyślij</button>')



//$("main").append(fragment) 

// $("#btnReg").on("click",function() {
//     alert( $( this ).text() );
//   });

  button.on("click",function(e) {
        registrationService.przycisk(e) 
      });

input.on('keyup',function() {
    checkPasswordStregth($('input[id="inputPassword"]').val())
      });

      //part1.append(input,progress,button)
      
      form.append(part1,input,progress,button)
      div.append(info,form)
      //fragment.append(form)
      return Promise.resolve(fragment.append(div))
//const fragment1="<hr>"

    // const data = {
    //     "id": 9,
    //     "name": "Mia",
    //     "surname": "Doe",
    //     "email": "MDoe@as.en",
    //     "registration date": "5.04.2020"
    // }

    // return Promise.resolve(fragment1)
    // const registr=registrationService.saveUser(data)
    //     .then(res => {
            
    //         console.log("regiservis")
    //         //registrationService.przycisk()
    //         return fragment1
    //             //.append(res + '<h2>Dodano użytkownika</h2>')
               

    //     })
    //     .catch(er => {
    //         return fragment1
    //             //.append(er +'<h2>Wystąpiły problemy z połączeniem. Prosimy spróbować później</h2>')
    //     })


};