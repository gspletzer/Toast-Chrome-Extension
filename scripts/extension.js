content = '';

document.addEventListener('DOMContentLoaded', function () {
  // document.getElementById('status').textContent = "Extension loaded";
  var button = document.getElementById('changelinks');
  button.addEventListener('click', function () {
    // $('#status').html('Clicked change links button');
    var text = $('#linkstext').val();
    // if (!text) {
    //     $('#status').html('Invalid text provided');
    //     return;
    // }
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { data: text }, function (response) {
        // $('#status').html('changed data in page');
        // console.log("-");
        console.log('response result ', response.cont);
        console.log('response type ', typeof response.cont);
        console.log('response length ', response.cont.length);
        let text = response.cont;

        let searchStr;
        if (text === '') {
          searchStr = 'error';
        } else {
          let topWordsArr = wordMode(text);
          searchStr =
            topWordsArr[0] + ' ' + topWordsArr[1] + ' ' + topWordsArr[2];
        }
        console.log(searchStr);

        const URL = makeURL(searchStr);
        console.log(URL);
        getImages(URL);
        console.log('success');
      });
    });
  });
});

class GIF {
  //in constructor
  constructor(el) {
    //property for URL of image
    this.URL = el.images.fixed_height.url;
    //property for the title of image
    this.title = el.title;
    //this.node = create new element (tile that the GIF lives in)
    this.node = document.createElement('div');
    //call renderGif function
    this.renderGif();
  }

  //create function that renders the GIF
  renderGif() {
    //add class for this.node = gif tile
    this.node.classList.add('gifTile');
    //create new variable image and value is new element img
    let image = document.createElement('img');
    //set source attribute of image to equal the URL
    image.setAttribute('src', this.URL);
    //add image node into this.node
    this.node.appendChild(image);
    //insert tile into body
    let tileInsert = document.querySelector('body');
    //append this.node into tile insert
    tileInsert.appendChild(this.node);
  }
}

function getImages(url) {
  //make a fetch request for the provided url
  fetch(url)
    .then((res) => res.json())
    .then((myRes) =>
      myRes['data'].forEach(function (el) {
        let giff = new GIF(el);
        console.log(giff.node);
        console.log('hello');
      })
    );
  //create a new gif object with each iteration
  //
}

function makeURL(string) {
  //   let text = 'cute dogs';
  let url =
    'https://api.giphy.com/v1/gifs/search?api_key=g2nPZdRsuXu68p4H5RAsHNFdfJLyiK8x&q=' +
    string +
    '&limit=25&offset=0&rating=R&lang=en';
  return url;
}

// const testURL =
//   'https://api.giphy.com/v1/gifs/search?api_key=g2nPZdRsuXu68p4H5RAsHNFdfJLyiK8x&q=bob yoga burger&limit=15&offset=0&rating=PG&lang=en';
// console.log(getImages(testURL))
// getImages(testURL);

//list of common words as array
function wordMode(str) {
  //declare a function that accepts a string of text
  let commonWords = [
    'a',
    'cookies',
    'targeting',
    'privacy',
    'button',
    'strictly',
    'your',
    'about',
    'all',
    'also',
    'and',
    'as',
    'at',
    'be',
    'because',
    'but',
    'by',
    'can',
    'come',
    'could',
    'day',
    'do',
    'even',
    'find',
    'first',
    'for',
    'from',
    'get',
    'give',
    'go',
    'have',
    'he',
    'her',
    'here',
    'him',
    'his',
    'how',
    'i',
    'if',
    'in',
    'into',
    'it',
    'is',
    'its',
    'just',
    'know',
    'like',
    'look',
    'make',
    'man',
    'many',
    'me',
    'more',
    'my',
    'new',
    'no',
    'not',
    'now',
    'of',
    'on',
    'one',
    'only',
    'or',
    'other',
    'our',
    'out',
    'people',
    'say',
    'see',
    'she',
    'so',
    'some',
    'take',
    'tell',
    'than',
    'that',
    'the',
    'their',
    'them',
    'then',
    'there',
    'these',
    'they',
    'thing',
    'think',
    'this',
    'those',
    'time',
    'to',
    'two',
    'up',
    'use',
    'very',
    'want',
    'way',
    'we',
    'well',
    'what',
    'when',
    'which',
    'who',
    'will',
    'with',
    'would',
    'year',
    'you',
    'your',
  ];
  //declare an empty cache object
  let cache = {};
  //split the given text into an array, use (/\W+/)
  let newArr = str.toLowerCase().split(/\W+/);
  //iterate through the array of words,
  //if word matches common words, skip
  //else
  //if not, add to cache
  //if yes, +1 to the that cache key
  newArr.forEach(function (el) {
    if (!commonWords.includes(el)) {
      if (!cache[el]) {
        return (cache[el] = 1);
      }
      return (cache[el] += 1);
    }
  });
  //declare a variable to hold array of keys
  //iterate through the array of keys,
  //sort keys array by comparing value at that key to the one before it in sort method
  let sortArr = Object.keys(cache).sort(function (a, b) {
    return cache[b] - cache[a];
  });
  //return keys from array at positions 0-2
  return sortArr;
}
