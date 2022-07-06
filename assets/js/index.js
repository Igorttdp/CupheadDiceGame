function theDiceGame() {
    // DOM MANIPULATION
    const scoreContainer = document.querySelector('.scoreContainer');
    const start = document.querySelector('.start');
    const restartBtn = document.querySelector('#restart');
    const mrKDiceContainer = document.querySelector(".kingDiceContainer")
    const mrKDice = document.querySelector('#kingDice');
    const title = document.querySelector('#title');
    const btnsDiv = document.querySelector('.interactBtns');
    const mode = document.querySelectorAll('.mode');
    const refresh = document.querySelector('.refresh');
    const gamemodesBtn = document.querySelector('#gamemodesBtn');
    const gamemodesContainer = document.querySelector('#gamemodesContainer');
    const openMenuDiv = document.querySelector('#menu');
    const menuBtn = document.querySelector('#openMenuBtn');
    const explanation = document.querySelector("#explanation")
    const openExplanation = document.querySelector("#open");
    const closeExplanation = document.querySelector('.closeExplanation');
    const explanationBox = document.querySelector('#explanationBox');
    const kingDiceExplanation = document.querySelector('#kingDiceExplanation');
    const setP1Score = document.querySelector('#p1Score');
    const setP2Score = document.querySelector('#p2Score');
    const remainingMoves = document.querySelector('#moves');

    function kingDiceStyle() {
        mrKDice.removeAttribute('style');
        mrKDice.classList.add('kingOpacity');
        mrKDice.style.width = '50%';
        mrKDice.style.top = '130px';
        mrKDice.style.zIndex = '0'
        title.style.bottom = '185px';
        title.style.position = 'relative';
        title.style.color = 'blueviolet';
    }

    function menuInteraction() {
        function openMenu() {
            openExplanation.style.display = 'block'
            gamemodesBtn.style.display = 'block'
            openMenuDiv.style.transform = 'translateX(200%)'
            explanation.style.transition = 'all 2s'
            explanation.style.transform = 'translateX(0)'
        }

        openMenuDiv.style.transform = 'translateX(0)'
        menuBtn.onclick = () => {
            openMenu()
        }
    }

    function showScore() {
        scoreContainer.style.transform = 'translateX(0)';
    }

    (function setScoreNames() {
        const p1ScoreName = document.querySelector('#tableP1Name');
        const p2ScoreName = document.querySelector('#TableP2Name');
        let name1 = document.querySelector('#name1').value;
        let name2 = document.querySelector('#name2').value
        if (name1 == '') {
            name1 = 'Player 1';
        }

        if (name2 == '') {
            name2 = 'Player 2';
        }

        p1ScoreName.innerText = name1;
        p2ScoreName.innerText = name2;
    })();

    (function gamemode() {
        function openGamemodes() {
            btnsDiv.style.display = 'none';
            gamemodesContainer.style.display = 'flex';
        }

        function closeGamemodes() {
            btnsDiv.style.display = 'flex';
            gamemodesContainer.style.display = 'none';
        }

        function reset() {
            mode.forEach(e => e.style.display = 'none');
            refresh.style.display = 'block';
            refresh.onclick = () => {
                location.reload();
            }
        }

        function delayAnimation() {
            setTimeout(() => {
                mrKDiceContainer.style.transform = 'translateY(-200%)'
                explanation.style.transform = 'translateX(200%)';
                start.classList.add('roll');
                setTimeout(() => {
                    start.removeAttribute('disabled');
                    start.style.border = '1px solid';
                    start.style.transition = 'all .3s';
                }, 1000)
            }, 1500)
        }

        gamemodesBtn.onclick = () => {
            openGamemodes();
        }

        start.onclick = () => {
            if (start.classList.contains('selectGamemode')) {
                openGamemodes();
                start.classList.remove('selectGamemode');
            } else {
                mrKDiceContainer.removeAttribute('style');
                mrKDiceContainer.style.transition = 'none';
                return
            }
        }

        function larger(a, b) {
            if (a > b) return a;
            else return b;
        }

        function smaller(a, b) {
            if (a < b) return a;
            else return b;
        }

        function bestOf3() {
            start.classList.remove('selectGamemode');
            start.setAttribute('disabled', 'disabled');
            start.innerText = 'Roll the Dice';
            delayAnimation();

            let moves = 3;
            remainingMoves.innerText = moves;

            let count = 0;
            let scoreP1 = 0;
            let scoreP2 = 0;

            function scoreId(id) {
                if (id === 'p1') return 1;
                else if (id === 'p2') return 2;
                else return;
            }

            function score(scoreId) {
                if (scoreId === 1) {
                    scoreP1++
                    setP1Score.innerText = scoreP1;
                    return scoreP1;
                } else if (scoreId === 2) {
                    scoreP2++
                    setP2Score.innerText = scoreP2;
                    return scoreP2;
                }
            }

            function restartBO3() {
                restartBtn.classList.remove('restart');
                restartBtn.onclick = () => {
                    count = 0;
                    scoreP1 = 0;
                    scoreP2 = 0;
                    moves = 3;
                    start.classList.add('roll');
                    start.removeAttribute('disabled');
                    start.innerText = 'Roll the Dice';
                    mrKDice.style.display = 'none';
                    title.style.position = 'unset';
                    title.style.color = '#fff'
                    title.innerText = '';
                    restartBtn.classList.add('restart');
                    setP1Score.innerText = '0';
                    setP2Score.innerText = '0';
                    remainingMoves.innerText = moves;
                    cuphead.setAttribute('src', 'assets/images/cuphead.png');
                    mugman.setAttribute('src', 'assets/images/mugman.png');
                }
            }

            function executeGame() {
                const diceValues = randomDice();
                setDice(diceValues);
                score(scoreId(setIdWinner(diceValues, 'free')));
                setWinner(winner(setIdWinner(diceValues, 'free'), 3, true));
            }

            function endGame() {
                const diceValues = randomDice();
                setCharacter(setIdWinner(diceValues, 3, scoreP1, scoreP2));
                setWinner(winner(setIdWinner(diceValues, 3, scoreP1, scoreP2)), 3, false);
                kingDiceStyle();
                start.classList.remove('roll');
                start.setAttribute('disabled', 'disabled');
                start.innerText = 'End Game';
            }

            start.addEventListener('click', () => {
                count++
                moves--

                remainingMoves.innerText = moves
                explanation.style.transform = 'translateX(200%)'
                menuInteraction();
                start.innerText = 'Roll Again'
                mrKDice.style.display = 'none';
                title.style.position = 'unset'
                mrKDiceContainer.style.justifyContent = 'center';

                if (count <= 3) {
                    executeGame();
                    if (scoreP1 === 2) {
                        count++
                        endGame();
                        restartBO3();
                    }

                    if (scoreP2 === 2) {
                        count++
                        endGame();
                        restartBO3();
                    }

                    if (count >= 3 && larger(scoreP1, scoreP2) - smaller(scoreP1, scoreP2) !== 0) {
                        endGame();
                        restartBO3();
                    }
                } else {
                    if (larger(scoreP1, scoreP2) - smaller(scoreP1, scoreP2) === 0) {
                        count++;
                        executeGame();
                        if (larger(scoreP1, scoreP2) - smaller(scoreP1, scoreP2) !== 0) {
                            endGame();
                            restartBO3();
                        }
                    } else {
                        endGame();
                        restartBO3();
                    }
                }
            });
        }

        function bestOf5() {
            start.classList.remove('selectGamemode');
            start.setAttribute('disabled', 'disabled');
            start.innerText = 'Roll the Dice';
            delayAnimation();

            let moves = 5;
            remainingMoves.innerText = moves;

            let count = 0;
            let scoreP1 = 0;
            let scoreP2 = 0;

            function scoreId(id) {
                if (id === 'p1') return 1;
                else if (id === 'p2') return 2;
                else return
            }

            function score(scoreId) {
                if (scoreId === 1) {
                    scoreP1++
                    setP1Score.innerText = scoreP1;
                    return scoreP1;
                } else if (scoreId === 2) {
                    scoreP2++
                    setP2Score.innerText = scoreP2;
                    return scoreP2;
                }
            }

            function restartBO5() {
                restartBtn.classList.remove('restart');
                restartBtn.onclick = () => {
                    count = 0;
                    scoreP1 = 0;
                    scoreP2 = 0;
                    moves = 5;
                    start.classList.add('roll');
                    start.removeAttribute('disabled');
                    start.innerText = 'Roll the Dice';
                    mrKDice.style.display = 'none';
                    title.style.position = 'unset';
                    title.style.color = '#fff'
                    title.innerText = '';
                    restartBtn.classList.add('restart');
                    setP1Score.innerText = '0';
                    setP2Score.innerText = '0';
                    remainingMoves.innerText = moves;
                    cuphead.setAttribute('src', 'assets/images/cuphead.png');
                    mugman.setAttribute('src', 'assets/images/mugman.png');
                }
            }

            function executeGame() {
                const diceValues = randomDice();
                setDice(diceValues);
                score(scoreId(setIdWinner(diceValues, 'free')));
                setWinner(winner(setIdWinner(diceValues, 'free'), 3, true));
            }

            function endGame() {
                const diceValues = randomDice();
                setCharacter(setIdWinner(diceValues, 3, scoreP1, scoreP2));
                setWinner(winner(setIdWinner(diceValues, 3, scoreP1, scoreP2)), 3, false);
                kingDiceStyle();
                start.classList.remove('roll');
                start.setAttribute('disabled', 'disabled');
                start.innerText = 'End Game';
            }

            start.addEventListener('click', () => {
                count++
                moves--

                remainingMoves.innerText = moves
                explanation.style.transform = 'translateX(200%)'
                menuInteraction();
                start.innerText = 'Roll Again'
                mrKDice.style.display = 'none';
                title.style.position = 'unset'
                mrKDiceContainer.style.justifyContent = 'center';

                if (count <= 5) {
                    executeGame();
                    if (scoreP1 === 3) {
                        count++
                        endGame();
                        restartBO5();
                    }

                    if (scoreP2 === 3) {
                        count++
                        endGame();
                        restartBO5();
                    }

                    if (count >= 5 && larger(scoreP1, scoreP2) - smaller(scoreP1, scoreP2) !== 0) {
                        endGame();
                        restartBO5();
                    }
                } else {
                    if (larger(scoreP1, scoreP2) - smaller(scoreP1, scoreP2) === 0) {
                        count++;
                        executeGame();
                        if (larger(scoreP1, scoreP2) - smaller(scoreP1, scoreP2) !== 0) {
                            endGame();
                            restartBO5();
                        }
                    } else {
                        endGame();
                        restartBO5();
                    }
                }
            });

        }

        function normal() {
            scoreContainer.removeAttribute('style');
            restartBtn.classList.add('restart');
            start.classList.remove('selectGamemode');
            start.setAttribute('disabled', 'disabled');
            start.innerText = 'Roll the Dice';
            delayAnimation();
            start.addEventListener('click', () => {
                explanation.style.transform = 'translateX(200%)'
                menuInteraction();
                start.innerText = 'Roll Again'
                mrKDice.style.display = 'none';
                title.style.position = 'unset'
                mrKDiceContainer.style.justifyContent = 'center';
                const diceValues = randomDice();
                setDice(diceValues);
                setWinner(winner(setIdWinner(diceValues, 'free'), 'free'));
                setCharacter(setIdWinner(diceValues, 'free'))
            });
        }

        document.addEventListener('click', (e) => {
            el = e.target;

            if (el.classList.contains('BO3')) {
                el.classList.add('active');
                setTimeout(() => {
                    closeGamemodes();
                    menuInteraction();
                    showScore();
                    reset();
                }, 1000);
                bestOf3();
            }

            if (el.classList.contains('BO5')) {
                el.classList.add('active');
                setTimeout(() => {
                    closeGamemodes();
                    menuInteraction();
                    showScore();
                    reset();
                }, 1000)
                bestOf5();
            }

            if (el.classList.contains('normal')) {
                el.classList.add('active');
                setTimeout(() => {
                    closeGamemodes();
                    menuInteraction();
                    reset();
                }, 1000);
                normal();
            }

        });


        (function explanationFunc() {
            openExplanation.onclick = () => {
                gamemodesBtn.style.display = 'none';
                openExplanation.style.display = 'none';
                explanation.style.maxWidth = '500px';
                explanationBox.style.display = 'block';
                kingDiceExplanation.setAttribute('src', 'assets/images/kingDiceTalking.png')
            }

            closeExplanation.onclick = () => {
                explanation.style.right = ('-80px')
                explanation.style.transition = ('none')
                kingDiceExplanation.setAttribute('src', 'assets/images/kingDiceDisappearing.gif')
                explanationBox.style.display = 'none';
                setTimeout(() => {
                    explanation.removeAttribute('style');
                    explanation.style.transition = 'none';
                    explanation.style.transform = 'translateX(200%)';
                    kingDiceExplanation.setAttribute('src', "assets/images/kingDice'sExplanation.png")
                    menuInteraction();
                }, 2000);
            }
        })();

        (function setPlayersName() {
            const p1Form = document.querySelector('#p1Form');
            const p2Form = document.querySelector('#p2Form');
            const editP1 = document.querySelector('#pencil1');
            const editP2 = document.querySelector('#pencil2');
            const p1info = document.querySelector('#p1info');
            const p2info = document.querySelector('#p2info');
            const p1Name = document.querySelector('#p1Name');
            const p2Name = document.querySelector('#p2Name');

            editP1.addEventListener('click', () => {
                p1info.style.display = 'none';
                p1Form.style.display = 'block';
            })

            editP2.addEventListener('click', () => {
                p2info.style.display = 'none';
                p2Form.style.display = 'block';

            })

            p1Form.addEventListener('submit', (e) => {
                e.preventDefault();
                const el = e.target

                function setP1Name() {
                    const name1 = document.querySelector('#name1').value;
                    p1Name.innerText = name1;
                }
                setP1Name();

                if (el.classList.contains('editPlayer')) {
                    p1info.style.display = 'flex';
                    p1Form.style.display = 'none';
                }
            })

            p2Form.addEventListener('submit', (e) => {
                e.preventDefault();
                const el = e.target

                function setP2Name() {
                    const name2 = document.querySelector('#name2').value;
                    p2Name.innerText = name2;
                }
                setP2Name();

                if (el.classList.contains('editPlayer')) {
                    p2info.style.display = 'flex';
                    p2Form.style.display = 'none';
                }
            })
        })();

        // GAME SCRIPT

        function randomDice() {
            let diceRandom1 = Math.random() * (6 - 1) + 1;
            let diceRandom2 = Math.random() * (6 - 1) + 1;
            diceRandom1 = Math.round(diceRandom1);
            diceRandom2 = Math.round(diceRandom2);
            const diceValues = [diceRandom1, diceRandom2];
            return diceValues;
        }

        function setDice(diceValues) {
            const dice1 = document.querySelector('.img1');
            const dice2 = document.querySelector('.img2');

            (function setDiceOne() {
                if (diceValues[0] === 1) {
                    dice1.setAttribute('src', 'assets/images/dice1.png')
                } else if (diceValues[0] === 2) {
                    dice1.setAttribute('src', 'assets/images/dice2.png')
                } else if (diceValues[0] === 3) {
                    dice1.setAttribute('src', 'assets/images/dice3.png')
                } else if (diceValues[0] === 4) {
                    dice1.setAttribute('src', 'assets/images/dice4.png')
                } else if (diceValues[0] === 5) {
                    dice1.setAttribute('src', 'assets/images/dice5.png')
                } else if (diceValues[0] === 6) {
                    dice1.setAttribute('src', 'assets/images/dice6.png')
                }
            })();

            (function setDiceTwo() {
                if (diceValues[1] === 1) {
                    dice2.setAttribute('src', 'assets/images/dice1.png')
                } else if (diceValues[1] === 2) {
                    dice2.setAttribute('src', 'assets/images/dice2.png')
                } else if (diceValues[1] === 3) {
                    dice2.setAttribute('src', 'assets/images/dice3.png')
                } else if (diceValues[1] === 4) {
                    dice2.setAttribute('src', 'assets/images/dice4.png')
                } else if (diceValues[1] === 5) {
                    dice2.setAttribute('src', 'assets/images/dice5.png')
                } else if (diceValues[1] === 6) {
                    dice2.setAttribute('src', 'assets/images/dice6.png')
                }
            })();
        }
    })();

    function winner(id, mode, showPoints) {
        const playerWinner = document.querySelector('.winner');
        let name1 = document.querySelector('#name1').value;
        let name2 = document.querySelector('#name2').value
        if (name1 == '') {
            name1 = 'Player 1';
        }

        if (name2 == '') {
            name2 = 'Player 2';
        }

        if (mode === 'free') {
            if (id === 'p1') return `${name1} Won`;
            else if (id === 'p2') return `${name2} Won`;
            else return "A tie! Roll Again";
        }
        else if (mode === 3) {
            if (showPoints === true) {
                playerWinner.style.fontSize = '5rem';
                if (id === 'p1') return `${name1} won a point`;
                else if (id === 'p2') return `${name2} won a point`;
                else return "A tie! Roll Again";
            }
        }

        playerWinner.style.fontSize = '8rem';
        if (id === 'p1') return `${name1} <span class="behind">Won</span>`;
        else if (id === 'p2') return `<span class="behind">${name2.slice(0, 5)}</span>${name2.slice(5)} Won`;
    }

    function setIdWinner(diceValues, mode, scoreP1, scoreP2) {
        if (mode === 3) {
            if (scoreP1 > scoreP2) {
                return 'p1';
            }
            else if (scoreP2 > scoreP1) {
                return 'p2';
            }
        }

        if (mode === 'free') {
            if (diceValues[0] > diceValues[1]) {
                return 'p1';
            }
            else if (diceValues[1] > diceValues[0]) {
                return 'p2';
            }
        }
    }

    function setCharacter(winner) {
        const cuphead = document.querySelector('#cuphead');
        const mugman = document.querySelector('#mugman');
        const mrKDice = document.querySelector('#kingDice');

        if (winner === 'p1') {
            cuphead.setAttribute('src', 'assets/images/cuphead.png');
            mugman.setAttribute('src', 'assets/images/mugmanSoul.png');
            mrKDice.setAttribute('src', "assets/images/kingDiceWon1.png")
        }
        else if (winner === 'p2') {
            mugman.setAttribute('src', 'assets/images/mugman.png');
            cuphead.setAttribute('src', 'assets/images/cupheadSoul.png');
            mrKDice.setAttribute('src', "assets/images/kingDiceWon2.png");
        }
        else {
            cuphead.setAttribute('src', 'assets/images/cuphead.png');
            mugman.setAttribute('src', 'assets/images/mugman.png');
        }
    }


    function setWinner(winner) {
        const playerWinner = document.querySelector('.winner');
        playerWinner.innerHTML = winner;
    }
}
theDiceGame()