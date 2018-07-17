const URL="http://localhost:4000/"

class Adapter {

    static postLogin(name, pw){
        let config ={
            method: 'POST', 
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({user_name: name, password: pw})
        }
        return fetch(`${URL}sessions/`, config)
    }

    static postSignUp(user_obj){
        let config ={
            method: 'POST', 
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify(user_obj)
        }
        return fetch(`${URL}users/`, config)
    }
}

export default Adapter;