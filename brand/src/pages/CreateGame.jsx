import React, { useState } from "react";
import "../styles/common.css";
import "../styles/input.css";
import { useSearchParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { createEvent } from "../api/campaignApi"; 

export default function CreateGame() {
    const storedBrand = localStorage.getItem('brand');
    const brand = storedBrand ? JSON.parse(storedBrand) : null;

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();

    // Sử dụng map để khởi tạo các câu hỏi và đáp án độc lập
    const [questions, setQuestions] = useState(
        Array(10).fill().map(() => ({
            question_text: '',
            answers: Array(4).fill().map(() => ({ answer_text: '', is_correct: false }))
        }))
    );
    const [reward, setReward] = useState(0);
    const [description, setDescription] = useState('');

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
        const updatedQuestions = [...questions];
        // Đảm bảo rằng chỉ có đáp án được chọn là đúng, các đáp án khác của câu hỏi hiện tại sẽ là sai
        updatedQuestions[qIndex].answers = updatedQuestions[qIndex].answers.map((answer, j) => ({
            ...answer,
            is_correct: j === aIndex, // Chỉ đúng cho đáp án được chọn
        }));
        setQuestions(updatedQuestions);
    };

    // Hàm xử lý thay đổi phần thưởng
    const handleRewardChange = (e) => {
        setReward(e.target.value);
    };

    // Hàm xử lý khi submit form
    const handleSubmit = async (e) => {
        e.preventDefault();
        const campaign = {
           name: searchParams.get('name'),
           description: searchParams.get('description'),
           start_datetime: searchParams.get('start'),
           end_datetime: searchParams.get('end'),
           max_amount_voucher: searchParams.get('amount'),
           given_amount_voucher: 0,
           score_award: reward,
           id_brand1: brand?.id_brand || 1,
           budget: searchParams.get('budget'),
           id_voucher: searchParams.get('id_voucher'),
        }
        const quiz = {
            questions,
            description
        }
        // console.log(campaign)
        // consol e.log(quiz);
        const success = await createEvent(campaign, quiz);

        if (success) {
            confirmAlert({
                message: 'Tạo sự kiện thành công!',
                buttons: [
                    {
                        label: 'Xác nhận',
                        onClick: () => {
                            navigate(`/event`);
                        }
                    }
                ]
            });
        }
        else {
            confirmAlert({
                message: 'Tạo sự kiện thất bại!',
                buttons: [
                    {
                        label: 'Xác nhận'
                    }
                ]
            });
        }
    };

    return (
        <div className="ctn">
            <div className="input-ctn">
                <h6>Tạo trắc nghiệm</h6>

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
                            value={description}
                            onChange={(e) => {setDescription(e.target.value)}}
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
                        <button type="button" className="cancel-btn" onClick={() => {navigate('/create-event')}}>Hủy</button>
                        <button type="submit" className="save-btn">Lưu trò chơi</button>
                    </div>
                </form>
                
            </div>
        </div>
    );
}
