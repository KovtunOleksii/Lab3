let chessboard = document.querySelectorAll('.black, .white');

let step = 0;
let figures = [
    {figure: "&#9823;", name: "bPawn"},
    {figure: "&#9820;", name: "Rook"},
    {figure: "&#9821;", name: "Bishop"},
    {figure: "&#9822;", name: "Knight"},
    {figure: "&#9818;", name: "King"},
    {figure: "&#9819;", name: "Queen"},
    {figure: "&#9817;", name: "wPawn"},
    {figure: "&#9814;", name: "Rook"},
    {figure: "&#9815;", name: "Bishop"},
    {figure: "&#9816;", name: "Knight"},
    {figure: "&#9812;", name: "King"},
    {figure: "&#9813;", name: "Queen"},
];

function elementHighlight() {
    chessboard.forEach((element) => {
        element.addEventListener('click', () => {
            chessboard.forEach((elem) => {
                elem.classList.remove('highlighted');
                elem.classList.remove('possible');
            })
            if (element.innerHTML !== "") {
                element.classList.toggle('highlighted');
                getPossibleMoves(element);
            }
        });
    });
}

function horizontalMoves(possibleElem, element) {
    for (step = -8; step < 9; step += 1) {
        if (possibleElem.innerHTML === "" && parseInt(possibleElem.id) === parseInt(element.id) + step
            && Math.floor(parseInt(element.id) / 10) === Math.floor(parseInt(possibleElem.id) / 10)) {
            possibleElem.classList.add('possible');
        }
    }
}

function verticalMoves(possibleElem, element) {
    for (step = 80; step > -81; step -= 10) {
        if (possibleElem.innerHTML === "" && parseInt(possibleElem.id) === parseInt(element.id) + step) {
            possibleElem.classList.add('possible');
        }
    }
}

function diagonalMoves(possibleElem, element) {
    for (step = 77; step > -78; step -= 11) {
        if (possibleElem.innerHTML === "" && parseInt(possibleElem.id) === parseInt(element.id) + step
            && (parseInt(possibleElem.id) - parseInt(element.id)) % 11 === 0) {
            possibleElem.classList.add('possible');
        }
    }
    for (step = 63; step > -64; step -= 9) {
        if (possibleElem.innerHTML === "" && parseInt(possibleElem.id) === parseInt(element.id) + step
            && Math.abs(parseInt(possibleElem.id) - parseInt(element.id)) % 9 === 0) {
            if (parseInt(possibleElem.id) % 10 < parseInt(element.id) % 10 && Math.floor(parseInt(possibleElem.id) / 10) > Math.floor(parseInt(element.id) / 10)) {
                possibleElem.classList.add('possible');
            }
            if (parseInt(possibleElem.id) % 10 > parseInt(element.id) % 10 && Math.floor(parseInt(possibleElem.id) / 10) < Math.floor(parseInt(element.id) / 10)) {
                possibleElem.classList.add('possible');
            }
        }
    }
}

function getPossibleMoves(element) {
    // блок з відповідним елементом
    let temp = document.createElement("div");
    figures.forEach((elem) => {
        temp.innerHTML = elem.figure;
        if (element.innerHTML === temp.innerHTML) {
            switch (elem.name) {
                case "bPawn":
                    step = 10;
                    chessboard.forEach((possibleElem) => {
                        if (possibleElem.innerHTML === "" && parseInt(possibleElem.id) === parseInt(element.id) + step) {
                            possibleElem.classList.add('possible');
                        }
                    });
                    if (Math.floor(parseInt(element.id) / 10) === 2) {
                        step = 20;
                        chessboard.forEach((possibleElem) => {
                            if (possibleElem.innerHTML === "" && parseInt(possibleElem.id) === parseInt(element.id) + step) {
                                possibleElem.classList.add('possible');
                            }
                        });
                    }
                    break;
                case "wPawn":
                    step = -10;
                    chessboard.forEach((possibleElem) => {
                        if (possibleElem.innerHTML === "" && parseInt(possibleElem.id) === parseInt(element.id) + step) {
                            possibleElem.classList.add('possible');
                        }
                    });
                    if (Math.floor(parseInt(element.id) / 10) === 7) {
                        step = -20;
                        chessboard.forEach((possibleElem) => {
                            if (possibleElem.innerHTML === "" && parseInt(possibleElem.id) === parseInt(element.id) + step) {
                                possibleElem.classList.add('possible');
                            }
                        });
                    }
                    break;
                case "Rook":
                    chessboard.forEach((possibleElem) => {
                        verticalMoves(possibleElem, element);
                        horizontalMoves(possibleElem, element);
                    });
                    break;
                case "Bishop":
                    chessboard.forEach((possibleElem) => {
                        diagonalMoves(possibleElem, element);
                    });
                    break;
                case "Knight":
                    chessboard.forEach((possibleElem) => {
                        let steps = [8, -8, 12, -12, 19, -19, 21, -21];
                        steps.forEach((step) => {
                            if (possibleElem.innerHTML === "" && parseInt(possibleElem.id) === parseInt(element.id) + step) {
                                possibleElem.classList.add('possible');
                            }
                        });
                    });
                    break;
                case "King":
                    chessboard.forEach((possibleElem) => {
                        let steps = [1, -1, 9, -9, 10, -10, 11, -11];
                        steps.forEach((step) => {
                            if (possibleElem.innerHTML === "" && parseInt(possibleElem.id) === parseInt(element.id) + step) {
                                possibleElem.classList.add('possible');
                            }
                        });
                    });
                    break;
                case "Queen":
                    chessboard.forEach((possibleElem) => {
                        verticalMoves(possibleElem, element);
                        horizontalMoves(possibleElem, element);
                        diagonalMoves(possibleElem, element);
                    });
                    break;
            }
        }
    });
}

elementHighlight();