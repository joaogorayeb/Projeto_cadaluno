package br.com.cadaluno.back_cadaluno.repositorio;


import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import br.com.cadaluno.back_cadaluno.modelo.AlunoModelo;

@Repository
public interface AlunoRepositorio extends CrudRepository<AlunoModelo, Long>{
    
}
