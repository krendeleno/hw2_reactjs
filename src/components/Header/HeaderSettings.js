import {Link} from "react-router-dom";
import React, {useCallback} from 'react';
import Button from "../Button/Button";
import Settings from "../icons/Settings";
import Play from "../icons/12Play";
import Modal from "../Modal/Modal";

const HeaderSettings = ({show, setShow, github}) => {
    const close = useCallback(() => {
        setShow(false);
    }, []);

    return(
        <>
            <p className="githubRepo">{github}</p>
            <div className="buildButtons hasIcon">
                <Button buttonType="default" action={() => setShow(true)}>
                    <Play style={{width: "12px"}}/>
                    <p>Run build</p>
                </Button>
                <Link to="/settings">
                    <Button buttonType="default icon">
                        <Settings style={{width: "12px"}}/>
                    </Button>
                </Link>
            </div>
            <Modal show={show} onClose={close} onSubmit={close}/>
        </>
    )
}

export default React.memo(HeaderSettings);