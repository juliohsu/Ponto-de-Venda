function cupomCliente(date, hour, produtosFormatados, valoresFormatados, formaPagamento) {

  let html = 
  `Kroissant\n\r` +
  "Doceria & Padaria Artesanal\n\r" +
  "CNPJ: 20.671.934/0001-62\n\r" +
  "------------------------------------------\n\r" +
  "                 CUPOM                    \n\r" +
  "------------------------------------------\n\r" +
  "CLIENTE : CONSUMIDOR FINAL\n\r" +
  date +
  " " +
  hour +
  "\n\r" +
  "------------------------------------------\n\r" +
  "QT          PREÇO                DESCRIÇÃO\n\r" +
  produtosFormatados +
  "" +
  "------------------------------------------\n\r" +
  valoresFormatados +
  formaPagamento +
  "" +
  "------------------------------------------\n\r" +
  "                                          \n\r" +
  "Contato: " +
  "(83) 2148-6707 / (83) 3099-8055\n\r" +
  "                                          \n\r" +
  "Rua Antônio Catão, 10, Jardim Tavares\n\r" +
  "                                          \n\r" +
  "Siga nossa instagram: @kroissant.br \n\r" +
  "                                          \n\r" +
  "OBRIGADO VOLTE SEMPRE!";

  return html;
}

var comandoFrente = "";
var comandoCozinha = "";

module.exports = { cupomCliente, comandoFrente, comandoCozinha };