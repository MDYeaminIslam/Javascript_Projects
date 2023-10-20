var time = document.getElementById('time');
// console.log(date);

setInterval(() => {
  const date = new Date();
  time.innerHTML = date.toLocaleTimeString();
}, 1000);