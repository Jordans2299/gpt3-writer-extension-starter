// Declare new function
const insert = (content) => {
    // Find Calmly editor input section
    const div = document.getElementById("main");
    console.log(div);
  // Grab the first p tag so we can replace it with our injection
    const pRemove = div.childNodes[0];
    pRemove.remove();

  // Split content by \n
  const splitContent = content.split('\n');

// Wrap in p tags
splitContent.forEach((content) => {
    const p = document.createElement('p');
  
    if (content === '') {
      const br = document.createElement('br');
      p.appendChild(br);
    } else {
      p.textContent = content;
    }
  
    // Insert into HTML one at a time
    div.appendChild(p);
  });

  // On success return true
  return true;
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.message === 'inject') {
        const { content } = request;

        // Call this insert function
        const result = insert(content);

        // If something went wrong, send a failed status
        if (!result) {
            sendResponse({ status: 'failed' });
        }

        console.log(content);

        sendResponse({ status: 'success' });
    }
});