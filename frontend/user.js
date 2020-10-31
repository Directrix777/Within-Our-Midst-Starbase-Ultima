class User
{
    constructor(name, pubId, color = '', alreadyInDb = false)
    {
        this.tasks = []
        this.name = name
        this.alive = true
        this.pubId = pubId
        if(alreadyInDb)
        {
            this.color = color
        }
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
         return fetch('http://localhost:3000/users', options)
        .then(r => r.json())
        .then(r => { 
            this.id = r['id'] 
            this.color = r['color']
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
    
    assignTasks(number)
    {
        while(this.tasks.length < number)
        {
            let potentialNewTask = new Task(this.id)
            let taskNames = this.tasks.map(function(task) {return task.name})
            console.log(taskNames.includes(potentialNewTask.name))
            if(!taskNames.includes(potentialNewTask.name))
            {
                potentialNewTask.makeDbVersion()
                this.tasks.push(potentialNewTask)
            }
        }
        console.log(this.tasks)
    }

}