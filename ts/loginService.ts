
export class LoginService {
    login(username: string, password: string): Promise<boolean>{
        
        // todo POST işlemi yapacak responsu return edecek ("POST: /login: boolean)
       
        // let xhr = new XMLHttpRequest();
        // xhr.open('POST','https://localhost:44333/login',false);
        // xhr.send(JSON.stringify({username, password}));
        // return JSON.parse(xhr.responseText);

        return fetch('https://localhost:44333/login', {
            method: 'POST',
            body: JSON.stringify({username, password}),
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(r => r.json());
    }
}