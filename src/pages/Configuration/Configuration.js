import Button from '../../components/Button/Button.js'
import Tools from '../../components/icons/Tools.js'
import {Link} from 'react-router-dom'
import './Configuration.css';
import {Helmet} from "react-helmet";

function Configuration({title, description}) {
    return (
        <div className="config">
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={description} />
            </Helmet>
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