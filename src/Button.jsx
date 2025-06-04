import React from 'react';

function Button({ label, onClick, className }) {
    return (
        <button onClick={() => onClick(label)} className={className}>
            {label}
        </button>
    );
}

export default Button;