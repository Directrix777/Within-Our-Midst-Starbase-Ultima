const pubID = parseInt(Math.random()*1000000)
console.log(pubID)
const pubnub = new PubNub({
    uuid: pubID,
    publish_key: 'pub-c-a2f1cf1d-ce28-4242-8e93-cf10ca8cbafe',
    subscribe_key: 'sub-c-44658cae-17a8-11eb-bc34-ce6fd967af95',
    ssl: true
});
const tasks = new PubNub({
    uuid: pubID,
    publish_key: 'pub-c-b1e91afd-fb2e-4e9c-b199-907f7512cbad',
    subscribe_key: 'sub-c-691174e4-17aa-11eb-a3e5-1aef4acbe547',
    ssl: true
})
let user = new User(prompt("Enter your player name"), pubID)
user.makeDbVersion().then(r => {
    user.assignTasks(6)
    listTasksOnMap(user.tasks)
    console.log(user)
})
pubnub.subscribe({channels: ["aliveChat"], withPresence: true});
let map = document.createElement('div')
map.className = 'map'
    let closeMap = document.createElement('button')
    closeMap.addEventListener('click', function(){map.style.display = 'none'})
    closeMap.innerText = "Close Map"
    closeMap.style.float = 'left'
    map.appendChild(closeMap)
    let myTaskElements = document.createElement('div')
    myTaskElements.className = 'tasks-card'
    map.appendChild(myTaskElements)
    map.appendChild(createRoomCard('Dropship', ['Dropship: Chart Course']))
    map.appendChild(createRoomCard('Navigation', ['Navigation: Stabilize Steering', 'Navigation: Chart Course', 'Navigation: Clear Asteroids']))
    map.appendChild(createRoomCard('Storage', ['Storage: Store Artifacts']))
    map.appendChild(createRoomCard('Laboratory', ['Laboratory: Record Temperature', 'Laboratory: Assemble Artifact']))
    map.appendChild(createRoomCard('Reactor', ['Reactor: Unlock Manifolds']))
    map.appendChild(createRoomCard('O2', ['O2: Fill Canisters', 'O2: Clean O2 Filter']))
    map.appendChild(createRoomCard('Greenhouse', ['Greenhouse: Clean O2 Filter']))
    map.appendChild(createRoomCard('Courtyard', ['Courtyard: Monitor Tree']))
    map.appendChild(createRoomCard('Cafeteria', ['Cafeteris: Buy Beverage']))
    map.appendChild(createRoomCard('Admin', ['Admin: Prime Shields']))
    map.appendChild(createRoomCard('Hangar', ['Hangar: Run Diagnostics']))

document.body.appendChild(map)
let leave = document.createElement('button')
leave.addEventListener('click', function(){user.breakDbVersion()})
leave.innerText = "Leave"
document.body.appendChild(leave)
let showMap = document.createElement('button')
showMap.addEventListener('click', function(){map.style.display = 'table'})
showMap.innerText = "Show Map"
document.body.appendChild(showMap)

function listTasksOnMap(taskList)
{
    taskList.forEach((task) => {
        let taskListing = document.createElement('p')
        taskListing.innerText = task.name
        myTaskElements.appendChild(taskListing)
    })
}

function createRoomCard(roomName, taskNames)
{
    let roomCard = document.createElement('div')
    roomCard.className = 'room-card'
    let roomHeader = document.createElement('h3')
    roomHeader.innerText = roomName
    roomCard.appendChild(roomHeader)
    taskNames.forEach((name) => {
        let taskListing = document.createElement('p')
        taskListing.innerText = name
            let finishTask = document.createElement('button')
            finishTask.innerText = "Do task"
            finishTask.addEventListener('click', function() {user.doTask(taskListing.innerText.slice(0, -7))})
            taskListing.appendChild(finishTask)
        roomCard.appendChild(taskListing)
    })
    return roomCard
}

pubnub.addListener({
    message: function(m) {
        // handle message

        let d = document.createElement('div')
        let name = document.createElement('h5')
        let p = document.createElement('p')
        let icon = document.createElement('img')
        icon.src = '../avatars/Player - Among Us/General/playerIcon.png'
        p.innerText = m.message
        p.style.overflow = 'hidden'
        
        if (m.publisher == pubnub.getUUID())
        {
            d.className = "my-message"
            name.innerText = user.name
            icon.className = `my-icon ${user.color}-icon`
        }
        else
        {
            d.className = "message"
            User.takeDbVersion(m.publisher).then(r => {
                name.innerText = r['name']
                icon.className = `icon ${r['color']}-icon`
            })
            
        }
        d.appendChild(icon)
        d.appendChild(name)
        d.appendChild(p)
        d.className = `${d.className} container-sm`
        document.body.appendChild(d)
    },
    presence: function(p) {
        // handle presence
        if(p.action == 'join')
        {
            console.log("Someone joined!")
            pubnub.hereNow(
                {
                  channels: ["aliveChat"],
                  includeState: true
                },
                function (status, response) {
                  console.log(status, response);
                })
        }

        let action = p.action; // Can be join, leave, state-change, or timeout
        let channelName = p.channel; // The channel to which the message was published
        let occupancy = p.occupancy; // No. of users subscribed to the channel
        let state = p.state; // User State
        let channelGroup = p.subscription; //  The channel group or wildcard subscription match (if exists)
        let publishTime = p.timestamp; // Publish timetoken
        let timetoken = p.timetoken;  // Current timetoken
        let uuid = p.uuid; // UUIDs of users who are subscribed to the channel
    }
});



function sendMessage(e, chatInput) {
    if (e.keyCode === 13  && !e.shiftKey) e.preventDefault();

    let focussed = chatInput.matches(':focus');
    if (focussed && e.keyCode === 13 && chatInput.value.length > 0) {
        let text = chatInput.value;
        pubnub.publish(
            {
              channel: "aliveChat",
              message: text,
            },
            function(status, response) {
              console.log(status);
              console.log(response);
            }
        )
        chatInput.value = '';
    }
}

// Add event listener for the textarea of the chat UI
let chatInput = document.querySelector('#content')
chatInput.addEventListener('keypress', (e) => {sendMessage(e, chatInput)});
