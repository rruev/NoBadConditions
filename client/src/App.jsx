import './App.css'
import { Routes, Route } from 'react-router';
import { UserProvider } from './context/UserContext.jsx';
import LogIn from './components/authentication/LogIn/LogIn.jsx';
import Register from './components/authentication/Register/Register.jsx';
import Header from './components/layout/Header/Header.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import Home from './components/homePage/Home/Home.jsx';
import Result from './components/resultPage/Result/Result.jsx';

function App() {

    return (
        <UserProvider>
            <Header />

            <main>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/result" element={<Result />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </main>

            <Footer />
        </UserProvider>
    )
}

export default App;
