fetch ('http://localhost:8080/listar')//requisicao
.then(produtos => produtos.json())//converter o valor recebido em JSON
.then(retorno => console.log(retorno))//exibir produtos