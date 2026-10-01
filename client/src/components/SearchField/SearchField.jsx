import styles from './SearchField.module.css';

export default function SearchField() {
    return (
        <div className={styles.searchContainer}>

            <label htmlFor="crag-search">
                Search for a crag
            </label>

            <div className={styles.inputWrap}>

                <span className={styles.icon}>
                    ⌕
                </span>

                <input
                    id="crag-search"
                    type="text"
                    placeholder="Search by crag name..."
                    autoComplete="off"
                />

            </div>

        </div>
    );
}