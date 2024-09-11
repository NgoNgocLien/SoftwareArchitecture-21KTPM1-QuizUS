class QuizSettings {
    private static instance: QuizSettings;
    
    // Các thuộc tính của bài quiz
    public numberOfQuestions: number;
    public rewardCoins: number;

    // Constructor được để private để ngăn việc khởi tạo từ bên ngoài
    private constructor() {
        this.numberOfQuestions = 10;
        this.rewardCoins = 400;
    }

    // Phương thức để lấy phiên bản duy nhất của lớp QuizSettings
    public static getInstance(): QuizSettings {
        if (!QuizSettings.instance) {
            QuizSettings.instance = new QuizSettings();
        }
        return QuizSettings.instance;
    }

    // Phương thức để cập nhật các thiết lập quiz
    public updateSettings(numberOfQuestions: number, rewardCoins: number, timeLimit: number): void {
        this.numberOfQuestions = numberOfQuestions;
        this.rewardCoins = rewardCoins;
    }

    // Hiển thị cấu hình hiện tại
    public showSettings(): void {
        console.log(`Số lượng câu hỏi: ${this.numberOfQuestions}`);
        console.log(`Phần thưởng: ${this.rewardCoins} coins`);
    }
}