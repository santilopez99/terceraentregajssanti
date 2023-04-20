// Defini la clase Prestamo
class Prestamo {
	constructor(monto, plazo) {
		this.monto = monto;
		this.plazo = plazo;
		this.tasa = 0.1; // Tasa de interés del 10%
	}

	cuotaMensual() {
		const tasaMensual = this.tasa / 12;
		const cuota = this.monto * tasaMensual / (1 - Math.pow(1 + tasaMensual, -this.plazo));
		return cuota;
	}

	totalIntereses() {
		const cuota = this.cuotaMensual();
		const totalIntereses = cuota * this.plazo - this.monto;
		return totalIntereses;
	}
}

// hago una funcion para calcular el préstamo
function calcular() {
	// Obtener los valores de los inputs
	const monto = Number(document.getElementById('monto').value);
	const plazo = Number(document.getElementById('plazo').value);

	// Crear el objeto Prestamo
	const prestamo = new Prestamo(monto, plazo);

	// Mostrar los resultados
	const cuota = prestamo.cuotaMensual().toFixed(2);
	const totalIntereses = prestamo.totalIntereses().toFixed(2);
	document.getElementById('resultado').innerHTML = `Cuota mensual: $${cuota}<br>Total de intereses: $${totalIntereses}`;
	document.getElementById('resultado').style.display = 'block';
}

// le asigno un evento click al botón "Calcular"
const btNCalcular = document.getElementById('calcular');
btNCalcular.addEventListener('click', calcular);
// Función para calcular el préstamo y guardar los resultados en LocalStorage
function calcular() {
	// Obtener los valores de los inputs
	const monto = Number(document.getElementById('monto').value);
	const plazo = Number(document.getElementById('plazo').value);

	// Verifico si los campos están vacíos
	if (!monto || !plazo) {
		// Mostrar un mensaje de error
		document.getElementById('resultado').innerHTML = 'Por favor, complete todos los campos.';
		document.getElementById('resultado').style.color = 'red';
		document.getElementById('resultado').style.display = 'block';
		return;
	}

	// Creao el objeto Prestamo
	const prestamo = new Prestamo(monto, plazo);

	// Guardo los resultados en un objeto JSON
	const resultado = {
		monto: monto,
		plazo: plazo,
		cuota: prestamo.cuotaMensual().toFixed(2),
		totalIntereses: prestamo.totalIntereses().toFixed(2)
	};

	// Guardo el objeto JSON en LocalStorage
	localStorage.setItem('resultado', JSON.stringify(resultado));

	// Muestro los resultados
	cargarResultados();
}


// Realizo una función para cargar los resultados desde LocalStorage y mostrarlos en la página
function cargarResultados() {
	const resultadoJSON = localStorage.getItem('resultado');
	if (resultadoJSON !== null) {
		const resultado = JSON.parse(resultadoJSON);
		document.getElementById('resultado').innerHTML = `Cuota mensual: $${resultado.cuota}<br>Total de intereses: $${resultado.totalIntereses}`;
		document.getElementById('resultado').style.display = 'block';
	}
}

// Asigno un evento click al botón "Calcular"
const btnCalcular = document.getElementById('calcular');
btnCalcular.addEventListener('click', calcular);

// Cargo los resultados al cargar la página
window.addEventListener('load', cargarResultados);
// Función para resetear los campos de entrada y los resultados
function resetear() {
	// Reseteo los campos de entrada
	document.getElementById('monto').value = '';
	document.getElementById('plazo').value = '';

	// Remuevo los resultados del LocalStorage
	localStorage.removeItem('resultado');

	// Oculto los resultados
	document.getElementById('resultado').style.display = 'none';
}

// Asigno otro evento click al botón pero esta vez "Restablecer"
const btnResetear = document.getElementById('resetear');
btnResetear.addEventListener('click', resetear);
