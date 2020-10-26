const newUUID = PubNub.generateUUID()
const aliveChat = new PubNub({
    uuid: newUUID,
    publish_key: 'pub-c-b1e91afd-fb2e-4e9c-b199-907f7512cbad',
    subscribe_key: 'sub-c-691174e4-17aa-11eb-a3e5-1aef4acbe547',
    ssl: true
  });