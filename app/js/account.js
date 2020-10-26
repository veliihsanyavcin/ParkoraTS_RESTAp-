import "./index.html";
import "./style.css";
export class Account {
    constructor() {
        this._username = "1";
        this._password = "1";
    }
    login(username, password) {
        if (username === this._username && password === this._password) {
            var x = document.getElementById("login-screen");
            x.style.display = "none";
        }
        else {
            alert("Kullanıcı adı veya şifre hatalı!");
        }
    }
}
