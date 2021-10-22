import {useContext, useEffect, useState} from 'react';
import Build from '../../components/Build/Build.js'
import {Context} from "../../components/GithubContext.js"
import Button from '../../components/Button/Button.js'
import '../../components/Build/Build.css';
import {RandomBuild} from '../../randomBuildGenerator'
import {Helmet} from "react-helmet";



function BuildList({title, description}) {
    const [context, setContext] = useContext(Context);

    function generateBuilds(n) {
        let res = [];
        for (let i = 0; i < n; i++)
            res.push(new RandomBuild(context.branch));
        return res.sort((a, b) => b.date - a.date);
    }

    const [buildList, setBuildList] = useState([]);
    const [showMore, setShowMore] = useState(false);

    useEffect(() => {
        if (context.addedBuilds)
            setBuildList(context.addedBuilds);
        else
            setContext(values => ({...values, addedBuilds: context.addedBuilds || generateBuilds(20)}));
    }, [context.addedBuilds])

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
                showMoreButtons
                : <></>
            }
        </div>
    )
}

export default BuildList;