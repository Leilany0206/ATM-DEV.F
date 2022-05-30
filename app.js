var cuentas = [
    { name: "MALI", money: 200, pin: "2458"},
    { name: "GERA", money: 290, pin: "1989"},
    { name: "MAUI", money: 67, pin: "7854"},
];

const inputUser = document.getElementById("inputUser");
const inputPassword = document.getElementById("inputPassword");
const clickForm = document.getElementById("clickForm");
const popError = document.getElementById("popError");
let errorContent = document.getElementById("errorContent");
const one = document.getElementById("one");
const two = document.getElementById("two");
const welcome = document.getElementById ("welcome");
const balanceBox = document.getElementById("balanceBox");
const balanceText = document.getElementById("balanceText");
const depositBox = document.getElementById("depositBox");
const depositText = document.getElementById("depositText");
const inputDeposit = document.getElementById("inputDeposit");
const withdrawBox = document.getElementById("withdrawBox");
const withdrawText = document.getElementById("withdrawText");
const inputWithdraw = document.getElementById("inputWithdraw");
let saveUser;

function upperCase() {
    var a = document.getElementById("inputUser").value
    document.getElementById("inputUser").value = a.toUpperCase()
}

clickForm.addEventListener("click", function(event) {
	event.preventDefault();
	verify(inputUser.value, inputPassword.value);
});

const verify = (inputUser, inputPassword) => {
    const user = cuentas.find(user => {
        return user.name.toUpperCase() == inputUser.toUpperCase();
    });

    if (!user) {
        //PONER FUNCTION ERROR  
        error("No existe el usuario");
    } else if (user.pin != inputPassword) {
        error("Contraseña incorrecta")
    } else if (user.pin == inputPassword) {
        continueWithTwo()
    }
    saveUser = user
}

function error(message) {
    errorContent.innerText = message;
    popError.style.visibility = "visible";
}

function okButton() {
    if (popError.style.visibility == "visible") {
        popError.style.visibility = "hidden";
    }
}

function continueWithTwo() {
    const welcomeText = "BIENVENIDO " + inputUser.value.toUpperCase();
    if (one.style.visibility = "visible") {
        one.style.visibility = "hidden"
        two.style.visibility = "visible"
        welcome.innerHTML = welcomeText;
    }
}

function closeButton(box) {
    box.style.visibility = "hidden";
}

function closeClearButton(box, input, text) {
    box.style.visibility = "hidden";
    input.value = "";
    text.innerHTML = "";
}

//Saldo
function showBalance() {
    balanceBox.style.visibility = "visible";
    balanceText.innerHTML = "TU SALDO ACTUAL ES DE " + saveUser.money;
}

//Depósito
function showDeposit() {
    depositBox.style.visibility = "visible";
}

function deposit() {
    if(inputDeposit.value == "") {
    depositText.innerHTML = "INGRESA UNA CANTIDAD";
    } else if ((Number(inputDeposit.value) + saveUser.money) > 990) {
    depositText.innerHTML = "LA CANTIDAD EXCEDE EL LÍMITE DE FONDOS";
    } else if ((Number(inputDeposit.value) + saveUser.money) <= 990) {
    saveUser.money = (Number(inputDeposit.value) + saveUser.money)
    depositText.innerHTML = "DEPÓSITO EXITOSO " + "TU SALDO ACTUAL ES DE " + saveUser.money;
    }
}

//Retiro
function showWithdraw() {
    withdrawBox.style.visibility = "visible";
    inputUser.value = "";
    inputPassword.value = "";
}

function withdraw() {
    if(inputWithdraw.value == "") {
    withdrawText.innerHTML = "INGRESA UNA CANTIDAD";
    } else if (saveUser.money < Number(inputWithdraw.value)) {
    withdrawText.innerHTML = "FONDOS INSUFICIENTES";
    } else if ((saveUser.money - Number(inputWithdraw.value)) < 10) {
    withdrawText.innerHTML = "NECESITAS TENER UN MÍNIMO DE 10 PESOS EN TU CUENTA";
    } else if ((saveUser.money - Number(inputWithdraw.value)) >= 10) {
    saveUser.money = (saveUser.money - Number(inputWithdraw.value))
    withdrawText.innerHTML = "RETIRO EXITOSO " + "TU SALDO ACTUAL ES DE " + saveUser.money;
    }
}

function logOut() {
    two.style.visibility = "hidden";
    one.style.visibility = "visible";
}