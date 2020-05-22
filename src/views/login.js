import $ from 'jquery';
import { registrationService } from '../registration/registration';
import { checkPasswordStregth } from '../registration/passwordComplexity';
import icon from "../images/treatments/staff.jpg"

export const login = () => {
    
    //$('main').attr('style','background-image: url("'+icon+'")') 
    $('main').height(600)
    const fragment = $(new DocumentFragment());
    
    const div=$('<div></div>')
    const info=$('<div id="RegistrationInfo"></div>')
    const form=$('<form id="form" class="form-signin"></form>')
    const part1=$(`
    <h1 class="h3 mb-3 font-weight-normal fontColor">Zaloguj się</h1>
   
    <label for="inputEmail" class="sr-only">Email address</label>
    <input type="email" id="inputEmail" class="form-control" placeholder="Email address" required autofocus>
    <label for="inputPassword" class="sr-only">Email address</label>
    <input type="password" id="inputPassword" class="form-control" placeholder="Password" required>
    `)
    //<label for="inputPassword" class="sr-only">Password</label>
    //const input=$('<input type="password" id="inputPassword" class="form-control" placeholder="Password" required>')
    //const progress=$('<progress id="passwordComplexity" value="0"></progress>')
    
    const button=$('<button id="btnReg" class="btn btn-lg btn-primary btn-block" type="submit">Wyślij</button>')

    button.on("click",function(e) {
        e.preventDefault()
        if(!($("#inputEmail").val())&&(!($("#inputPassword").val()))){$("#RegistrationInfo").text("Podaj email i hasło");return 0}
        console.log($("#inputEmail").val(),$("#inputPassword").val()) 
        let email=$("#inputEmail").val()
        let pass=$("#inputPassword").val()
        registrationService.getUsers("users").then(res=>{
            console.log(res)
            let search=res.map(user=>{
                console.log(user.name)
                if (user.email==email && user.password.slice((user.password-1),-9)==pass){
                    registrationService.setloginName(user.name+" "+user.surname)
                    //let loginName=toUpperCase(registrationService.getloginName())
                    $('nav>ul>li:last-child a').text('Zalogowany: ' +registrationService.getloginName().toUpperCase())
                    console.log("user zalogowany: "+registrationService.getloginName());
                    //console.log("empty login1")
                    //console.log("reg info "+$("#RegistrationInfo").val())
                    $("#form").fadeOut(50)
                    $("#RegistrationInfo").fadeOut(200)
                    //console.log("empty login2")
                    // $('#RegistrationInfo').text("dfg")
                    // $('#RegistrationInfo').text("Hasło powinno zawierać minimum 6 znaków")
                    div.append(logout)

                    //return user
                }
                else{$("#RegistrationInfo").text("Nieprawidłowe dane")} 
                //user.find(item => console.log(item))
            })

            
        })
      });


      const logout=$('<button id="logout" class="btn btn-lg btn-primary btn-block" type="submit">Wyloguj się</button>')  
      logout.on("click",function(){
        registrationService.setloginName("")
        $('nav>ul>li:last-child a').text('Login')
        //$("#p1").text("Dziękujęmy za wizytę. Zapraszamy ponownie.")
        
       
        console.log(registrationService.getloginName())
     
      })



if(registrationService.getloginName()){
    //div.append('<p id="p1">Witaj '+registrationService.getloginName()+". Miło nam gościć Cię ponownie na naszej stronie.</p>")
    //$("div").text('<p id="p1">Witaj '+registrationService.getloginName()+". Miło nam gościć Cię ponownie na naszej stronie.</p>")
    div.append(logout)
    //$("div").text('<p id="p1">Witaj '+registrationService.getloginName()+". Miło nam gościć Cię ponownie na naszej stronie.</p>")
    //console.log()
    // $("#form").fadeOut(500)
    // $("#p1").text("Witaj "+registrationService.getloginName()+". Miło nam gościć Cię ponownie na naszej stronie.")
}else{
      form.append(part1,button)
      div.append(info,form)}
      //fragment.append(form)
      return Promise.resolve(fragment.append(div))

};