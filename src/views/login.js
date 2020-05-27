import $ from 'jquery';
import { registrationService } from '../registration/registration';
import { checkPasswordStregth } from '../registration/passwordComplexity';

export const login = () => {

    //$('main').attr('style','background-image: url("'+icon+'")') 
    $('main').height(750)
    const fragment = $(new DocumentFragment());

    const div = $('<div></div>')
    const info = $('<div id="RegistrationInfo"></div>')
    const form = $('<form id="form" class="form-signin"></form>')
    const part1 = $(`
    <h1 class="h3 mb-3 font-weight-bold fontColor">Zaloguj się</h1>
   
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
    <label for="inputPassword" class="sr-only">Email address</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
    `)

    const button = $('<button id="btnReg" class="btn btn-lg btn-primary btn-block" type="submit">Wyślij</button>')

    button.on("click", function (e) {
        e.preventDefault()
        if (!($("#inputEmail").val()) && (!($("#inputPassword").val()))) { $("#RegistrationInfo").text("Podaj email i hasło"); return 0 }
        let email = $("#inputEmail").val()
        let pass = $("#inputPassword").val()
        registrationService.getUsers("users").then(res => {
            let search = res.map(user => {
                if (user.email == email && user.password.slice((user.password - 1), -9) == pass) {
                    registrationService.setloginName(user.name + " " + user.surname)
                    $('nav>ul>li:nth-child(5) a').text('Zalogowany: ' + registrationService.getloginName().toUpperCase())
                    $("#form").fadeOut(50)
                    $("#RegistrationInfo").fadeOut(200)
                    div.append(logout)
                }
                else { $("#RegistrationInfo").text("Nieprawidłowe dane") }
            })
        })
    });

    const logout = $('<button id="logout" class="btn btn-lg btn-primary btn-block" type="submit">Wyloguj się</button>')
    logout.on("click", function () {
        registrationService.setloginName("")
        $('nav>ul>li:nth-child(5) a').text('Login')
    })



    if (registrationService.getloginName()) {
        div.append(logout)
    } else {
        form.append(part1, button)
        div.append(info, form)
    }
    return Promise.resolve(fragment.append(div))
};