// Original imagesLinkArray to be used for resetting
const originalImagesLinkArray = [
    {
        id: 1,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/AngularImage.png',
        newAlt: 'Angular Image'
    },
    {
        id: 2,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102835/html5Image.png',
        newAlt: 'HTML Image'
    },
    {
        id: 3,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102834/JSImage.jpg',
        newAlt: 'JavaScript Image'
    },
    {
        id: 4,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/reactImage.png',
        newAlt: 'React Image'
    },
    {
        id: 5,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/vueImage.png',
        newAlt: 'Vue Image'
    },
    {
        id: 6,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102834/JSImage.jpg',
        newAlt: 'JavaScript Image'
    },
    {
        id: 7,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/vueImage.png',
        newAlt: 'Vue Image'
    },
    {
        id: 8,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102835/html5Image.png',
        newAlt: 'HTML Image'
    },
    {
        id: 9,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102834/CSS3Image.png',
        newAlt: 'CSS Image'
    },
    {
        id: 10,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/AngularImage.png',
        newAlt: 'Angular Image'
    },
    {
        id: 11,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102834/CSS3Image.png',
        newAlt: 'CSS Image'
    },
    {
        id: 12,
        image: 'https://media.geeksforgeeks.org/wp-content/uploads/20231122102833/reactImage.png',
        newAlt: 'React Image'
    }
];

const cards = document.getElementsByClassName('card');
let allImages = document.getElementsByClassName('card-image');
let movesDisplay = document.querySelector('.move-counter');
let toggledCardsArray = [];
let move = 0;
let winCount = 0;
const restart = document.getElementById('restart');

let imagesLinkArray = [...originalImagesLinkArray]; // Initialize with a copy of the original array
function startGame() {
    // Hide the instruction overlay
    instructionOverlay.style.display = 'none';
    
    // Initialize the game logic here
    // For example, you might want to shuffle cards or start a timer
}


const restartGame = () => {
    let toggledCard = document.getElementsByClassName('card toggled');
    imagesLinkArray = [...originalImagesLinkArray]; // Reset to original array
    imagesLinkArray.sort(() => Math.random() - 0.5);
    
    Array.from(toggledCard).forEach(function (el) {
        setTimeout(() => {
            el.classList.remove("toggled");
        }, 0);
    });

    toggledCardsArray.length = 0;
    move = 0;
    winCount = 0;
    movesDisplay.innerText = `Moves: ${move}`;
    
    let allImagesSrc = document.getElementsByClassName('card-image');
    Array.from(allImagesSrc).forEach((el, index) => {
        el.src = imagesLinkArray[index].image;
        el.alt = imagesLinkArray[index].newAlt;
        el.id = imagesLinkArray[index].id;
    });
};

restart.addEventListener('click', restartGame);

// Checking for the last clicked and current clicked cards and applying changes accordingly
for (let i = 0; i < cards.length; i++) {
    cards[i].addEventListener('click', function () {
        this.classList.add("toggled");
        toggledCardsArray.push(this);
        let thisImgSrc = this.querySelector('.card-image').src;
        let previousImgSrc = toggledCardsArray[toggledCardsArray.length - 2].querySelector('.card-image').src;
        
        if (thisImgSrc !== previousImgSrc) {
            toggledCardsArray.forEach(function (el) {
                setTimeout(() => {
                    el.classList.remove("toggled");
                }, 500);
            });
            toggledCardsArray.length = 0;
            move++;
        } else {
            toggledCardsArray.length = 0;
            move++;
            winCount++;
        }

        movesDisplay.innerText = `Moves: ${move}`;

        if (winCount === 6) {
            setTimeout(() => {
                Swal.fire({
                    title: 'Congratulations!!!',
                    text: `You won the game in ${move} moves.`,
                    icon: 'success',
                    confirmButtonText: 'Go To the Exercise!',
                    // Callback function when the "Restart!" button is clicked
                    preConfirm: () => {
                        window.location.href = '../../LEVEL 1/Game/Questions/3.1.html'; // Replace with the path to your new HTML file
                    }
                });
            }, 300);
        }
        
    });
}
