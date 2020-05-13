import $ from 'jquery';
import { checkPasswordStregth } from './passwordComplexity';


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
        document.getElementById('c2').innerHTML = "funkcja registruj"
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
            let orderNumber=res[res.length-1].id
            var utc = new Date()
            console.log("z checka " +  utc)
            
            
            res.map(item => {
                if (item.email === email) {
                    console.log("równy " + item.email)
                    check = item.email
                }
            })
            console.log("check " + check)
            if ((password.length > 5) && (!check)&& name && surname) {
                console.log("pass ok");
                const data = {
                        "id": orderNumber+1,
                        "name": name,
                        "surname": surname,
                        "email":email,
                        "password":password.concat("zB"),
                        "registration date":this.getDate()}
                        this.saveUser(data)        
                //e.preventDefault()
            }
            if ((!name) || (!surname)||(!email)){$('#RegistrationInfo').append("<p>Podaj prawidłowe dane</p>")}
            if (password.length < 6) {
                $('#RegistrationInfo').append("<p>Hasło powinno zawierać minimum 6 znaków</p>")
            }
            if (check) {
                console.log("check")
                $('#RegistrationInfo').append("<p>Podany email już istnieje</p>")
            }

        })
            .catch(er => {
                console.log(er)
            })




    },

    getDate(){
        let utc = new Date().toJSON().slice(0,10).replace(/-/g,'-');
        return utc
    },

    // hashPassword(){
    //     let letters=['a','b','C','q','W','R','1','R','h','V','Q','b','4','8']
    //     Math.random(0-);
    // }

};
