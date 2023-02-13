chrome.tabs
  .query({
    url: ['https://*.facebook.com/*'],
  })
  .then((tabs) => {
    console.log(tabs);
    const collator = new Intl.Collator();
    const activeBtn = document.querySelector('#active-status');

    let active = 1;

    tabs.sort((a, b) => collator.compare(a.title, b.title));
    for (const tab of tabs)
      (async () => {
        await chrome.tabs.update(tab.id, { active: true });
        await chrome.windows.update(tab.windowId, { focused: true });
      })();

    const activeHandle = () => {
      ['Nhóm', 'Trò chơi', 'Bạn bè', 'Watch', 'Groups', 'Games', 'Friends'].forEach((item) => {
        const ele = document.querySelector(`li a[aria-label="${item}"]`);
        ele && (ele.closest('li').style.display = 'none');
      });

      document.querySelectorAll('h2').forEach((item) => {
        const text = item.innerText.trim();
        if (text === 'Menu trên Facebook') {
          item.nextElementSibling.querySelector('div').querySelector('div').querySelector('ul + div').style.display =
            'none';
        }
      });
    };

    const inactiveHandle = () => {
      ['Nhóm', 'Trò chơi', 'Bạn bè', 'Watch', 'Groups', 'Games', 'Friends'].forEach((item) => {
        const ele = document.querySelector(`li a[aria-label="${item}"]`);
        ele && ele.closest('li').setAttribute('style', '');
      });

      document.querySelectorAll('h2').forEach((item) => {
        const text = item.innerText.trim();
        if (text === 'Menu trên Facebook') {
          item.nextElementSibling
            .querySelector('div')
            .querySelector('div')
            .querySelector('ul + div')
            .setAttribute('style', '');
        }
      });
    };

    activeBtn.addEventListener('click', async function () {
      if (!active) {
        this.innerText = 'Active';
        activeHandle();
      } else {
        this.innerText = 'Inactive';
        inactiveHandle();
      }

      active = !active;
      this.classList.toggle('active-style', active);

      const tabIds = tabs.map(({ id }) => id);
      const group = await chrome.tabs.group({ tabIds });
      await chrome.tabGroups.update(group, { title: 'Facebook' });
    });
  });
