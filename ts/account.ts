import { LoginService } from "./loginService";

export class Account {

  private loginService : LoginService  = new LoginService();
  
   public login(username: string, password: string) {
    
    this.loginService.login(username, password).then(canLogin => {
    
      if (canLogin == true) {

        var x = document.getElementById("login-screen") as HTMLDivElement;
        x.style.display = "none";

      } else {
        alert("Kullanıcı adı veya şifre hatalı!");
      }
    });
  }

}
