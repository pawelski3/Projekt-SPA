import $ from 'jquery';
import { registrationService } from '../registration/registration';
import { checkPasswordStregth } from '../registration/passwordComplexity';

export const registration = () => {
    
   
    //const fragment = $(new DocumentFragment());

    const fragment=`<div>
    <form class="form-signin">
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label for="inputName" class="sr-only">Imię</label>
    <input type="text" id="inputName" class="form-control" placeholder="Imię" required autofocus>
    <label for="inputSurname" class="sr-only">Nazwisko</label>
    <input type="text" id="inputSurname" class="form-control" placeholder="Nazwisko" required autofocus>
    
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
    <label for="inputPassword" class="sr-only">Password</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
    <progress id="passwordComplexity" value="0"></progress>
    <div id="RegistrationInfo" ></div>
    <button id="btnReg" class="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
    
   
  </form>
  
  </div>
  `
$("main").empty().append(fragment) 

// $("#btnReg").on("click",function() {
//     alert( $( this ).text() );
//   });





  $("#btnReg").on("click",function(e) {
        registrationService.przycisk(e) 
      });

$("#inputPassword").on('keyup',function() {
    checkPasswordStregth($("#inputPassword").val())
      });


const fragment1="<hr>"

    const data = {
        "id": 9,
        "name": "Mia",
        "surname": "Doe",
        "email": "MDoe@as.en",
        "registration date": "5.04.2020"
    }

    return Promise.resolve(fragment1)
    const registr=registrationService.saveUser(data)
        .then(res => {
            
            console.log("regiservis")
            //registrationService.przycisk()
            return fragment1
                //.append(res + '<h2>Dodano użytkownika</h2>')
               

        })
        .catch(er => {
            return fragment1
                //.append(er +'<h2>Wystąpiły problemy z połączeniem. Prosimy spróbować później</h2>')
        })


};