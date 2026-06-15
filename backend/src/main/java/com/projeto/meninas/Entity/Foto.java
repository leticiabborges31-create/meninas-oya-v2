package com.projeto.meninas.Entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Foto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nomeArquivo;

    private String caminho;

    @ManyToOne
    @JoinColumn(name = "atividade_id")
    private Atividade atividade;
}
