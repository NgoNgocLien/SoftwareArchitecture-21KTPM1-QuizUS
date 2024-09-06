class Brand {
    id_brand: number;
    name: string;
    field: string;
    address: string;
    lat: string;
    long: string;
    is_active: boolean;
    username: string;
    pwd: string;
    phone: string;
    email: string;
    logo: string;
    
    constructor(id_brand: number, name: string, field: string, address: string, lat: string, long: string, is_active: boolean, username: string, pwd: string, phone: string, email: string, logo: string) {
        this.id_brand = id_brand;
        this.name = name;
        this.field = field;
        this.address = address;
        this.lat = lat;
        this.long = long;
        this.is_active = is_active;
        this.username = username;
        this.pwd = pwd;
        this.phone = phone;
        this.email = email;
        this.logo = logo;
    }
}

// "id_brand": 1,
// "name": "Highlands",
// "field": "Cafe & Bánh",
// "address": "123 Đường A, Quận 1, TP.HCM",
// "lat": "10.762622",
// "long": "106.660172",
// "is_active": true,
// "username": "highlands",
// "pwd": "123456",
// "phone": "0901234567",
// "email": "highlands@example.com",
// "logo": "https://res.cloudinary.com/dyvmxcaxw/image/upload/v1725438808/image_27_yhpkap.png"