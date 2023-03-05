const horses = [
    'Secretariat',
    'Eclipse',
    'West Australian',
    'Flying Fox',
    'Seabiscuit'
];

let racesCounter = 0;

const refs = {
    startBtn: document.querySelector('.js-start-race'),
    winnerField: document.querySelector('.js-winner'),
    progressField: document.querySelector('.js-progress'),
    tableBody: document.querySelector('.js-results-table > tbody')
};

refs.startBtn.addEventListener('click', () => {
    racesCounter += 1;
    const promises = horses.map(run);
    updateWinnerField('');
    updateProgressField('🏇 Race has just begun! Bids are not accepted! 🏇');
    determineWinner(promises, racesCounter);
    WaitForAll(promises);
});

function run(horse) {
    return new Promise((resolve, reject) => {
        const time = getRandomTime(2000, 3500);

        setTimeout(() => {
            resolve({horse, time});
        }, time);
    });
};

function getRandomTime(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateWinnerField(message) {
    refs.winnerField.textContent = message;
};

function updateProgressField(message) {
    refs.progressField.textContent = message;
};

function updateTable({horse, time, counter}) {
    const tr = `<tr><td>${counter}</td><td>${horse}</td><td>${time}</td></tr>`;
    refs.tableBody.insertAdjacentHTML('beforeend', tr);
};

function determineWinner(horsesP, counter) {
    Promise.race(horsesP).then(({ horse, time }) => {
        updateWinnerField(`🏆 The winner is ${horse} with time ${time}ms 🏆`);
        updateTable({ horse, time, counter });
    });
};

function WaitForAll(horsesP) {
    Promise.all(horsesP).then(() => updateProgressField('🏁 The race is over! Make new bids! 🏁'));
};