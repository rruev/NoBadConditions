import './App.css'
import { Routes, Route } from 'react-router';

import Header from './components/Header/Header.jsx';
import Footer from './components/Footer/Footer.jsx';
import Home from './components/Home/Home.jsx';
import Result from './components/Result/Result.jsx';

function App() {

    return (
        <>
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/result" element={<Result />} />
                </Routes>
            </main>

            <Footer />
        </>
    )
}

export default App;
