import React, { useState } from "react";
import "../styles/common.css";
import "../styles/input.css";

export default function CreateGame() {
    // Sử dụng map để khởi tạo các câu hỏi và đáp án độc lập
    const [questions, setQuestions] = useState(
        Array(10).fill().map(() => ({
            question_text: '',
            answers: Array(4).fill().map(() => ({ answer_text: '', is_correct: false }))
        }))
    );
    const [reward, setReward] = useState(0);

    // Hàm xử lý thay đổi câu hỏi
    const handleQuestionChange = (index, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[index].question_text = value;
        setQuestions(updatedQuestions);
    };

    // Hàm xử lý thay đổi đáp án
    const handleAnswerChange = (qIndex, aIndex, value) => {
        const updatedQuestions = [...questions];
        updatedQuestions[qIndex].answers[aIndex].answer_text = value;
        setQuestions(updatedQuestions);
    };

    // Hàm xử lý thay đổi đáp án đúng
    const handleCorrectAnswerChange = (qIndex, aIndex) => {
        const updatedQuestions = questions.map((question, i) => ({
            ...question,
            answers: question.answers.map((answer, j) => ({
                ...answer,
                is_correct: i === qIndex && j === aIndex,
            })),
        }));
        setQuestions(updatedQuestions);
    };

    // Hàm xử lý thay đổi phần thưởng
    const handleRewardChange = (e) => {
        setReward(e.target.value);
    };

    // Hàm xử lý khi submit form
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Quiz Data:", { questions, reward });
        alert("Tạo trò chơi thành công!");
    };

    return (
        <div className="ctn">
            <div className="input-ctn">
                <h6>Tạo trò chơi</h6>

                <div className="form-row">
                    {/* Phần thưởng */}
                    <div className="form-group" style={{ flex: '1 1' }}>
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
                    <div className="form-group" style={{ flex: '1 1' }}>
                        <label>Hướng dẫn</label>
                        <textarea
                            type="text"
                            placeholder="Mỗi game sẽ có mặc định 10 câu hỏi. Nếu người chơi trả lời đúng tất cả các câu hỏi sẽ nhận được xu thưởng. Tuy nhiên, nếu trả lời sai bất kỳ câu hỏi nào sẽ không nhận được xu."
                            style={{ height: '100px' }}
                        />
                    </div>
                </div>

                {/* Câu hỏi */}
                <form onSubmit={handleSubmit}>
                    {questions.map((q, index) => (
                        <div key={index} className="question-container">
                            <label>Câu {index + 1}</label>
                            <input
                                type="text"
                                placeholder={`Nhập câu hỏi ${index + 1}`}
                                value={q.question_text}
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                required
                            />

                            <div className="options-container">
                                {q.answers.map((option, i) => (
                                    <div key={i} className="option-container">
                                        <input
                                            type="text"
                                            placeholder={`Đáp án ${i + 1}`}
                                            value={option.answer_text}
                                            onChange={(e) => handleAnswerChange(index, i, e.target.value)}
                                            required
                                        />
                                        <input
                                            type="radio"
                                            name={`correct-answer-${index}`}
                                            checked={option.is_correct}
                                            onChange={() => handleCorrectAnswerChange(index, i)}
                                        />
                                        <label>Đúng</label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                    {/* Buttons */}
                    <div className="button-group align-self-center">
                        <button type="button" className="cancel-btn">Hủy</button>
                        <button type="submit" className="save-btn">Lưu trò chơi</button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}
