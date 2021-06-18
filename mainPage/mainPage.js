const cupons = require("./cupons.js");
const dados = require("./dados.js");
const { ipcRenderer } = require("electron");

let listaProdutos = [
  { codigo: "1", nome: "croissant", preco: 20 },
  { codigo: "2", nome: "donut", preco: 10 },
  { codigo: "3", nome: "cafe", preco: 5 },
  { codigo: "4", nome: "bolo", preco: 30 },
  { codigo: "5", nome: "salgado", preco: 5 },
];

let compra = new Compra(0, 0, 0, listaProdutos);

//Adicionando produto no carrinho
function adicionar(tag) {
  //Adicionando produto na compra
  var produtoAlvo = compra.adicionarProduto(tag);
  //Adicionando no html, considerando 2 casos
  if (produtoAlvo.quantidade >= 2) {
    let carrinho = document.getElementById("carrinho");
    carrinho.childNodes.forEach((node) => {
      if (node.firstChild.data == produtoAlvo.nome) {
        node.lastChild.innerHTML = produtoAlvo.quantidade.toString() + "x";
      }
    });
  } else if (produtoAlvo.quantidade == 1) {
    let li = document.createElement("li");
    li.setAttribute("ondblclick", "remover(this)");
    li.setAttribute(
      "class",
      "list-group-item d-flex justify-content-between align-items-center"
    );
    li.innerHTML = `${produtoAlvo.nome}<small>${produtoAlvo.preco} R$</small><span class="badge bg-primary rounded-pill">1x</span>`;
    carrinho.appendChild(li);
  }

  //Atualiza preço total no html
  document.getElementById("precoTotal").innerHTML = compra.precoTotal.toString();
}

//Removendo produto do carrinho
function remover(tag) {
  //Removendo produto na compra
  var produtoAlvo = compra.removerProduto(tag);
  //Removendo no html
  var carrinho = document.getElementById("carrinho");
  carrinho.childNodes.forEach((node) => {
    if (node.firstChild.data == produtoAlvo.nome) {
      node.lastChild.innerHTML = produtoAlvo.quantidade.toString() + "x";
      //Se zerar a quantia, excluir do carrinho
      if (produtoAlvo.quantidade == 0) {
        carrinho.removeChild(node);
      }
    }
  });

  //Atualiza preço total no html
  document.getElementById("precoTotal").innerHTML = compra.precoTotal.toString();
}

//Finalizar a venda, desde que o valor total for maior que 0
function finalizar() {
  //Valor pago
  let valorPago = document.getElementById("valorPago").value;
  //Valor trocado
  let trocado = (valorPago - parseInt(compra.precoTotal)).toString();
  //Caso não for inserido valor de pagamento
  if (valorPago == "") {
    valorPago = compra.precoTotal;
    trocado = "0";
  }
  //Só autoriza a finalização se tiver alguma compra e valor pago sendo maior
  if (compra.precoTotal > 0 && valorPago >= parseInt(compra.precoTotal)) {
    console.log("imprimindo");

    //Organizando o formato da data
    var data = dados.dateValue;

    //Organizando o formato dos produtos
    var produtosFormatados = dados.formatacao();
    var valoresFormatados = dados.formatacaoValores(compra.precoTotal, valorPago, trocado);

    //Avaliação a forma de pagamento
    let formaPagamento = dados.paidValue();

    //Receber formatacao final do cupom cliente
    var cupomCliente = cupons.cupomCliente(
      data[0],
      data[1],
      produtosFormatados,
      valoresFormatados,
      formaPagamento
    );
    
    //Mandando comando para imprimir cupom formatado com os dados
    ipcRenderer.send("print", cupomCliente);

    total.setAttribute("style", "border: 1px solid green");
    document.getElementById("resultadoCompra").innerHTML = `
    <div class="alert alert-dismissible alert-success">
      <strong>Compra finalizada com sucesso!</strong>
    </div>        
    `;
  } else {
    total.setAttribute("style", "border: 1px solid red");
    document.getElementById("resultadoCompra").innerHTML = `
    <div class="alert alert-dismissible alert-danger">
    <strong>Não foi possível finalizar a compra!</strong>
    </div>
    `;
  }
}

//Motrar tempo em segundos ao vivo
function showTime() {
  var dt = new Date();
  document.getElementById("datetime").innerHTML = dt.toLocaleTimeString();
  setTimeout(showTime, 1000);
}

//Voltar a pagina do login
function sair() {
  console.log("sair");
  const { ipcRenderer } = require("electron");
  ipcRenderer.send("login", true);
}

//Limpar o carrinho de compra
function limpar() {
  console.log("limpando carrinho");
  //Limpando na compra
  compra.limparCompra();
  //Limpando no html
  document.getElementById("carrinho").innerHTML = "";
  document.getElementById("precoTotal").innerHTML = "0";
}

//Colocar todos os produtos na lista de seleção, assim que for carregado a pagina
function demostrarProdutos(listaProdutos) {
  let html = "";
  listaProdutos.forEach((produto) => {
    html += `
    <tr class="table-active product" ondblclick="adicionar(this)">
    <th scope="row">${produto.codigo}</th>
    <td>${produto.nome}</td>
    <td><span class="preco">${produto.preco}</span>R$</td>
    </tr>
    `;
  });
  document.getElementById("produtos").innerHTML = html;
}

//Pesquisando os produtos via nome inserido
function pesquisar() {
  let valor = document.getElementById("pesquisa").value;
  let produtosCorrespondentes = listaProdutos.filter((produto) => {
    const regex = new RegExp(`^${valor}`, "gi");
    if (produto.nome.match(regex) || produto.codigo.match(regex)) {
      return true;
    }
  });
  if (produtosCorrespondentes.length > 0) {
    demostrarProdutos(produtosCorrespondentes);
  }
}

//Eventos para ser executados
showTime();
demostrarProdutos(listaProdutos);
document.getElementById("btn-sair").addEventListener("click", sair);
document.getElementById("pesquisa").addEventListener("input", pesquisar);