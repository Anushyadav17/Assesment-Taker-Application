import React, { useState } from "react";
import ResultCard from "./ResultCard";

const ResultCards = (props) => {
    const data = props.data;

    return (
        <div className="p-10">
            {
                data.map( (data) => {
                    return <ResultCard key={data.id} data={data}/>
                })
            }
        </div>
    );
}

export default ResultCards;
