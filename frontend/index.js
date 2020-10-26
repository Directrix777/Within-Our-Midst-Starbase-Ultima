const newUUID = PubNub.generateUUID()
const pubnub = new PubNub({
    uuid: newUUID,
    publish_key: 'pub-c-b1e91afd-fb2e-4e9c-b199-907f7512cbad',
    subscribe_key: 'sub-c-691174e4-17aa-11eb-a3e5-1aef4acbe547',
    ssl: true
  });
  pubnub.subscribe({channels: ["aliveChat"]});
  pubnub.addListener({
    message: function(m) {
        // handle message

        let p = document.createElement('p')
        p.innerText = m.message
        document.body.appendChild(p)
    },
    presence: function(p) {
        // handle presence
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
              //sender: [an instance of a user]
              message: text
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