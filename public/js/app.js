console.log('Client side javascript file loaded');

const weatherForm = document.querySelector('form');
const searchTerm = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');



weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();

    messageOne.textContent = 'Loading...';
    messageTwo.textContent = '';

    const location = searchTerm.value;

    fetch('http://localhost:3001/weather?address=' + location)
        .then(res => {
            res.json().then((data) => {
                if (data.error) {
                    messageOne.textContent = `${data.error}`
                } else {
                    messageOne.textContent = `Location: ${data.location}`;
                    messageTwo.textContent = `
                    Today's weather: ${data.forecast}`;
                }
            });
        });
});

/* fetch('http://puzzle.mead.io/puzzle')
.then((res) => {
    res.json().then((data) => {// parse JSON res
        console.log(data);
    });
}); */