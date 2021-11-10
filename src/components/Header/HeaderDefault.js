import React from 'react';
import Button from '../../components/Button/Button.js'
import {Link} from 'react-router-dom'
import Settings from "../icons/Settings";

const HeaderDefault = () => {
    return (
        <>
            <p>School CI server</p>
            <Link to="/settings">
                <Button buttonType="default hasIcon">
                    <Settings style={{width: "12px"}}/>
                    <p>Settings</p>
                </Button>
            </Link>
        </>
    )
}

export default React.memo(HeaderDefault);