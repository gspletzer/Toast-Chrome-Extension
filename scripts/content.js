chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  console.log('something happening from the extension');
  var data = request.data || {};
  let content = '';
  var linksList = document.querySelectorAll('p');
  [].forEach.call(linksList, function (header) {
    // console.log(header.innerHTML);
    content += header.innerHTML + ' ';
    // header.innerHTML = request.data;
    // console.log(content);
  });
  console.log('Unformatted content', content);
  content = content.substring(0, 2000);
  content = content.replace(/\<[\s\S]*?\>/g, '');
  console.log('CONTENT: ', content);

  const testURL =
    'https://api.giphy.com/v1/gifs/search?api_key=g2nPZdRsuXu68p4H5RAsHNFdfJLyiK8x&q=bob yoga burger&limit=15&offset=0&rating=PG&lang=en';
  //   getImages(url);
  sendResponse({ data: data, cont: content, success: true });
});
