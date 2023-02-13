['Nhóm', 'Trò chơi', 'Bạn bè', 'Watch', 'Groups', 'Games', 'Friends'].forEach((item) => {
  const ele = document.querySelector(`li a[aria-label="${item}"]`);
  ele && (ele.closest('li').style.display = 'none');
});

document.querySelectorAll('h2').forEach((item) => {
  const text = item.innerText.trim();
  if (text === 'Menu trên Facebook') {
    item.nextElementSibling.querySelector('div').querySelector('div').querySelector('ul + div').style.display = 'none';
  }
});
