'use strict';

const Hangman = (function () {
    class Hangman {
        constructor(word, attempts) {
            if (typeof word !== 'string') throw Error('invalid word ' + word)

            this._word = word.trim()

            if (!this._word.length) throw Error('word cannot empty or blank')

            this._attempts = attempts || 10

            if (typeof this._attempts !== 'number') throw Error('invalid attempts ' + this._attempts)

            if (this._attemps <= 0) throw Error('invalid number of attempts ' + this._attempts)

            this._guessed = new Array(this._word.length).fill('_')

            this._status = Hangman.CONTINUE
        }

        guessed() {
            return this._guessed
        }

        attempts() {
            return this._attempts
        }

        status() {
            
            return this._status
        }

        try(text) {
            if (typeof text !== 'string') throw Error('invalid letter or word ' + text)

            text = text.trim();

            if (!text.length) throw Error('text cannot empty or blank');

            if (this._status === Hangman.CONTINUE && this._attempts > 0)
                return text.length === 1 ? tryLetter(this, text) : tryWord(this, text)

            return false;
        }

        static get CONTINUE() { return 0 }

        static get WIN() { return 1 }

        static get LOSE() { return 2 }
    }

    function tryLetter(target, letter) {
        const index = target._word.indexOf(letter)

        let match = false

        if (index > -1) {
            for (let i = index; i < target._word.length; i++) {
                const char = target._word[i]

                if (char === letter) target._guessed[i] = char
            }

            match = true
        } else target._attempts--

        update(target)

        return match
    }

    function tryWord(target, word) {
        let match = false

        if (word === target._word) {
            for (var i = 0; i < target._word.length; i++)
                target._guessed[i] = target._word[i]

            match = true
        } else target._attempts = 0

        update(target)

        return match
    }

    function update(target) {
        if (!target._attempts)
            target._status = Hangman.LOSE
        else if (target._guessed.indexOf('_') === -1)
            target._status = Hangman.WIN
        else
            target._status = Hangman.CONTINUE
    }

    return Hangman
})()