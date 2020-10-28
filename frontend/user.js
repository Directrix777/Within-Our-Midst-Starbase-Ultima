const baseURL = 'http://localhost:3000'
const usersURL = `${baseURL}/users`

class User
{
    constructor(name, pubId)
    {
        this.name = name
        this.alive = true
        this.pubId = pubId
        console.log(this)
        this.makeDbVersion()
    }
    
    makeDbVersion()
    {
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({name: this.name, pubnub_id: this.pubId})
        }
        fetch('http://localhost:3000/users', options)
        .then(r => r.json)
        .then(r => console.log(r))
    }


}