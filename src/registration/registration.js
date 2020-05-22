import $ from 'jquery';
import { checkPasswordStregth } from './passwordComplexity';

var loginName = ""
export const registrationService = {

    getUsers(parametr) {
        // pobiera liste wszystkich pokoi
        //console.log("json rooms  " + parametr)
        return fetch(`http://localhost:3000/${parametr}`)
            .then(response => response.json());
    },

    saveUser(data) {
        // const data = {
        //     "id": 1,
        //     "name": "Janek3",
        //     "surname": "kos",
        //     "email":"Janek@wp.pl",
        //     "registration date":"4.03.2020"

        // }
        return fetch("http://localhost:3000/users", {
            method: "post",
            headers: {
                "Content-Type": "application/json" //lub używając powyższej opisanego Headers()
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log("Dodałem użytkownika:");
                console.log(res);

            })


    },

    przycisk(e) {
        // $("#btnReg").click(function() {
        //     alert( "Handler for .click() called." );
        //   });
        e.preventDefault()
        $('#RegistrationInfo').empty()
        //document.getElementById('c2').innerHTML = "funkcja registruj"
        // addEventListener('click', function () {
        //     alert("button")
        //     })
        let name = $('#inputName').val()
        let surname = $('#inputSurname').val()
        let email = $('#inputEmail').val()
        let password = $('#inputPassword').val()

        console.log(name, surname, email, password.length)

        // if ((password.length > 5) && (checkEmail)) { console.log("pass ok") }

        // if (password.length < 6) {
        //     $('#RegistrationInfo').append("<p>Hasło jest za krótkie</p>")
        // }
        // if (checkEmail) {
        //     console.log("check")
        //     $('#RegistrationInfo').append("<p>Podany email już istnieje</p>")
        // }

        //console.log("chck em; " + checkEmail)
        this.getUsers("users").then(res => {
            //console.log("z checka " + res[res.length-1].id)
            let check = false
            let orderNumber = res[res.length - 1].id
            var utc = new Date()
            console.log("z checka " + utc)


            res.map(item => {
                if (item.email === email) {
                    console.log("równy " + item.email)
                    check = item.email
                }
            })
            console.log("check " + check)
            if ((!name) || (!surname) || (!email)) { $('#RegistrationInfo').text('Podaj prawidłowe dane');return }
            if (!this.emailVerfication(email)) { $('#RegistrationInfo').text("Podaj prawidłowy email");return }
            if ((password.length > 5) && (!check) && name && surname) {
                console.log("pass ok");
                $("#form").fadeOut(200)
                    
                const data = {
                    "id": orderNumber + 1,
                    "name": name,
                    "surname": surname,
                    "email": email,
                    "password": password.concat(this.getHash()),
                    "registration_date": this.getDate()
                }
                const div=$("<div></div>")
                //$("#RegistrationInfo").fadeOut(200)
                $("#RegistrationInfo").text(`Dziękujęmy za rejestrację ${data.name} ${data.surname}`)
                $('#inputName').val("")
                $('#inputSurname').val("")
                $('#inputEmail').val("")
                $('#inputPassword').val("")
               
                $('#passwordComplexity').val(0)
                this.saveUser(data)
                //e.preventDefault()
            }
            
            //if (!this.emailVerfication(email)) { $('#RegistrationInfo').append("<p>Podaj prawidłowy email</p>") }
            if (password.length < 6) {
                $('#RegistrationInfo').text("Hasło powinno zawierać minimum 6 znaków")
            }
            if (check) {
                console.log("check")
                $('#RegistrationInfo').text("Podany email już istnieje")
            }

        })
            .catch(er => {
                console.log(er)
            })

    },

    getDate() {
        let utc = new Date().toJSON().slice(0, 10).replace(/-/g, '-');
        return utc
    },

    getHash() {
        return Math.random().toString(36).substr(2, 9)
    },


    setloginName(name) {
        loginName = name
    },

    getloginName() {
        return loginName
    },

    emailVerfication(email) {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            return (true)
        }
        return (false)
    }

};
