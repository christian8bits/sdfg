class Jogo extends React.Component{
  render (){
    return (
      <div className="game">
        
        <div className="game-board">
          <Tabuleiro />
        </div>
        
        <div className="game-info">
          <span className="game-history">Movimentos</span>
          <ol>
          </ol>
        </div>
        
      </div>
    );
  }
}

 


class Tabuleiro extends React.Component{
  
  constructor (props){
    super (props);
    this.state = {
      quadrados: Array(9).fill(null),
      acaonojogo: Array(2).fill(null),
      xIsNext: true
     
    }
  }
  
  
  render (){
    const vencedor = calculateWinner (this.state.quadrados);
    
    const status = vencedor ? ('Vencedor: ' + vencedor) : ('Jogador: ' + (this.state.xIsNext ? 'X' : 'O')
                                                          );
    
    return (
      <div>
        <div>{status}</div>
        <div className="board-row">
          {this.renderizarQuadrado(0)}
          {this.renderizarQuadrado(1)}
          {this.renderizarQuadrado(2)}
        </div>
        
        <div className="board-row">
          {this.renderizarQuadrado(3)}
          {this.renderizarQuadrado(4)}
          {this.renderizarQuadrado(5)}
        </div>
        
        <div className="board-row">
          {this.renderizarQuadrado(6)}
          {this.renderizarQuadrado(7)}
          {this.renderizarQuadrado(8)}
        </div>

           <div className="board-row2" >
          {this.renderizarOpcoes(9)}
           {this.renderizarOpcoes(10)}
        </div>
        
      </div>
    );
  }
  
  renderizarQuadrado (i){
    
    return (
      <Quadrado 
        value={this.state.quadrados[i]}
        onClick={() => this.handleClick(i)}
      />
    );
  }
  
    renderizarOpcoes (i){
      
    return (
      <Opcoes
        value={this.state.quadrados[i]}
        onClick={() => this.handleClick(i)}
        
      />
    );
  }
  
  
  
  
handleClick (i){

    const quadrados = this.state.quadrados.slice();
    quadrados[9] = 'limpa'; 
    quadrados[10] = 'joga'; 
    if (i == 9){
      //quadrados[1] = '';
      for(let ct in quadrados){
         quadrados[ct] = '';
      }
    

       this.setState({quadrados: quadrados, xIsNext: !this.state.xIsNext});
      return;
    }
      if (i == 10){
        
       i = Math.floor(Math.random() * 8);  
        
      }
  
    if (calculateWinner (quadrados)){
      alert ('Jogo já acabou');
      return;
    }
    if (quadrados[i]){
      alert ('Quadrado ocupado!')
      return;
    }
    quadrados[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({quadrados: quadrados, xIsNext: !this.state.xIsNext});
  }
}


class Quadrado extends React.Component{
  render (){
    return (
      <button
        className="square"
        onClick={this.props.onClick}
      >
        {this.props.value}
      </button>
    );
  }
}

class Opcoes extends React.Component{
  render (){
    console.log(this.props.value);
    return (
      <button
        className="opcoesjogo"
        onClick={this.props.onClick}
      >
       {this.props.value}
      </button>
    );
  }
}

 

  
  
/*function Quadrado(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}*/

 


function calculateWinner (quadrados){
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++){
    const [a, b, c] = lines[i];
    if (quadrados[a] && quadrados[a] === quadrados[b] && quadrados[a] === quadrados[c])
      return quadrados[a];
  }
  return null;
}



 

ReactDOM.render(
  <Jogo />,
  document.getElementById ('root')
);

 

/*ReactDOM.render(
  <Tabuleiro quadrados={Array(9).fill().map((v, pos) => pos)} />,
  document.getElementById("root")  
);*/

 

/*ReactDOM.render(
  <Quadrado onClick={() => alert("Clicou!")} value={2 + 2} />,
  document.getElementById("root")
);*/


