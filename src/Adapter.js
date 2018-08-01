const URL="http://localhost:4000/"
const WordUrl = "http://localhost:4000/api/v1/"
const GAMETOP5 = "http://localhost:4000/games/top"

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
        console.log(user_obj)
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


    static postGame(id, points, type="math"){
        let config ={
            method: 'POST', 
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                user_id: id,
                points,
                type
            })
        }
        return fetch(`${URL}games/`, config)
    }

    static postMulti(data){
        let config ={
            method: 'POST', 
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                ...data,
                user_id: data.winner, 
                type:"multi"
            })
        }
        return fetch(`${URL}games/`, config)
    }

    static patchWord(id, word){
        let config ={
            method: 'PATCH', 
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({
                word,                
            })
        }
        return fetch(`${URL}users/${id}`, config)
    }


    static getUserWords(id, token){
        let config ={
            headers: {
                'Content-Type': 'application/JSON',
                'Authorization': token
            },
        }
        return fetch(`${URL}users/${id}`, config)
    }

    static getTop5(){
        return fetch(GAMETOP5)
    }


    static getWord(choice){
        return fetch(`${WordUrl}${choice}`)
    }

}

export default Adapter;