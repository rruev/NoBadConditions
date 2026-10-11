import './App.css'
import { Routes, Route } from 'react-router';

import Header from './components/layout/Header/Header.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import Home from './components/homePage/Home/Home.jsx';
import Result from './components/resultPage/Result/Result.jsx';

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
