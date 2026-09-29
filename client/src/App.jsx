import './App.css'
import Header from './components/Header/Header.jsx';
import Hero from './components/Hero/Hero.jsx';
import SearchCrag from './components/SearchCrag/SearchCrag.jsx';
import FeaturesInfo from './components/FeaturesInfo/FeaturesInfo.jsx';
import Footer from './components/Footer/Footer.jsx';

function App() {

    return (
        <>
            <Header />

            <main>
                <Hero />

                <SearchCrag />

                <FeaturesInfo />
            </main>

            <Footer />
        </>
    )
}

export default App;
