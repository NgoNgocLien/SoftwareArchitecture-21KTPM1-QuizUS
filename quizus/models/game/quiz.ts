interface Answer {
    answer_id: string;
    answer_text: string;
    is_correct: boolean;
}

interface Question {
    question_id: string;
    question_text: string;
    answers: Answer[];
}

interface Quiz {
    quiz_id: string;
    description: string;
    questions: Question[];
}
  