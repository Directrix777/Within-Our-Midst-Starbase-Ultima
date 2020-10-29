class User
{
    constructor(name, pubId, color = '', alreadyInDb = false)
    {
        this.name = name
        this.alive = true
        this.pubId = pubId
        if(!alreadyInDb)
        {
            this.makeDbVersion()
        }
        else
        {
            this.moreVariableSetup(color)
        }
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

    static async takeDbVersion(pubId)
    {
        let attributes = await fetch(`http://localhost:3000/users/${pubId}`)
        .then(r => r.json())
        .then(r => {return [r['name'], pubId, r['color']]})
        return new User(attributes[0], attributes[1], attributes[2], true)
    }

    breakDbVersion()
    {
        let options = {
            method: 'DELETE',
        }
        fetch(`http://localhost:3000/users/${this.pubId}`, options)
        .then(r => r.json())
        .then(r => console.log(r))

    }





}