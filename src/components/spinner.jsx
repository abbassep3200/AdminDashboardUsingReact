const Spinner = ({theme = 'info'}) => {
    return (
        <div className="spinner-wrapper">
            <div className={`spinner-border text-${theme} me-2`}></div>
        </div>
    )
}

export default Spinner;