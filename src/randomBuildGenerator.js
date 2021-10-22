import {customAlphabet} from "nanoid";

// Функции для генерации случайных билдов
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

// Константы для генерации случайных билдов
const statuses = ["fail", "success", "process"]
const authors = ["Vadim Makeev", "Philip Kirkorov"]
const branches = ["master", "feature", "super-cool-ui-kit"]
const messages = ["some fix", "upgrade ts to 3.8", "improved accessibility"]
const nanoid = customAlphabet('1234567890abcdef', 8)

// Сюда можно передать ветку, т.к. в Settings есть ветка, наверное, коммиты все должны с нее подгружаться
// и дату с хэшем, т.к. можно через модалку добавить свой билд
export function RandomBuild(branch, date, hash) {
    this.status = statuses[Math.floor(Math.random() * statuses.length)];
    this.branch = branch || branches[Math.floor(Math.random() * branches.length)];
    this.author = authors[Math.floor(Math.random() * authors.length)];
    this.hash = hash || nanoid();
    this.message = messages[Math.floor(Math.random() * messages.length)];
    this.time = `${getRandomInt(23)} ч ${getRandomInt(59)} мин`;
    this.date = date || randomDate(new Date(2021, 0, 1), new Date());
    this.number = getRandomInt(9999);
}
