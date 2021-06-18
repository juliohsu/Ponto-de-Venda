class ProdutoCarrinho {
  constructor(codigo, nome, preco, quantidade) {
    this.codigo = codigo;
    this.nome = nome;
    this.preco = preco;
    this.quantidade = quantidade;
  }
  aumentaQuantia() {
    this.quantidade++;
  }
  reduzirQuantia() {
    this.quantidade--;
  }
}

class Compra {
  constructor(precoTotal, valorPago, trocado, listaProdutos) {
    this.carrinho = [];
    this.precoTotal = precoTotal;
    this.valorPago = valorPago;
    this.trocado = trocado;
    this.listaProdutos = listaProdutos;
  }

  adicionarProduto(tag) {
    //Produto alvo
    let produtoAlvo = tag.childNodes[3].textContent;
    //Preço total
    let precoProduto;
    this.listaProdutos.forEach((produto) => {
      if (produto.nome == produtoAlvo) {
        precoProduto = produto.preco;
      }
    });
    //Adicionando preço do produto a ser adicionado
    this.precoTotal += precoProduto;

    let condition = false;
    let produtoAdicionado;

    //Aumenta a quantia do produto existente no carrinho
    this.carrinho.forEach((produto) => {
      if (produto.nome == produtoAlvo) {
        produto.aumentaQuantia();
        produtoAdicionado = produto;
        condition = true;
      }
    });

    //Caso contrario cria e coloca o produto no carrinho
    if (!condition) {
      this.carrinho.push(
        produtoAdicionado = new ProdutoCarrinho((this.carrinho.length), produtoAlvo, precoProduto, 1)
      );
    }

    return produtoAdicionado;
  }

  removerProduto(tag) {
    //Produto alvo
    var produtoAlvo = tag.firstChild.data;
    //Preço total
    let precoProduto;
    this.listaProdutos.forEach((produto) => {
      if (produto.nome == produtoAlvo) {
        precoProduto = produto.preco;
      }
    });
    //Descontando preço do produto a ser removido
    this.precoTotal -= precoProduto;

    //Reduzir a quantia do produto existente no carrinho
    let produtoRemovido;
    this.carrinho.forEach((produto) => {
      if (produto.nome == produtoAlvo) {
        produto.reduzirQuantia();
        produtoRemovido = produto;
      }
    });

    return produtoRemovido;
  }

  limparCompra() {
    this.carrinho = [];
    this.precoTotal = 0;
    this.valorPago = 0;
    this.trocado = 0;
  }
}
