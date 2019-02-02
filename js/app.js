// Inimigos que nosso jogador deve evitar
class Enemy{
	constructor(){
		// As variáveis aplicadas a nossas instâncias entram aqui.
	    // Fornecemos uma a você para que possa começcar.

	    // A imagem/sprite de nossos inimigos, isso usa um
	    // ajudante que é fornecido para carregar imagens
	    // com facilidade.
		this.sprite = 'images/enemy-bug.png';
	}
	// Atualize a posição do inimigo, método exigido pelo jogo
	// Parâmetro: dt, um delta de tempo entre ticks
	update(dt){
		// Você deve multiplicar qualquer movimento pelo parâmetro
	    // dt, o que garantirá que o jogo rode na mesma velocidade
	    // em qualquer computador.
	}
	// Desenhe o inimigo na tela, método exigido pelo jogo
	render(){
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

class Char{
	constructor(){
		this.sprite = 'images/char-boy.png';
	}

	update(){

	}

	render(){
		//ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	
}

let player = new Char(),
	allEnemies = [];
for(let i = 1; i <= 4; i++){
	let enemy = new Enemy();
	allEnemies.push(enemy);
}

// Represente seus objetos como instâncias.
// Coloque todos os objetos inimgos numa array allEnemies
// Coloque o objeto do jogador numa variável chamada jogador.

/*hotkeys('up,down,left,right', function(event,handler) {
  switch(handler.key){
	case "up":alert('you pressed up');break;
	case "down":alert('you pressed down');break;
	case "left":alert('you pressed left');break;
	case "right":alert('you pressed right');break;
 }
});
*/