import './App.css'
import { Routes, Route } from 'react-router';
import { UserProvider } from './context/UserContext.jsx';
import { ConditionsProvider } from './context/ConditionsContext.jsx'

import LogIn from './components/authentication/LogIn/LogIn.jsx';
import Register from './components/authentication/Register/Register.jsx';
import Header from './components/layout/Header/Header.jsx';
import Footer from './components/layout/Footer/Footer.jsx';
import Home from './components/homePage/Home/Home.jsx';
import Result from './components/resultPage/Result/Result.jsx';
import PageOutlet from './components/myCragsPage/PageOutlet.jsx';
import ActiveCrags from './components/ActiveCragsPage/ActiveCrags/ActiveCrags.jsx';
import MyCrags from './components/myCragsPage/MyCrags/MyCrags.jsx';
import AddEdit from './components/myCragsPage/AddEdit/AddEdit.jsx';

function App() {

    return (
        <UserProvider>
            <ConditionsProvider>
                <Header />

                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/result/:page" element={<Result />} />
                        <Route path="/login" element={<LogIn />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/activecrags" element={<ActiveCrags />} />
                        <Route path="/mycrags" element={<PageOutlet />} >
                            <Route index element={<MyCrags />} />
                            <Route path="add" element={<AddEdit />} />
                            <Route path=":cragId" element={<AddEdit />} />
                        </Route>
                    </Routes>
                </main>

                <Footer />
            </ConditionsProvider>
        </UserProvider>
    )
}

export default App;
