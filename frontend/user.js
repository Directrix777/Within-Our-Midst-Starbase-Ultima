class User
{
    constructor(name)
    {
        this.name = name
        this.alive = true
        this.dbVersion = this.makeDbVersion()
    }

    makeDbVersion()
    {
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({name: this.name})
        }
        return fetch('http://localhost:3000/users/', options)
        .then(r => r.json)
        .then(r => console.log(r))
    }


}