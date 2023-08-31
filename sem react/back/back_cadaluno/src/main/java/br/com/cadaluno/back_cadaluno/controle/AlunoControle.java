package br.com.cadaluno.back_cadaluno.controle;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import br.com.cadaluno.back_cadaluno.modelo.AlunoModelo;
import br.com.cadaluno.back_cadaluno.modelo.RespostaModelo;
import br.com.cadaluno.back_cadaluno.servico.AlunoServico;

@RestController
@CrossOrigin(origins = "*")//libera o api para qualquer acesso
public class AlunoControle {
    
    @Autowired
    private AlunoServico alunoServico; //iniciais do arquivo

    @DeleteMapping("/remover/{codigo}")
    public ResponseEntity<RespostaModelo> remover(@PathVariable long codigo){
        return alunoServico.remover(codigo);
    }

    @PutMapping("/alterar")
    public ResponseEntity<?> alterar(@RequestBody AlunoModelo alunoModelo){
        return alunoServico.cadastrarAlterar(alunoModelo, "alterar");
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody AlunoModelo alunoModelo){
        return alunoServico.cadastrarAlterar(alunoModelo, "cadastrar");
    }

    @GetMapping("/listar")
    public Iterable<AlunoModelo> listar(){
        return alunoServico.listar();
    }
    

    @GetMapping("/")
    public String rota(){
        return "API funcionando!";
    }
}
