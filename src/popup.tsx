import {popupHTML} from './UI/basicPopup';
import ReactDOM from 'react-dom/client';
import './tests/fuzzyMatchTest';
import './UI/style.css';
// import { runTests } from './tests/AiMatchTest';

const App = () => {
    return (
        <div>
            {popupHTML({ blocked: 28, onClick: () => console.log("Popup clicked") })}
            {/* <h4>AI Filter Test</h4>
            <button id="testButton" onClick={() => runTests()}>Test Button</button> */}
        </div>
    );
};

const container = document.getElementById("root");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
}