import {useEffect} from "react";
import Button from './Button.js'
import Tools from './icons/Tools.js'
import {Link} from 'react-router-dom'
import './css/Configuration.css';

function Configuration({changeMeta, title, description}) {
    useEffect(() => changeMeta(title, description), [])
    return (
        <div className="config">
            <div style={{width: "124px"}}>
                <Tools/>
            </div>
            <p>Configure repository connection <br/> and synchronisation settings</p>
            <Link to="/settings">
                <Button buttonType="colored">
                    <p>Open settings</p>
                </Button>
            </Link>
        </div>
    )
}

export default Configuration;