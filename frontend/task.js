class Task
{
    constructor(userId)
    {
        this.userId = userId
        this.name = this.randomTask()
        this.done = false
    }

    randomTask()
    {
        const taskNames = ['Dropship: Chart Course', 'Courtyard: Monitor Tree', 'O2: Clean O2 Filter', 'Greenhouse: Clean O2 Filter', 'Laboratory: Record Temperature', 'Reactor: Unlock Manifolds', 'Storage: Store Artifacts', 'Laboratory: Assemble Artifact', 'Cafeteria: Buy Beverage', 'Admin: Prime Shields', 'Navigation: Stabilize Steering', 'Navigation: Chart Course', 'O2: Fill Canisters', 'Navigation: Clear Asteroids', 'Hangar: Run Diagnostics']
        const num = parseInt(Math.random() * 15)
        return taskNames[num]
    }

    makeDbVersion()
    {
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify({task_name: this.name, user_id: this.userId})
        }
        fetch('http://localhost:3000/tasks', options)
        .then(r => r.json())
        .then(r => {
            this.id = r['id'] 
            console.log(r)
        })
    }

    breakDbVersion()
    {
        let options = {
            method: 'DELETE',
        }
        fetch(`http://localhost:3000/tasks/${this.id}`, options)
        .then(r => r.json())
        .then(r => console.log(r))
    }

}