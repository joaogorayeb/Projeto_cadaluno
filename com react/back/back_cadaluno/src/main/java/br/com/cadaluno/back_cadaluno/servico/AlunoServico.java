package br.com.cadaluno.back_cadaluno.servico;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import br.com.cadaluno.back_cadaluno.modelo.AlunoModelo;
import br.com.cadaluno.back_cadaluno.modelo.RespostaModelo;
import br.com.cadaluno.back_cadaluno.repositorio.AlunoRepositorio;

@Service
public class AlunoServico {
    
    @Autowired
    private AlunoRepositorio alunoRepositorio;

    @Autowired
    private RespostaModelo respostaModelo;

    //Método para listar todos os Alunos
    public Iterable<AlunoModelo> listar(){
        return alunoRepositorio.findAll();
    }

    //Método para cadastrar ou alterar Alunos
    public ResponseEntity<?> cadastrarAlterar(AlunoModelo alunoModelo, String acao){

        if(alunoModelo.getNome().equals("")){
            respostaModelo.setMensagem("O nome do Aluno é obrigatório!");
            return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.BAD_REQUEST);
        }else if(alunoModelo.getNota1() == null){
            respostaModelo.setMensagem("A primeira nota é obrigatória!");
            return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.BAD_REQUEST);
        }else if(alunoModelo.getNota2() == null){
            respostaModelo.setMensagem("A segunda nota é obrigatória!");
            return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.BAD_REQUEST);
        }else if(alunoModelo.getNota1().doubleValue() > 100 || alunoModelo.getNota2().doubleValue() > 100){
            respostaModelo.setMensagem("A nota não pode passar de 100!");
            return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.BAD_REQUEST);
        }else{
            alunoModelo.setMedia((alunoModelo.getNota1().doubleValue() + alunoModelo.getNota2().doubleValue()) /2);
            if(alunoModelo.getMedia() > 70){
                alunoModelo.setSituacao("APROVADO");
            }else{
                alunoModelo.setSituacao("REPROVADO");
            }
            if(acao.equals("cadastrar")){
                return new ResponseEntity<AlunoModelo>(alunoRepositorio.save(alunoModelo), HttpStatus.CREATED);
            }else{
                return new ResponseEntity<AlunoModelo>(alunoRepositorio.save(alunoModelo), HttpStatus.OK);
            }
        }
    }//REMOVER Aluno
    public ResponseEntity<RespostaModelo> remover (long codigo){

        alunoRepositorio.deleteById(codigo);

        respostaModelo.setMensagem("O Aluno foi removido com sucesso!");
        return new ResponseEntity<RespostaModelo>(respostaModelo, HttpStatus.OK);
    }
}
