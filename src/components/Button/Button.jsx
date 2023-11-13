import React from 'react';

const Button = ({ className, onClick, label }) => {
    return (
        <button className={className} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;