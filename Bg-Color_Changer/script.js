const buttons = document.querySelectorAll('.button');
console.log(buttons);

buttons.forEach((button) => {
  button.addEventListener('click', (e) =>{
    // console.log(e.target);

    switch(e.target.id){
      case "black":
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
        break;
      case "blue":
        document.body.style.backgroundColor = "blue";
        break;
      case "red":
        document.body.style.backgroundColor = "red";
        break;
      case "green":
        document.body.style.backgroundColor = "green";
        break;
      case "yellow":
        document.body.style.backgroundColor = "yellow";
        document.body.style.color = "black";
        break;
    }
  })
});