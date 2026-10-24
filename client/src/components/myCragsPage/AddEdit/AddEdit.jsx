import styles from './AddEdit.module.css';
import sharedStyles from '../../../styles/shared.module.css';
import { Link, useParams, useNavigate } from 'react-router';
import useCrag from '../../../hooks/useCrag';
import Remove from '../../ui/Remove/Remove';
import { useEffect, useState } from 'react';
import SubmitButton from '../../ui/SubmitButton/SubmitButton';
import useValidate from '../../../hooks/useValidate';
import { cragSchema } from '../../../schemas/crag.schema';

export default function AddEdit() {
    const { cragId } = useParams();
    const isEdit = Boolean(cragId);
    const {
        crag,
        loading,
        error: serverError,
        addCrag,
        updateCrag,
        removeCrag
    } = useCrag(cragId, isEdit);
    const { validateInput, error, touched } = useValidate(cragSchema);
    const [showRemove, setShowRemove] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        region: '',
        latitude: '',
        longitude: ''
    });

    useEffect(() => {
        if (isEdit) {
            setFormData({
                name: crag.name,
                region: '',
                latitude: crag.latitude,
                longitude: crag.longitude
            });
        }
    }, [crag]);

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleRemove = async () => {
        await removeCrag(cragId);
        navigate('/mycrags');
    };

    const handleCloseRemove = () => {
        setShowRemove(false);
    };

    const errorMessage = (field) => {
        if (touched[field] && error && error[field]) {
            return <p className={sharedStyles.error}>{error[field]}</p>;
        } else if (serverError && serverError[field]) {
            return <p className={sharedStyles.error}>{serverError[field]}</p>;
        }
        return null;
    };

    const handleBlur = async (e) => {
        await validateInput(e, formData);
    };

    const handleAction = async () => {
        if (isEdit) {
            await updateCrag(formData);
        } else {
            await addCrag(formData);
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
                <h1>{isEdit ? 'Edit crag' : 'Add a custom crag'}</h1>

                <form className={styles.form} action={handleAction}>
                    <div className={styles.field}>
                        <label htmlFor="crag-name">Name</label>
                        {loading && isEdit ?
                            <span className="button-spinner" aria-hidden="true"></span>
                            :
                            <input
                                id="crag-name"
                                name="name"
                                type="text"
                                placeholder="e.g. Paklenica"
                                autoComplete="off"
                                value={formData.name}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        }
                        {errorMessage('name')}
                    </div>

                    <div className={styles.field}>
                        <label htmlFor="crag-region">Region</label>
                        {loading && isEdit ?
                            <span className="button-spinner" aria-hidden="true"></span> :

                            <input
                                id="crag-region"
                                name="region"
                                type="text"
                                placeholder="e.g. Croatia"
                                autoComplete="off"
                                value={formData.region}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                        }
                        {errorMessage('region')}
                    </div>

                    <div className={styles.row}>
                        <div className={styles.field}>
                            <label htmlFor="crag-latitude">Latitude</label>
                            {loading && isEdit ?
                                <span className="button-spinner" aria-hidden="true"></span> :

                                <input
                                    id="crag-latitude"
                                    name="latitude"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="44.3000"
                                    autoComplete="off"
                                    value={formData.latitude}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            }
                            {errorMessage('latitude')}
                        </div>

                        <div className={styles.field}>
                            <label htmlFor="crag-longitude">Longitude</label>
                            {loading && isEdit ?
                                <span className="button-spinner" aria-hidden="true"></span> :

                                <input
                                    id="crag-longitude"
                                    name="longitude"
                                    type="text"
                                    inputMode="decimal"
                                    placeholder="15.4700"
                                    autoComplete="off"
                                    value={formData.longitude}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                />
                            }
                            {errorMessage('longitude')}
                        </div>
                    </div>

                    <div className={styles.actions}>
                        <SubmitButton type={isEdit ? 'edit' : 'add'} disabled={error} />
                        <Link to="/mycrags" className={styles.secondary}>Cancel</Link>
                    </div>
                    {serverError && serverError.general && <p className={sharedStyles.error}>{serverError.general}</p>}
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