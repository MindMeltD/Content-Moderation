import {popupHTML} from './UI/basicPopup';
import ReactDOM from 'react-dom/client';

const App = () => {
    return (
        <div>
            {popupHTML({ blocked: 28, onClick: () => console.log("Popup clicked") })}
        </div>
    );
};

const container = document.getElementById("popup");
if (container) {
    const root = ReactDOM.createRoot(container);
    root.render(<App />);
}