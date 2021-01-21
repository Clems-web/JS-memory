// --- Cards ---
let cardsArray = [
    {
        name: "banana",
        img: "./banana.jpg"
    },
    {
        name: "banana",
        img: "./banana.jpg"
    },
    {
        name: "fig",
        img: "./fig.jpg"
    },
    {
        name: "fig",
        img: "./fig.jpg"
    },
    {
        name: "kiwi",
        img: "./kiwi.jpg"
    },
    {
        name: "kiwi",
        img: "./kiwi.jpg"
    },
    {
        name: "lemon",
        img: "./lemon.jpg"
    },
    {
        name: "lemon",
        img: "./lemon.jpg"
    },
    {
        name: "orange",
        img: "./orange.jpg"
    },
    {
        name: "orange",
        img: "./orange.jpg"
    },
    {
        name: "pineapple",
        img: "./pineapple.jpg"
    },
    {
        name: "pineapple",
        img: "./pineapple.jpg"
    },
    {
        name: "strawberries",
        img: "./strawberries.jpg"
    },
    {
        name: "strawberries",
        img: "./strawberries.jpg"
    },
    {
        name: "pomegranate",
        img: "./pomegranate.jpg"
    },
    {
        name: "pomegranate",
        img: "./pomegranate.jpg"
    }
];
    /* Shuffle our cards */
cardsArray.sort(() => 0.5 - Math.random());

    /* Variables */
const container = document.getElementById("container");
let count = document.getElementById("count");
let score = 0;
count.innerHTML = "Votre score : " + score + "/8";

let cardSelected = [];
let cardSelectedId = [];
let cardWon = [];

// --- functions ---
    /*For each cards we have in our array, we create an element "img" with a basic background + a listener */
function CreateBoard() {
    for (let x = 0; x < cardsArray.length; x++) {
        let card = document.createElement("img");
        card.setAttribute("src", "./logo.jpg");
        card.setAttribute("data-id", x);
        card.addEventListener("click", flipCard);
        container.append(card);
    }
}
    /* We check if those 2 selected cards are the same */
function checkForSame() {
    let cards = document.querySelectorAll("img");
    let firstCard = cardSelectedId[0];
    let secondCard = cardSelectedId[1];

    /* I'm checking if their .name are identical AND if their data-id is DIFFERENT ! (We don't want to dbl click the same image to win) */
    if ((cardSelected[0] === cardSelected[1]) && (cardSelectedId[0] !== cardSelectedId[1])) {
        cards[firstCard].setAttribute("src", "./checked.png");
        cards[secondCard].setAttribute("src", "./checked.png");

        /* If it's valid then we remove the listener associated with so we can't click it anymore */
        cards[firstCard].removeEventListener("click", flipCard);
        cards[secondCard].removeEventListener("click", flipCard);

        /* We stock the correct answer */
        cardWon.push(cardSelected);
        score++;
        count.innerHTML = "Votre score : " + score + "/8";
    }
        /* If they're not the same then we reset them like they were before selecting them */
    else {
        cards[firstCard].setAttribute("src", "./logo.jpg");
        cards[secondCard].setAttribute("src", "./logo.jpg");
    }
    cardSelected = [];
    cardSelectedId = [];

        /* when we finish the game, we praise the player and then propose to restart again */
    if (cardWon.length === (cardsArray.length / 2)) {
        let creaButton = document.createElement("button");
        creaButton.innerHTML = "Restart";
        creaButton.addEventListener("click", function () {
            window.location.reload();
        });
        count.innerHTML = "GGWP ";
        count.append(creaButton);
    }
}

    /* Reveal the true card's image, select two of them and send them to check if it's a match */
function flipCard() {
 let cardId = this.getAttribute("data-id");
 cardSelected.push(cardsArray[cardId].name);
 cardSelectedId.push(cardId);
 this.setAttribute("src", cardsArray[cardId].img);

 if (cardSelected.length === 2) {
    setTimeout(checkForSame, 700)
 }
}

// --- StartGame ---
CreateBoard();