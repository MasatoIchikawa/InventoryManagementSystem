import React, { useState, useEffect } from "react";

import "./CustomButton.css";

function CustomButton({ props }) {
    return (
        <>
            <button className="custombutton" onClick={props.onclick}>{props.name}</button>
            <span></span>
        </>
    );
}

export default CustomButton;