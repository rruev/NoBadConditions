import Crag from '../Crag/Crag';
import styles from './MyCrags.module.css';
import useCrag from '../../../hooks/useCrag';
import { Outlet, Link } from 'react-router';

export default function MyCrags() {
    const { crags, loading, error, removeCrag } = useCrag();

    const handleRemove = async (cragId) => {
        await removeCrag(cragId);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <section className={styles.page}>
            <div className={styles.container}>

                <header className={styles.heading}>
                    <div>
                        <p className={styles.eyebrow}>Your crags</p>
                        <h1>My crags</h1>
                    </div>

                    <Link to="add" className={styles.addButton}>
                        <span aria-hidden="true">+</span> Add crag
                    </Link>
                </header>

                <ul className={styles.grid}>
                    {!crags.length && <p>You don't have any crags yet. Add your first crag from the button above.</p>}
                    {crags.map(crag => (
                        <li key={crag.id} className={styles.card}>
                            <Crag
                                cragId={crag.id}
                                active={crag.active}
                                name={crag.name}
                                region={crag.region}
                                latitude={crag.latitude}
                                longitude={crag.longitude}
                                onRemove={handleRemove}
                            />
                        </li>
                    ))}
                </ul>

            </div>
        </section>
    );
}