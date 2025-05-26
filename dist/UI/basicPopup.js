import React from "react";
function blockNumber(blocked) {
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
const BlockNumberElem = ({ blocked }) => {
    return React.createElement("div", { className: "count" },
        "\uD83D\uDEAB ",
        blockNumber(blocked));
};
const StatBlockElem = ({ blocked }) => {
    return (React.createElement("div", { className: "stat-box" },
        React.createElement(BlockNumberElem, { blocked: blocked }),
        React.createElement("div", { className: "label" }, "Hate Speech Blocked"),
        React.createElement("div", { className: "subtext" }, "in the last 7 days")));
};
const HeaderElem = ({ headerText }) => {
    return (React.createElement("div", { className: "header" }, headerText));
};
const NavigationElem = ({ onClick }) => {
    return (React.createElement("div", { className: "nav" },
        React.createElement("button", null,
            React.createElement("i", null, "\uD83C\uDFE0"),
            "Home"),
        React.createElement("button", null,
            React.createElement("i", null, "\uD83D\uDEE1\uFE0F"),
            "Status"),
        React.createElement("button", null,
            React.createElement("i", null, "\uD83D\uDC64"),
            "Protect"),
        React.createElement("button", null,
            React.createElement("i", null, "\uD83D\uDCCA"),
            "Stats"),
        React.createElement("button", null,
            React.createElement("i", null, "\u2699\uFE0F"),
            "Settings"),
        React.createElement("button", null,
            React.createElement("i", null, "\u2753"),
            "Help")));
};
const PopupHTML = ({ blocked }) => {
    return (React.createElement("body", null,
        React.createElement(HeaderElem, { headerText: "SafeSpeak Blocker" }),
        React.createElement(StatBlockElem, { blocked: blocked }),
        React.createElement(NavigationElem, { onClick: () => console.log("Navigation clicked") })));
};
export default PopupHTML;
