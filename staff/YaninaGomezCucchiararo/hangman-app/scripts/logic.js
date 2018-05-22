'use strict'

// TODO

class Hangman {

    constructor(word, attempts = 10) {

        if (word === undefined) throw Error('invalid word ' + word);

        this.word = word.trim();
        this._attempts = attempts;


        this.arrWord = [];

        for (var i = 0; i < this.word.length; i++) {
            this.arrWord.push('_');
        }

    }

    try(str) {

        if (str === undefined){
            throw Error ("invalid letter or word " + str);
        }


        //comprobar el str q nos han pasado y decir True o False
        if (typeof str === "string") {

            if (str.length === 1) {

                let found = false;
                this.word.split('').map((letter, index) => {
                    if (letter === str) {
                        this.arrWord[index] = str;
                        found = true;
                    }
                });

                if (found === false) {
                    this._attempts -= 1;
                }
                return found
            } else {
                if (str === this.word) {
                    this.arrWord = this.word.split("");
                    return true;
                } else {
                    this._attempts = 0;
                    return false;
                }
            }


        } else {
            throw Error('invalid input letter or word');
        }

    }

    guessed() {
        return this.arrWord;
        //si arrWord no tiene '_' ---> Hangman.WIN
    }

    status() {


        if (!this.arrWord.includes('_')) { //si no encuentra espacios...es que ha ganado
            return Hangman.WIN;

        } else {

            if (this._attempts > 0) {
                return Hangman.CONTINUE;

            } else if (this._attempts === 0) {
                return Hangman.LOSE;
            }
        }
    }

    attempts(){
            return this._attempts;
        }
    }

    Hangman.CONTINUE = 'CONTINUE';
    Hangman.LOSE = 'LOSE';
    Hangman.WIN = 'WIN';

