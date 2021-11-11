import {useState, useEffect} from 'react';
import Build from '../../components/Build/Build.js'
import '../../components/Build/Build.css';
import {add} from '../../actions';
import {useSelector, useDispatch} from "react-redux";
import {RandomBuild} from '../../randomBuildGenerator'
import {Helmet} from "react-helmet";
import ShowMoreButton from "../../components/Button/ShowMoreButton";
import useSettings from "../../hooks/useSettings";


function BuildList({title, description}) {
    const dispatch = useDispatch()
    const settings = useSettings();

    const buildList = useSelector(state => state.buildsReducer);
    useEffect(() => {
        if (!buildList.length)
            dispatch(add(generateBuilds(20)));
    }, [])

    function generateBuilds(n) {
        let res = [];
        for (let i = 0; i < n; i++)
            res.push(new RandomBuild(settings.branch));
        return res.sort((a, b) => b.date - a.date);
    }

    const [showMore, setShowMore] = useState(false);

    // Эта констата отвечает за то, сколько элементов показать изначально, если их много, тк в макете есть кнопка
    // Show more, но если элементов не очень много, то кнопка не появится
    const amountToShow = window.innerHeight <= 768 ? 6 : 9;
    const numberOfItems = showMore ? buildList.length : Math.min(amountToShow, buildList.length)

    return (
        <div className="buildList">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
            {buildList.slice(0, numberOfItems).map((build) => (
                <div key={build.hash} className="build">
                    <Build status={build.status}
                           branch={build.branch}
                           author={build.author}
                           hash={build.hash}
                           message={build.message}
                           time={build.time}
                           date={build.date}
                           number={build.number}
                    />
                </div>
            ))}
            {amountToShow < buildList.length ?
                <ShowMoreButton showMore = {showMore} setShowMore = {setShowMore} />
                : <></>
            }
        </div>
    )
}

export default BuildList;