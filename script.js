const message = document.getElementById('message')
const cipherbtn = document.querySelector('.cipher-btn__encriptar')
const decipherbtn = document.querySelector('.cipher-btn__desencriptar')
const cipheredMessage = document.querySelector('.text-cipher')
const messagetocipher = document.querySelector('.text-to-cipher')
const resultResponse = document.querySelector('.result__response')
const resultEmpty = document.querySelector('.result__empty')
const copyBtn = document.querySelector('.result__btn-copy')
const optionsTransformers = document.querySelector('#options')

let inputText
let arrayVocals = ["e", "l", "v", "a", "k", "o", "r", "p", "i"]
let arrayChanges = ['o', 'r', 'p', 'i', "s", "e", "l", "v", "a"]
let arrayVocalsSenit = ["e", "n", "i", "t", "p", "o", "l", "a", "r"]
let arrayChangesSenit = ['o', 'l', 'a', 'r', "s", "e", "n", "i", "t"]
const ACCENTS_VOWELS = "áéíóúàèìòùâêîôûäëïöü";

message.value = ''
message.addEventListener('input', handleChange)
cipherbtn.addEventListener('click', handleCipher)
decipherbtn.addEventListener('click', handleDecipher)
copyBtn.addEventListener('click', function() {
  navigator.clipboard.writeText(cipheredMessage.innerText); 
  copyBtn.innerHTML = `Copiado!`
})

function handleChange(event) {
    event.preventDefault()
    inputTextWithCapital = event.target.value

    inputText = inputTextWithCapital.toLowerCase().replace(/[áéíóúàèìòùâêîôûäëïöü]/g, function(match) {
      switch(match) {
        case "á":
        case "à":
        case "â":
          return "a";
        case "é":
        case "è":
        case "ê":
          return "e";
        case "í":
        case "ì":
        case "î":
          return "i";
        case "ó":
        case "ò":
        case "ô":
        case "ö":
          return "o";
        case "ú":
        case "ù":
        case "û":
        case "ü":
          return "u";
        default:
          return match;
      }
    })
}

function handleCipher(e) {
    e.preventDefault()
    var hasAccents = /^[a-zA-Z\u00C0-\u017F]+,\s[a-zA-Z\u00C0-\u017F]+$/u.test(inputText);
    if (hasAccents) {
        resultEmpty.innerHTML = `<p>Ingrese solo letras sin acentos 💛</p>`
    } else {
        if (resultEmpty.style.display == "none") {
            resultResponse.style.display = "flex"
            newtext = cipher(inputText)
            validador(newtext)
        } else {
            resultResponse.style.display = "flex"
            resultEmpty.style.display = 'none'
            newtext = cipher(inputText)
            validador(newtext)
        }
    }
    
}

function handleDecipher(e) {
    e.preventDefault()
    var hasAccents = /^[a-zA-Z\u00C0-\u017F]+,\s[a-zA-Z\u00C0-\u017F]+$/u.test(inputText);
    var hasCapitalLetters = /[A-Z]/.test(inputText);
    if (hasAccents || hasCapitalLetters) {
        resultEmpty.innerHTML = `<p>Solo letras minúsculas y sin acentos 💛</p>`
    } else {
        if (resultEmpty.style.display == "none") {
            resultResponse.style.display = "flex"
            newtext = deCipher(inputText)
            validador(newtext)
        } else {
            resultResponse.style.display = "flex"
            resultEmpty.style.display = 'none'
            newtext = deCipher(inputText)
            validador(newtext)
        }
    }
    
}

function cipher(text) {
  if (optionsTransformers.selectedIndex == 1) {
    let result = text.replace(/s/gi, "K");
    for (let i = 0; i < 9; i++) {
      result = result.replace(
        new RegExp(arrayVocals[i], "g"),
        arrayChanges[i].toUpperCase()
      );
    }
    let loweredresut = result.toLowerCase();
    return loweredresut;
  } else if (optionsTransformers.selectedIndex == 0) {
    let result = text.replace(/s/gi, "P");
    for (let i = 0; i < 9; i++) {
      result = result.replace(
        new RegExp(arrayVocalsSenit[i], "g"),
        arrayChangesSenit[i].toUpperCase()
      );
    }
    let loweredresut = result.toLowerCase();
    return loweredresut;
  } 
}

function deCipher(text) {
    if (optionsTransformers.selectedIndex == 1) {
      let result = text.replace(/k/gi, "S");
      for (let i = 0; i < 9; i++) {
        result = result.replace(
          new RegExp(arrayChanges[i], "g"),
          arrayVocals[i].toUpperCase()
        );
      }
      let loweredresut = result.toLowerCase();
      return loweredresut;
    } else if (optionsTransformers.selectedIndex == 0) {
      let result = text.replace(/p/gi, "S");
      for (let i = 0; i < 9; i++) {
        result = result.replace(
          new RegExp(arrayVocalsSenit[i], "g"),
          arrayChangesSenit[i].toUpperCase()
        );
      }
      let loweredresut = result.toLowerCase();
      return loweredresut;
    }
    
}

function validador(newtext) {
    if (newtext == false) {
        cipheredMessage.innerHTML = `<p>Tienes que seleccionar primero un transformador para cifrar tu texto! 💛</p>`
        } else {
            cipheredMessage.innerHTML = `${newtext}`
            copyBtn.innerHTML = `Copiar`
        }
}