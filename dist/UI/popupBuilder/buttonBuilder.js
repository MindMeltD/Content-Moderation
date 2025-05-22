import React from 'react';
const ButtonBuilder = ({ text, style, onClick }) => (React.createElement("button", { style: style, onClick: onClick }, text));
export default ButtonBuilder;
