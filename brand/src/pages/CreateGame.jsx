import React, { useState } from "react";
import "../styles/common.css";
import "../styles/input.css";

export default function CreateGame() {
    const [questions, setQuestions] = useState(Array(10).fill({ question: '', options: ['', '', '', ''], correctAnswer: 0 }));
    const [reward, setReward] = useState(0);

    const handleQuestionChange = (index, field, value) => {
        const updatedQuestions = [...questions];
        if (field === 'question') {
            updatedQuestions[index].question = value;
        } else {
            updatedQuestions[index].options[field] = value;
        }
        setQuestions(updatedQuestions);
    };

    const handleCorrectAnswerChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].correctAnswer = value;
        setQuestions(updatedQuestions);
    };

    const handleRewardChange = (e) => {
        setReward(e.target.value);
    };

    const handleSubmit = () => {
        console.log("Quiz Data:", { questions, reward });
        alert("Quiz Created Successfully!");
    };

    return (
        <div className="ctn">
            <div className="input-ctn">
                <h6>Tạo trò chơi</h6>
            </div>
        </div>
    )
}