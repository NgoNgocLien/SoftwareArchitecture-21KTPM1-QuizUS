// // import { QuizSettings } from './QuizSettings';

// interface Question {
//   question: string;
//   options: string[];
//   correctOption: number;
// }

// class QuizService {
//   private quizSettings: QuizSettings;

//   constructor() {
//     // Sử dụng Singleton để đảm bảo chỉ có một instance của QuizSettings
//     this.quizSettings = QuizSettings.getInstance();
//   }

//   // Tạo một quiz với 10 câu hỏi
//   public createQuiz(questions: Question[]): void {
//     if (questions.length !== 10) {
//       throw new Error("Quiz must consist of exactly 10 questions.");
//     }
//     this.quizSettings.setQuestions(questions);
//   }

//   // Lấy các câu hỏi đã thiết lập trong QuizSettings
//   public getQuiz(): Question[] {
//     return this.quizSettings.getQuestions();
//   }

//   // Cài đặt phần thưởng (coin) cho quiz
//   public setReward(coins: number): void {
//     if (coins <= 0) {
//       throw new Error("Reward must be greater than zero.");
//     }
//     this.quizSettings.setReward(coins);
//   }

//   // Lấy phần thưởng của quiz
//   public getReward(): number {
//     return this.quizSettings.getReward();
//   }

//   // Kiểm tra câu trả lời của người dùng
//   public checkAnswer(questionIndex: number, selectedOption: number): boolean {
//     const questions = this.quizSettings.getQuestions();
//     if (questionIndex < 0 || questionIndex >= questions.length) {
//       throw new Error("Invalid question index.");
//     }
//     return questions[questionIndex].correctOption === selectedOption;
//   }
// }

// export default new QuizService();