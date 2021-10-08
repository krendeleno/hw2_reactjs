import {useContext, useState} from 'react';
import Build from './Build.js'
import {format} from 'date-fns'
import {ru} from 'date-fns/locale'
import {Context} from "./GithubContext.js"
import {customAlphabet} from 'nanoid'
import Button from './Button.js'
import './css/Build.css';


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

// Сюда можно передать хэш и ветку, т.к. в Settings есть ветка, наверное, коммиты все должны с нее подгружаться.
// Хэш можно указать в модальном окне run build, но сейчас эта функция не реализована

function RandomBuild(branch, hash) {
    this.status = statuses[Math.floor(Math.random() * statuses.length)];
    this.branch = branch || branches[Math.floor(Math.random() * branches.length)];
    this.author = authors[Math.floor(Math.random() * authors.length)];
    this.hash = hash || nanoid();
    this.message = messages[Math.floor(Math.random() * messages.length)];
    this.time = `${getRandomInt(23)} ч ${getRandomInt(59)} мин`;
    this.date = randomDate(new Date(2021, 0, 1), new Date());
    this.number = getRandomInt(9999);
}


function BuildList() {
    const [context] = useContext(Context);

    function generateBuilds(n) {
        let res = [];
        for (let i = 0; i < n; i++)
            res.push(new RandomBuild(context.branch));
        return res.sort((a, b) => b.date - a.date);
    }

    const [buildList] = useState(generateBuilds(20));
    const [showMore, setShowMore] = useState(false);


    const showMoreButtons = <>
        <Button buttonType="default" action={() => setShowMore(true)} show={!showMore}>
            <p>Show more</p>
        </Button>

        <Button buttonType="default" action={() => setShowMore(false)} show={showMore}>
            <p>Show less</p>
        </Button>
    </>

    // Эта констата отвечает за то, сколько элементов показать изначально, если их много, тк в макете есть кнопка
    // Show more, но если элементов не очень много, то кнопка не появится
    const amountToShow = 10;
    const numberOfItems = showMore ? buildList.length : Math.min(amountToShow, buildList.length)

    return (
        <div className="buildList">
            {buildList.slice(0, numberOfItems).map((build) => (
                <div key={build.hash} className="build">
                    <Build status={build.status}
                           branch={build.branch}
                           author={build.author}
                           hash={build.hash}
                           message={build.message}
                           time={build.time}
                           date={format(build.date, 'd LLL, p', {locale: ru})}
                           number={build.number}
                    />
                </div>
            ))}
            {amountToShow < buildList.length ?
                showMoreButtons
                : <></>
            }
        </div>
    )
}

export default BuildList;