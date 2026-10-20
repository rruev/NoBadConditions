import styles from './AddEdit.module.css';
import { Link, useParams, useNavigate } from 'react-router';
import useCrag from '../../../hooks/useCrag';
import Remove from '../../ui/Remove/Remove';
import { useState } from 'react';

export default function AddEdit() {
    const { cragId } = useParams();
    const isEdit = Boolean(cragId);
    const {
        crag,
        addCrag,
        updateCrag,
        removeCrag
    } = useCrag(cragId, isEdit);
    const [showRemove, setShowRemove] = useState(false);

    const navigate = useNavigate();

    const handleRemove = async () => {
        await removeCrag(cragId);
        navigate('/mycrags');
    };

    const handleCloseRemove = () => {
        setShowRemove(false);
    };

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
                        <button type="button" className={styles.remove} onClick={() => setShowRemove(true)}>Remove crag</button>
                    </div>
                )}
                {showRemove && (
                    <Remove
                        onConfirm={handleRemove}
                        onClose={handleCloseRemove}
                        title="Remove Crag"
                        description="Are you sure you want to remove this crag from your list? This will delete all associated data."
                        confirmLabel="Remove"
                    />
                )}

            </div>
        </section>
    );
}