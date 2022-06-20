let password = "comet";

function enter() {
  let userAttempt = prompt("The password is comet\nPassword: ");
  
    while (userAttempt !== password){
    userAttempt = prompt("That was incorrect.\nAgain, the password is comet\nPassword: ");
  }
}

enter();