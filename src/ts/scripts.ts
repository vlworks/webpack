import '../scss/style.scss';

const result = [];
for (let i = 0; i < 10; i++) {
    result.push(i);
}
const sum = result.reduce( (acc, el) => acc += el, 0);


const elem = document.createElement('div');
elem.classList.add('content');
elem.innerHTML = `${result.join('+')} = ${sum}`

const div = <HTMLDivElement>document.querySelector('#app');
div.appendChild(elem);