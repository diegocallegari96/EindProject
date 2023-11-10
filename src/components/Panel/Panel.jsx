export default function Panel({ title, text, children }) {
    return (
        <div className="background-landing">
            <div className="landing-container">
                <h1 className="h1-landing">{title}</h1>
                <p className="p1-landing">{text}</p>
                {children}
            </div>
        </div>
    );
}