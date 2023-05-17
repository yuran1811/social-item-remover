/* 
Before running this script, make sure
  - Youtube language is English 
  - You are current in the playlist site ui (Ex: https://www.youtube.com/playlist?list=_playlist_id_)
*/

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function removeDuplicates() {
  let titles = document.querySelectorAll('#primary #video-title');
  let href_pattern = RegExp('https?://www\\.youtube\\.com/watch\\?v=[^&]*&list=[^&]*&index=');
  titles = Array.from(titles).filter((t) => href_pattern.test(t.href));
  let lastid = '';
  for (let i = 0; i < titles.length; i++) {
    let id = titles[i].href.match(/\\?v=([^&]+)/)[1];
    if (id == lastid) {
      titles[i].focus();
      titles[i].parentElement.parentElement.parentElement.parentElement.parentElement
        .querySelector('button[aria-label="Action menu"]')
        .click();
      await sleep(100);
      var things = document.evaluate(
        '//span[contains(text(),"Remove from")]',
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      await sleep(300);
      for (var j = 0; j < things.snapshotLength; j++) {
        things.snapshotItem(j).click();
      }
      console.log(titles[i].innerText);
    }
    lastid = id;
  }
}

async function removeUnavailables() {
  let titles = document.querySelectorAll('#primary #video-title');
  let href_pattern = RegExp('https?://www\\.youtube\\.com/watch\\?v=[^&]*&list=[^&]*&index=');
  titles = Array.from(titles).filter((t) => href_pattern.test(t.href));
  let lastid = '';
  for (let i = 0; i < titles.length; i++) {
    let id = titles[i].href.match(/\\?v=([^&]+)/)[1];
    if (id == lastid || ["[Deleted video]", "[Private video]"].some(x => titles[i].innerText.includes(x))) {
      titles[i].focus();
      titles[i].parentElement.parentElement.parentElement.parentElement.parentElement
        .querySelector('button#button')
        .click();
      await sleep(100);
      var things = document.evaluate(
        '//yt-formatted-string[contains(text(),"Remove from")]',
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      );
      await sleep(300);
      for (var j = 0; j < things.snapshotLength; j++) {
        things.snapshotItem(j).click();
      }
      console.log(titles[i].innerText);
    }
    lastid = id;
  }
}

const getTextToCompare = () => {
  // https://www.diffchecker.com/text-compare/
  const hid = Array.from(document.querySelectorAll('#primary #video-title'));
  let jsonhid = ``;
  hid.forEach(x => {jsonhid += (x.innerText) + '\n'});
  console.log(jsonhid);

  return jsonhid;
}
