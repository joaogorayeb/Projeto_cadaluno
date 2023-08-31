import { useEffect, useState } from 'react';
import './App.css';
import Formulario from './Formulario';
import Tabela from './Tabela';

function App() {

  // Objeto produto
  const aluno = {
    codigo : 0,
    nome : '',
    nota1 : '',
    nota2 : '',
    media : '',
    situacao : ''
  }

  // UseState
  const [btnCadastrar, setBtnCadastrar] = useState(true);
  const [alunos, setAlunos] = useState([]);
  const [objAluno, setObjAluno] = useState(aluno);


  // UseEffect
  useEffect(()=>{
    fetch("http://localhost:8080/listar")
    .then(retorno => retorno.json())
    .then(retorno_convertido => setAlunos(retorno_convertido));
  }, []);//colchete para evitar loop infinito

  // Obtendo os dados do formulário
    const aoDigitar = (e) => {
    setObjAluno({...objAluno, [e.target.name]:e.target.value});
  }

  // Cadastrar Aluno 
  const cadastrar = () => {
    fetch('http://localhost:8080/cadastrar',{
      method:'post',
      body:JSON.stringify(objAluno),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        
        if(retorno_convertido.mensagem !==undefined){
          alert(retorno_convertido.mensagem);
        }else{
          setAlunos([...alunos, retorno_convertido]);
          alert('Aluno cadastrado com sucesso!');
          limparFormulario();
        }
    })
  }

  // Remover Aluno 
  const remover = () => {
    fetch('http://localhost:8080/remover/'+objAluno.codigo,{
      method:'delete',
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        
        // Mensagem para excluir
        alert(retorno_convertido.mensagem)

        //Copia vetor Alunos
        let vetorTemp = [...alunos];

        //Indice
        let indice = vetorTemp.findIndex((p) => {
          return p.codigo === objAluno.codigo;
        });

         // remover Aluno do vetorTemp
         vetorTemp.splice(indice, 1);

         // Atualizar vetor de Alunos
         setAlunos(vetorTemp);

         // Limpar form
         limparFormulario();
    })
  }

  // Alterar Aluno 
  const alterar = () => {
    fetch('http://localhost:8080/alterar',{
      method:'put',
      body:JSON.stringify(objAluno),
      headers:{
        'Content-type':'application/json',
        'Accept':'application/json'
      }
    })
      .then(retorno => retorno.json())
      .then(retorno_convertido => {
        
        if(retorno_convertido.mensagem !==undefined){
          alert(retorno_convertido.mensagem);
        }else{
          
          // Mensagem
          alert('Aluno alterado com sucesso!');
         
          // Copia vetor Alunos
          let vetorTemp = [...alunos];

          // Indice
          let indice = vetorTemp.findIndex((p) => {
            return p.codigo === objAluno.codigo;
          });

          // Alterar Aluno do vetorTemp
          vetorTemp[indice] = objAluno;

          // Atualizar vetor de Alunos
          setAlunos(vetorTemp);

            
          limparFormulario();
        }
    })
  }


  // Limpar form
  const limparFormulario = () => {
    setObjAluno(aluno);
    setBtnCadastrar(true);
  }

  // Selecionar Aluno
  const selecionarAluno = (indice) => {
    setObjAluno(alunos[indice]);
    setBtnCadastrar(false);
  } 

  // Retorno
  return (
    <div>
      {/* <p>{JSON.stringify(objAluno)}</p> testar Alunos */}
      <Formulario botao={btnCadastrar} eventoTeclado={aoDigitar} cadastrar={cadastrar} obj={objAluno} cancelar={limparFormulario} remover={remover} alterar={alterar}/>
      <Tabela vetor={alunos} selecionar={selecionarAluno} />
    </div>
  );
}

export default App;
