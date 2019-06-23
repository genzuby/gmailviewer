export const loadGmailApi = () => {
  window.gapi.client.load("gmail", "v1", displayInbox);
};

function displayInbox() {
  var request = window.gapi.client.gmail.users.messages.list({
    userId: "me",
    labelIds: "INBOX",
    maxResults: 10
  });

  console.log(request);
  request.execute(function(response) {
    console.log(response.messages);
    // $.each(response.messages, function() {
    //   var messageRequest = window.gapi.client.gmail.users.messages.get({
    //     'userId': 'me',
    //     'id': this.id
    //   });
    //   messageRequest.execute(appendMessageRow);
    // });

    // return response.messages.map(msg => {
    //   let messageRequest = window.gapi.client.gmail.users.messages.get({
    //     userId: "me",
    //     id: this.id
    //   });
    //   return msg.payload;
    // });
  });
}
