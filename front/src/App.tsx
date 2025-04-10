import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Books from "../components/Books";
import Bestsellers from "../components/Bestsellers";
import "./App.css"

function App() {
    return (
        <Router>
            <div className="app-container">
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Książki</Link>
                        </li>
                        <li>
                            <Link to="/bestsellers">Bestsellery</Link>
                        </li>
                    </ul>
                </nav>

                <main>
                    <Routes>
                        <Route path="/" element={<Books/>} />
                        <Route path="/bestsellers" element={<Bestsellers/>} />
                    </Routes>
                </main>
            </div>
        </Router>
    )
}


export default App
