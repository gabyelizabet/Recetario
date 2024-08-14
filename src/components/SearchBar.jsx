import React, { useState } from "react";

const Searchbar = ({
    type,
    placeholder,
    required = false,
    value,
    name,
    handleInputChange,
}) => {
    return (
        <div>
            <div>
                <input 
                    type={type || "text"}
                    name={name}
                    placeholder={placeholder}
                    value={value}
                    onChange={handleInputChange}
                    required={required} />
            </div>
        </div>
    )
}

export default Searchbar