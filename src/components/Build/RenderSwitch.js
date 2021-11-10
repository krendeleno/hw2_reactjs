import React from 'react';
import Success from "../icons/Success";
import Fail from "../icons/Fail";
import Clock from "../icons/Clock";

function RenderSwitch({status}) {
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

export default React.memo(RenderSwitch);