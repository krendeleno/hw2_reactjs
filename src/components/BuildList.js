import {useState, useEffect} from 'react';
import Build from './Build.js'
import {format} from 'date-fns'
import {ru} from 'date-fns/locale'
import {customAlphabet} from 'nanoid'
import Button from './Button.js'
import './css/Build.css';
import {add} from '../actions';
import {useSelector, useDispatch} from "react-redux";


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

// Сюда можно передать ветку, т.к. в Settings есть ветка, наверное, коммиты все должны с нее подгружаться.
function RandomBuild(branch) {
    this.status = statuses[Math.floor(Math.random() * statuses.length)];
    this.branch = branch || branches[Math.floor(Math.random() * branches.length)];
    this.author = authors[Math.floor(Math.random() * authors.length)];
    this.hash = nanoid();
    this.message = messages[Math.floor(Math.random() * messages.length)];
    this.time = `${getRandomInt(23)} ч ${getRandomInt(59)} мин`;
    this.date = randomDate(new Date(2021, 0, 1), new Date());
    this.number = getRandomInt(9999);
}


function BuildList({changeMeta, title, description}) {
    useEffect(() => changeMeta(title, description), [])
    const dispatch = useDispatch()
    const settings = useSelector(state => state.settingsReducer = {
        github: state.settingsReducer.github,
        build: state.settingsReducer.build,
        branch: state.settingsReducer.branch,
        sync: state.settingsReducer.sync
    })

    const buildList = useSelector(state => state.buildsReducer)
    useEffect(() => {
        if (!buildList.length)
            dispatch(add(generateBuilds(20)))
    }, [])

    function generateBuilds(n) {
        let res = [];
        for (let i = 0; i < n; i++)
            res.push(new RandomBuild(settings.branch));
        return res.sort((a, b) => b.date - a.date);
    }

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