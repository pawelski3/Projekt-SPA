import $ from 'jquery';


var loginName = ""
export const registrationService = {

    getUsers(parametr) {
        // pobiera liste wszystkich pokoi
        //console.log("json rooms  " + parametr)
        return fetch(`http://localhost:3000/${parametr}`)
            .then(response => response.json());
    },

    saveUser(data) {
       
        return fetch("http://localhost:3000/users", {
            method: "post",
            headers: {
                "Content-Type": "application/json" //lub używając powyższej opisanego Headers()
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                
            })
    },

    przycisk(e) {
        e.preventDefault()
        $('#RegistrationInfo').empty()
        let name = $('#inputName').val()
        let surname = $('#inputSurname').val()
        let email = $('#inputEmail').val()
        let password = $('#inputPassword').val()
        this.getUsers("users").then(res => {
            let check = false
            let orderNumber = res[res.length - 1].id
            var utc = new Date()
            res.map(item => {
                if (item.email === email) {
                    check = item.email
                }
            })
            if ((!name) || (!surname) || (!email)) { $('#RegistrationInfo').text('Podaj prawidłowe dane');return }
            if (!this.emailVerfication(email)) { $('#RegistrationInfo').text("Podaj prawidłowy email");return }
            if ((password.length > 5) && (!check) && name && surname) {
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
                $("#RegistrationInfo").text(`Dziękujęmy za rejestrację ${data.name} ${data.surname}`)
                $('#inputName').val("")
                $('#inputSurname').val("")
                $('#inputEmail').val("")
                $('#inputPassword').val("")
                $('#passwordComplexity').val(0)
                this.saveUser(data)
            }
            
            if (password.length < 6) {
                $('#RegistrationInfo').text("Hasło powinno zawierać minimum 6 znaków")
            }
            if (check) {
               
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
