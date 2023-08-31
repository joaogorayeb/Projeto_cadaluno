const formulario = document.querySelectorAll('form');
const nome = document.querySelector('.nome');
const nota1 = document.querySelector('nota1');
const nota2 = document.querySelector('nota2');


function cadastrar () {

     fetch("http://localhost:8080/cadastrar",
        {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                method: "POST",
                body: JSON.stringify ({
                    nome: nome.value,
                    nota1: nota1.value,
                    nota2: nota2.value,
                })
        })
        .then(function (res) { console.log(res) })
        .catch(function (res) { console.log(res) })
    
};

function limpar () {
    nome.value = "";
    nota1.value = "";
    nota2.value = "";
};

formulario.addEventListener ('submit', function (event){
    event.preventDefault();

    cadastrar();
    limpar();
});
