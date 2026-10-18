import Hero from '../Hero/Hero.jsx';
import SearchCrag from '../SearchCrag/SearchCrag.jsx';
import FeaturesInfo from '../FeaturesInfo/FeaturesInfo.jsx';
import { useUser } from '../../../hooks/useUser';
import HomeSkeleton from './HomeSkeleton.jsx';

export default function Home() {
    const { userLoading } = useUser();

    if (userLoading) {
        return (
           <HomeSkeleton />
        );
    }

    return (
        <>
            <Hero />

            <SearchCrag />

            <FeaturesInfo />
        </>
    );
}