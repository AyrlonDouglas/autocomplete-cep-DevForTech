const btnClear = document.querySelector("#btn-clear");
let logradouro = document.querySelector("#logradouro");
let complemento = document.querySelector("#complemento");
let bairro = document.querySelector("#bairro");
let localidade = document.querySelector("#localidade");
let uf = document.querySelector("#UF");
let completo = document.querySelector("#completo");
let cep = document.querySelector("#CEP");

cep.addEventListener("blur", async (e) => {
  if (!e.target.value) {
    clearForm();
  } else {
    let cepReplaced = e.target.value.replace(/\D/g, "");
    let validator = /^[0-9]{8}$/;

    if (validator.test(cepReplaced)) {
      await fetch(`https://viacep.com.br/ws/${cepReplaced}/json/`)
        .then((response) => response.json())
        .then((res) => {
          cep.value = cepReplaced;
          logradouro.value = res.logradouro;
          complemento.value = res.complemento;
          bairro.value = res.bairro;
          localidade.value = res.localidade;
          uf.value = res.uf;
          completo.value = `${res.logradouro} ${res.complemento}, ${res.bairro}, ${res.localidade}, ${uf.value}`;
        })
        .catch((error) => {
          alert("CEP errado");
        });
    } else {
      clearForm();
      alert("Formato de CEP inválido.");
    }
  }
});

btnClear.onclick = (e) => {
  clearForm();
};

const clearForm = () => {
  cep.value = "";
  logradouro.value = "";
  complemento.value = "";
  bairro.value = "";
  localidade.value = "";
  uf.value = "";
  completo.value = "";
};
