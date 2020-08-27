const celeste = document.getElementById( 'celeste');
const violeta = document.getElementById('violeta');
const naranja = document.getElementById('naranja');
const verde  = document.getElementById('verde');
const ULTIMO_NIVEL = 10

const botonEmpezar = document.getElementById('btnEmpezar');

// console.log(botonE)

class Juego {
	constructor(){
		// this.inicializar = this.inicializar.bind(this)
    	this.inicializarJuego()
		this.generarSecuencia()
		
		setTimeout(this.siguienteNivel, 500)
		
	}
	inicializarJuego(){
		this.siguienteNivel = this.siguienteNivel.bind(this)
		this.eligirColor = this.eligirColor.bind(this)
		this.toggleBotonEmpezar()
		// botonEmpezar.classList.add('hide')
		this.nivel = 1
		this.colores = {
			celeste,
			violeta,
			naranja,
			verde
		}

	}
	toggleBotonEmpezar(){
		if(botonEmpezar.classList.add('hide')){
			botonEmpezar.classList.remove('hide')


		}else{
			botonEmpezar.classList.add('hide')
		}

	}


	generarSecuencia(){
		this.secuencia = new Array(10).fill(0).map(n => Math.floor(Math.random() * 4))
	}

	siguienteNivel(){
	this.subnivel = 0

    this.iluminarSecuencia()
    this.agregarEventosClick()
	}

	tranformarNumeroAColor(numero){
		switch (numero){
			case 0:
			return 'celeste'
			case 1:
			return 'violeta'
			case 2:
			return 'naranja'
			case 3:
			return 'verde'
		}

	}

	tranformarColorANumero(color){
		switch (color){
			case 'celeste':
			return 0
			case 'violeta':
			return 1
			case 'naranja':
			return 2
			case  'verde':
			return 3
		}

	}
	iluminarSecuencia(){
		for(let i = 0; i<this.nivel; i++){
			const color = this.tranformarNumeroAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
		}
	}
	iluminarColor(color){
		
		this.colores[color].classList.add('light')
		
		setTimeout(() => this.apagarColor(color), 350)
	}
	apagarColor(color){
		this.colores[color].classList.remove('light')
	}
	agregarEventosClick(){
		this.colores.celeste.addEventListener('click', this.eligirColor)
		this.colores.verde.addEventListener('click', this.eligirColor)
		this.colores.violeta.addEventListener('click', this.eligirColor)
		this.colores.naranja.addEventListener('click', this.eligirColor)

	}

	eliminarEventoClick(){
        this.colores.celeste.removeEventListener('click', this.eligirColor)
		this.colores.verde.removeEventListener('click', this.eligirColor)
		this.colores.violeta.removeEventListener('click', this.eligirColor)
		this.colores.naranja.removeEventListener('click', this.eligirColor)


	}


	eligirColor(ev){
		const nombreColor = ev.target.dataset.color
	const numeroColor = this.tranformarColorANumero(nombreColor)

	if(numeroColor === this.secuencia[this.subnivel]){
		this.subnivel++
		if(this.subnivel === this.nivel){
			this.nivel++
			this.eliminarEventoClick()
		if(this.nivel === (ULTIMO_NIVEL + 1)){
			this.ganoElJuego()
		} else{
			// this.siguienteNivel()
			setTimeout(this.siguienteNivel, 2000)
		}
	 }
 
    }else{
    	this.perdioElJuego()
    }
  }
  ganoElJuego(){
  	swal('Platzi', 'Felicitaciones, ganaste', 'success')
  	.then(this.inicializar)
  }
  perdioElJuego(){
  	swal('Platzi', 'Lo sentiomos,Perdiste :(', 'error')
  	.then(() => {
  		this.eliminarEventoClick()
  		// this.inicializarJuego()
  	})
  }
}

function empezarJuego(){
	window.juego = new Juego()
}









