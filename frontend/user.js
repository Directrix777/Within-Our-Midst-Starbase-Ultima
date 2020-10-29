class User
{
    constructor(name, pubId)
    {
        this.name = name
        this.alive = true
        this.pubId = pubId
        this.makeDbVersion()
    }

    moreVariableSetup(color)
    {
        this.color = color
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
        .then(r => r.json())
        .then(r => { 
            this.moreVariableSetup(r['color'])
        })
    }

    takeDbVersion()
    {
        let options = {
            method: 'DELETE',
        }
        fetch(`http://localhost:3000/users/${this.pubId}`, options)
        .then(r => r.json())
        .then(r => console.log(r))

    }





}