//Formatação de texto
function formatacao() {
  let carrinho = document.getElementById("carrinho");
  let texto = "";
  let larguraLinea;
  carrinho.childNodes.forEach((produto) => {
    texto += `${produto.lastChild.innerText}          `;
    larguraLinea = `${produto.lastChild.innerText}          `;

    if (larguraLinea.length < 17) {
      let resto =
        17 - (larguraLinea.length + produto.childNodes[1].innerHTML.length);
      for (var i = 0; i < resto; i++) {
        texto += " ";
        larguraLinea += " ";
      }
    }
    texto += produto.childNodes[1].innerHTML;
    larguraLinea += produto.childNodes[1].innerHTML;
    texto += "                ";
    larguraLinea += "                ";

    if (larguraLinea.length + produto.firstChild.data.length < 42) {
      var resto = 42 - (larguraLinea.length + produto.firstChild.data.length);
      for (var i = 0; i < resto; i++) {
        texto += " ";
        larguraLinea += " ";
      }
    }
    texto += `${produto.firstChild.data}\n\r`;
    larguraLinea += `${produto.firstChild.data}\n\r`;
  });

  return texto;
}

//Formatação de texto para os valores
function formatacaoValores(precoTotal, valorPago, trocado) {
  //Formatando a linha do valor de compra
  let texto = "Valor de compra:                  ";
  if (texto.length + precoTotal.length + 5 < 42) {
    var resto = 42 - (texto.length + precoTotal.length + 5);
    for (var i = 0; i < resto; i++) {
      texto += " ";
    }
  }
  texto += precoTotal + " R$" + "\n\r";
  //Formatando a linha do valor de pagamento
  texto += "Valor pago:                  ";
  if (texto.length + valorPago.length + 5 < 84) {
    var resto = 84 - (texto.length + valorPago.length + 5);
    for (var i = 0; i < resto; i++) {
      texto += " ";
    }
  }
  texto += valorPago + " R$" + "\n\r";
  //Formatando a linha do valor de trocado
  texto += "Trocado:                     ";
  if (texto.length + trocado.length + 5 < 126) {
    var resto = 126 - (texto.length + trocado.length + 5);
    for (var i = 0; i < resto; i++) {
      texto += " ";
    }
  }
  texto += trocado + " R$" + "\n\r";

  return texto;
}

function dateValue() {
  var data = new Date();
    var date =
      data.getDate() + "/" + (data.getMonth() + 1) + "/" + data.getFullYear();
    var hour =
      data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
  
  return [date, hour];
}

function paidValue() {
  let rate_value;
  if (document.getElementById("option1").checked) {
    rate_value = document.getElementById("option1").value;
  }
  if (document.getElementById("option2").checked) {
    rate_value = document.getElementById("option2").value;
  }
  if (document.getElementById("option3").checked) {
    rate_value = document.getElementById("option3").value;
  } 
  return "Forma de Pagamento: " + rate_value + "\n\r";
}

module.exports = { dateValue, formatacao, formatacaoValores, paidValue };