import React, { useState, useEffect } from "react";

const QuestionTimer = ({ duration, onTimeUp }) => {
    duration = duration * 60;
    const [timeLeft, setTimeLeft] = useState(duration);
    const [timerActive, setTimerActive] = useState(false);
    const intervalRef = React.useRef(null);

    useEffect(() => {
        if (duration > 0) {
            setTimeLeft(duration);
            setTimerActive(true);
        }
    }, [duration]);

    useEffect(() => {
        if (timerActive && timeLeft > 0) {
            intervalRef.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(intervalRef.current);
            if (timeLeft === 0 && typeof onTimeUp === 'function') {
                onTimeUp();
                
            }
        }

        return () => {
            clearInterval(intervalRef.current);
        };
    }, [timerActive, timeLeft, onTimeUp]);

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const confirmationMessage = "Are you sure you want to leave? Your timer will stop.";
            event.returnValue = confirmationMessage;
            return confirmationMessage;
        };

        window.addEventListener("beforeunload", handleBeforeUnload);

        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
        };
    }, []);

    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    };

    return (
        <div className="clock">
            <h3>Time Remaining: {formatTime()}</h3>
        </div>
    );
};

export default QuestionTimer;
