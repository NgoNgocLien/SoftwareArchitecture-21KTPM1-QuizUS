export class Player {
    id_player: string;
    username: string;
    pwd: string;
    avatar: string;
    dob: string;
    email: string;
    phone: string;
    gender: string;
    facebook: string;
    is_active: boolean;
    score: number;

    constructor(player: any) {
        this.id_player = player.id_player;
        this.username = player.username;
        this.pwd = player.pwd;
        this.avatar = player.avatar;
        this.dob = player.dob;
        this.email = player.email;
        this.gender = player.gender;
        this.phone = player.phone;
        this.facebook = player.facebook;
        this.is_active = player.is_active;
        this.score = player.score;
    }

    updateScore(score: number) {
        this.score = score;
    }
}