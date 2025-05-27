function blockNumber(blocked : number) {
    if (blocked < 0) {
        return "∞";
    }
    else if (blocked === 0) {
        return "0";
    }
    else if (blocked < 1000) {
        return blocked.toString();
    }
    else if (blocked < 1000000) {
        return `${(blocked / 1000).toFixed(1)}k`;
    }
    else {
        return `${(blocked / 1000000).toFixed(1)}M`;
    }
}
const BlockNumberElem = ({ blocked }: { blocked: number }) => {
    return (
        <div className="count">
            <i className="icon">🚫</i>
            {blockNumber(blocked)}
        </div>
    );
};

const StatBlockElem = ({ blocked }: { blocked: number }) => {
    return (
        <div className="stat-box">
            <BlockNumberElem blocked={blocked} />
            <div className="label">Hate Speech Blocked</div>
            <div className="subtext">in the last 7 days</div>
        </div>
    );
};
const HeaderElem = ({ headerText }: { headerText: string }) => {
    return (
        <div className="header">{headerText}</div>
    );
};

const NavigationElem = ({ onClick }: { onClick: () => void }) => {
    return (
        <div className="nav">
            <button onClick={onClick}><i>🏠</i>Home</button>
            <button onClick={onClick}><i>🛡️</i>Status</button>
            <button onClick={onClick}><i>👤</i>Protect</button>
            <button onClick={onClick}><i>📊</i>Stats</button>
            <button onClick={onClick}><i>⚙️</i>Settings</button>
            <button onClick={onClick}><i>❓</i>Help</button>
        </div>
    );
};

const popupHTML = ({ blocked, onClick }: { blocked: number, onClick: () => void }) => {
    return (
        <body>
            <HeaderElem headerText="SafeSpeak Blocker"/>
            <StatBlockElem blocked={blocked} />
            <NavigationElem onClick={onClick} />
        </body>
    );
};

export {popupHTML};