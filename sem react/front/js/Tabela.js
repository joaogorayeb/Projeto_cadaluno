function Tabela ({vetor, selecionar}){
    return(
        <table className="table">
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nome</th>
                    <th>Primeira nota</th>
                    <th>Segunda nota</th>
                    <th>Média</th>
                    <th>Situação</th>
                    <th>Selecionar</th>
                </tr>
            </thead>

            <tbody>
                {
                   vetor.map((obj, indice) => (
                        <tr key={indice}>
                            <td>{indice+1}</td>
                            <td>{obj.nome}</td>
                            <td>{obj.nota1}</td>
                            <td>{obj.nota2}</td>
                            <td>{obj.media}</td>
                            <td>{obj.situacao}</td>
                            <td><button onClick={() => {selecionar(indice)}} className="btn btn-success">Selecionar</button></td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default Tabela;
