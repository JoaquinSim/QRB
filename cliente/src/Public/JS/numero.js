class obtenerNumero {
    constructor() {
        this.numero = document.getElementById('numero')
        this.numero1 = document.getElementById('numero1')
        this.numero2 = document.getElementById('numero2')
    }
    aumento() {
        if (this.numero.value === '') {
            this.numero.value = 1
        } else {
            this.numero.value = parseInt(this.numero.value) + 1
        }

        if (this.numero1.value === '') {
            this.numero1.value = 1
        } else {
            this.numero1.value = parseInt(this.numero1.value) + 1
        }

        if (this.numero2.value === '') {
            this.numero2.value = 1
        } else {
            this.numero2.value = parseInt(this.numero2.value) + 1
        }
    }
}

let numeros = new obtenerNumero()

window.onload = numeros.aumento()