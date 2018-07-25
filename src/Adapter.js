const URL="http://localhost:4000/"
const WordUrl = "http://localhost:4000/api/v1/"

// words, long, hard


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

    static getUser(id, token){
        let config ={
            method: 'POST', 
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': token
            },
            
        }
        return fetch(`${URL}users/${id}`, config)
    }


    static postGame(id, points){
        let config ={
            method: 'POST', 
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                user_id: id,
                points: points
            })
        }
        return fetch(`${URL}games/`, config)
    }

    static getWord(choice){
        return fetch(`${WordUrl}${choice}`)
    }

}

export default Adapter;