import './Footer.css';
import React from 'react';

function Footer({links, copyright}) {
    return (
        <div className="footer">
            <div className="footerContent">
                <div>
                    {links.map((link) => (
                        <a key={link} href="/">{link}</a>
                    ))}
                </div>
                <div className="credentials">
                    <p>© 2021 {copyright}</p>
                </div>
            </div>
        </div>
    )
}

export default React.memo(Footer);
