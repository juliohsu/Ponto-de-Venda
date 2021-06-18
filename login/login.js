function submitEvent(e) {
  e.preventDefault();
  let listaNome = new Set(["juliohsu", "samuelhsu", "adm"]);
  let nome = document.querySelector("#nome").value;
  let senha = document.querySelector("#senha").value;

  if (listaNome.has(nome) && senha == "123456") {
    const { ipcRenderer } = require("electron");
    ipcRenderer.send("validation", true);
  } else {
    console.log("usuario incorreto");
    let notificacao = document.getElementById("notificacao");
    notificacao.innerHTML = `
      <div class="alert alert-dismissible alert-danger">
      <button type="button" class="btn-close" data-bs-dismiss="alert" onclick="fechar()"></button>
      <strong>Ah não!</strong> Conta ou senha incorreta<br>Tenta digitar novamente.
      </div>    
    `;
  }
}

document.querySelector("form").addEventListener("submit", submitEvent);

function fechar() {
  let notificacao = document.getElementById("notificacao");
  notificacao.innerHTML = "";
}
