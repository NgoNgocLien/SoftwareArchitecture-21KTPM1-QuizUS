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
        alert("Tạo trò chơi thành công!");
    };

    return (
        <div className="ctn">
            <div className="input-ctn">
                <h6>Tạo trò chơi</h6>

                <div className="form-row">
                    {/* Phần thưởng */}
                    <div className="form-group" style={{ flex: '1 1'}}>
                        <label>Phần thưởng (Xu)</label>
                        <input
                            type="number"
                            value={reward}
                            onChange={handleRewardChange}
                            required
                            min="0"
                        />
                    </div>
                    
                    {/* Hướng dẫn chơi */}
                    <div className="form-group" style={{ flex: '1 1'}}>
                        <label>Hướng dẫn</label>
                        <textarea type="text" placeholder="Mỗi game sẽ có mặc định 10 câu hỏi. Nếu người chơi trả lời đúng tất cả các câu hỏi sẽ nhận được xu thưởng. Tuy nhiên, nếu trả lời sai bất kỳ câu hỏi nào sẽ không nhận được xu." style={{ height: '100px'}} />
                    </div>
                </div>
                
                {/* Câu hỏi */}
                <form onSubmit={handleSubmit}>{questions.map((q, index) => (
                    <div key={index} className="question-container">
                        <label>Câu {index + 1}</label>
                        <input
                            type="text"
                            placeholder={`Nhập câu hỏi ${index + 1}`}
                            value={q.question}
                            onChange={(e) => handleQuestionChange(index, 'question', e.target.value)}
                            required
                        />

                        <div className="options-container">
                            {q.options.map((option, i) => (
                                <div key={i} className="option-container">
                                    <input
                                        type="text"
                                        placeholder={`Đáp án ${i + 1}`}
                                        value={option}
                                        onChange={(e) => handleQuestionChange(index, i, e.target.value)}
                                        required
                                    />
                                    <input
                                        type="radio"
                                        name={`correct-answer-${index}`}
                                        value={i}
                                        checked={q.correctAnswer === i}
                                        onChange={() => handleCorrectAnswerChange(index, i)}
                                    />
                                    <label>Đúng</label>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
                </form>

                {/* Buttons */}
                <div className="button-group align-self-center" >
                    <button className="cancel-btn">Hủy</button>
                    <button className="save-btn">Lưu trò chơi</button>
                </div>
            </div>
        </div>
    );
}