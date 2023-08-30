package br.com.cadaluno.back_cadaluno.modelo;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "alunos")
@Getter
@Setter
public class AlunoModelo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long codigo;
    private String nome;
    private Double nota1;
    private Double nota2;
    private Double media;
    private String situacao;
    
}
