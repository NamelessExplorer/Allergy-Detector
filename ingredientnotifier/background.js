
chrome.runtime.onMessage.addListener(function (message, sender, senderResponse) {

  console.log("Sender:", sender);
  console.log("Message:", message);


  fetch('http://localhost:3000', {
    method: 'POST',
    body: JSON.stringify({ url: message.url }),
    headers: {
      'Content-Type': 'application/json'
    }
  })

    .then(response => response.json())

    .then(data => {
      // Handle the API response and update the resultsDiv
      senderResponse(data);
    })
    
    .catch(error => {
      senderResponse(error);
    });

  return true;
}
);