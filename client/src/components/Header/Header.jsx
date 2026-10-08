import "./Header.css";

export default function Header() {
    return (
        <header>

            <div className="nav">

                <a href="#" className="brand">
                    <span className="brand-mark"></span>
                    NoBadConditions
                </a>

                <nav>
                    <a href="#">Home</a>
                    <a href="#">Crags</a>
                    <a href="#">About</a>
                    <a href="#" className="login-button">Log in</a>
                </nav>

            </div>

        </header>
    );
}