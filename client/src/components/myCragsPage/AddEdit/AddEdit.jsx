import styles from './AddEdit.module.css';
import { Link, useParams, useNavigate } from 'react-router';
import useCrag from '../../../hooks/useCrag';

export default function AddEdit() {
    const { id } = useParams();
    const isEdit = Boolean(id);
    const { 
        crag,
        loading,
        error,
        addCrag,
        updateCrag,
        removeCrag
    } = useCrag(id, isEdit);

    const navigate = useNavigate();

    const handleSubmit = async (formData) => {
        const data = Object.fromEntries(formData);
        delete data.region;
        if (isEdit) {
            await updateCrag(data);
        } else {
            await addCrag(data);
        }
        navigate('/mycrags');
    }; 

    return (
        <section className={styles.page}>
            <div className={styles.panel}>

                <Link to="/mycrags" className={styles.back}>
                    <span aria-hidden="true">←</span> Back to my crags
                </Link>

                <p className={styles.eyebrow}>{isEdit ? 'Update your crag' : 'New crag'}</p>
                <h1>{isEdit ? 'Edit crag' : 'Add crag'}</h1>

                <form className={styles.form} action={handleSubmit}>
                    <div className={styles.field}>
                        <label htmlFor="crag-name">Name</label>
                        <input
                            id="crag-name"
                            name="name"
                            type="text"
                            placeholder="e.g. Paklenica"
                            autoComplete="off"
                            defaultValue={crag.name}
                        />
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="crag-region">Region</label>
                        <input
                            id="crag-region"
                            name="region"
                            type="text"
                            placeholder="e.g. Croatia"
                            autoComplete="off"
                            defaultValue={crag.region}
                        />
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="crag-latitude">Latitude</label>
                            <input
                                id="crag-latitude"
                                name="latitude"
                                type="text"
                                inputMode="decimal"
                                placeholder="44.3000"
                                autoComplete="off"
                                defaultValue={crag.latitude}
                            />
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="crag-longitude">Longitude</label>
                            <input
                                id="crag-longitude"
                                name="longitude"
                                type="text"
                                inputMode="decimal"
                                placeholder="15.4700"
                                autoComplete="off"
                                defaultValue={crag.longitude}
                            />
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <button type="submit" className={styles.primary}>
                            {isEdit ? 'Save changes' : 'Add crag'}
                        </button>
                        <Link to="/mycrags" className={styles.secondary}>Cancel</Link>
                    </div>
                </form>

                {isEdit && (
                    <div className={styles.danger}>
                        <div>
                            <strong>Remove from my crags</strong>
                            <p>This crag will no longer appear in your list.</p>
                        </div>
                        <button type="button" className={styles.remove}>Remove crag</button>
                    </div>
                )}

            </div>
        </section>
    );
}