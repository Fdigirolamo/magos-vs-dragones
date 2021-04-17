new Vue({
    el: "#app",
    data: {
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelDragon: [5, 12],
        cantidadDeAtaquesEspeciales: 2,
        hayUnaPartidaEnJuego: false,
        saludDragon: 100,
        saludMago: 100,
        turnos: [],
        contadorAtaques: 0,
    },

    computed: {

    },

    methods: {
        finalizo() {
            if (this.saludDragon <= 0) {
                this.hayUnaPartidaEnJuego = false
                return "Perdio Dragón";
            } else if (this.saludMago <= 0) {
                this.hayUnaPartidaEnJuego = false
                return "Perdio Mago";
            }
        },
        empezarPartida() {
            if (this.hayUnaPartidaEnJuego === false) {
                this.saludDragon = 100
                this.saludMago = 100
                this.hayUnaPartidaEnJuego = true;
                this.contadorAtaques = 0
                th
            }
        },
        ataqueEspecial() {
            if (this.saludDragon <= 0 || this.saludMago <= 0) {
                alert(this.finalizo());
            }
            if (this.contadorAtaques < this.cantidadDeAtaquesEspeciales) {
                this.ataqueMago(this.rangoAtaqueEspecial);
                this.contadorAtaques++;
            } else {
                alert("No puede realizar mas ataques especiales");
            }
        },
        curar() {
            let curacion = 15;
            if (this.saludMago + curacion >= 100) {
                this.saludMago = 100;
            } else {
                this.saludMago += curacion;
            }
            this.ataqueDragon();

            this.turnos.unshift({
                esMago: true,
                text: `el mago se curo ${curacion}%`,
            });
        },
        terminarPartida() {
            alert("Te rendiste y perdiste Mago")
            this.hayUnaPartidaEnJuego = false
        },

        atacar() {

            if (this.saludDragon <= 0 || this.saludMago <= 0) {
                alert(this.finalizo())
            } else {
                this.ataqueMago(this.rangoAtaque);
                this.ataqueDragon();
            }
        },
        // rangoAtaque: [3, 10],
        ataqueMago(rango) {
            ataqueMago = Math.random() * (rango[0] - rango[1]) + rango[1];
            if ((this.saludDragon - ataqueMago) < 0) {
                this.saludDragon = 0;

                this.turnos.unshift({
                    esMago: true,
                    text: `el mago ataco ${ataqueMago}%`,
                });
            } else {
                this.saludDragon -= ataqueMago;
                this.saludDragon = Math.trunc(this.saludDragon);

                this.turnos.unshift({
                    esMago: true,
                    text: `el mago ataco ${ataqueMago}%`,
                });
            }
        },
        ataqueDragon() {
            ataqueDragon = Math.random() * (12 - 5) + 5;
            if ((this.saludMago - ataqueDragon) < 0) {
                this.saludMago = 0
                this.turnos.unshift({
                    esMago: false,
                    text: `el dragon ataco ${ataqueDragon}%`,
                });
            } else {
                this.saludMago -= ataqueDragon;
                this.saludMago = Math.trunc(this.saludMago)
                this.turnos.unshift({
                    esMago: false,
                    text: `el dragon ataco ${ataqueDragon}%`,
                });

            }
        },
        cssParaLaFila(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                "player-turno": turno.esMago,
                "monster-turno": !turno.esMago,
            };
        },
    },
});