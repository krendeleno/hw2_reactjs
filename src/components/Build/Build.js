import Fail from '../icons/Fail.js'
import Success from '../icons/Success.js'
import Time from '../icons/Time.js'
import Clock from '../icons/Clock.js'
import Calendar from '../icons/Calendar.js'
import User from '../icons/User.js'
import Commit from '../icons/Commit.js'
import './Build.css';
import {format} from "date-fns";
import {ru} from "date-fns/locale";


function Build({status, branch, author, hash, message, time, date, number}) {
    const numberClassName = ["buildNumber", status]

    // Выбор нужной иконки
    function renderSwitch(status) {
        switch (status) {
            case 'success':
                return <Success style={{width: "24px"}}/>;
            case 'fail':
                return <Fail style={{width: "24px"}}/>;
            case 'process':
                return <Clock style={{width: "24px"}}/>;
            default:
                return null;
        }
    }

    return (
        <>
            {renderSwitch(status)}
            <div className="buildInfo">
                <div className="buildUpInfo">
                    <p className={numberClassName.join(' ')}>#{number}</p>
                    <p className="buildMessage">{message}</p>
                </div>
                <div className="buildLowInfo">
                    <div>
                        <Commit style={{opacity: 0.3, width: "16px"}}/>
                        <p className="buildBranch">{branch}</p>
                    </div>
                    <p className="buildHash" style={{opacity: 0.65}}>{hash}</p>
                    <div className="buildAuthorContainer">
                        <User style={{opacity: 0.3, width: "16px"}}/>
                        <p className="buildAuthor">{author}</p>
                    </div>
                </div>
            </div>

            <div className="buildDetails">
                <div className="buildDate">
                    <Calendar style={{width: "16px"}}/>
                    <p title={format(date, 'dd/MM/yyyy, p', {locale: ru})}>{format(date, 'd LLL, p', {locale: ru})}</p>
                </div>
                <div className="buildTime">
                    <Time style={{width: "16px"}}/>
                    <p>{time}</p>
                </div>
            </div>
        </>
    )
}

export default Build;