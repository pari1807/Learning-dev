const Popup = ({ copied }) => {
    return(
        <section>;
            {copied && (<div style={{position: 'absolute', borderBottom: '3rem'}}>Copied to Clipboard</div>)}
        </section>
    );
}

export default Popup;