import React from 'react';
import Button from '../../components/Button/Button.js'

const showMoreButtons = ({setShowMore, showMore}) => {
    return (<>
            <Button buttonType="default" action={() => setShowMore(true)} show={!showMore}>
                <p>Show more</p>
            </Button>

            <Button buttonType="default" action={() => setShowMore(false)} show={showMore}>
                <p>Show less</p>
            </Button>
        </>
    )
}

export default React.memo(showMoreButtons);