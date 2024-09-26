import React from "react";
import TestCard from "./TestCard";

const TestCards = (props) => {
    const data = props.data;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
            {data.map((data) => (
                <TestCard key={data._id} data={data} />
            ))}
        </div>
    );
}

export default TestCards;
