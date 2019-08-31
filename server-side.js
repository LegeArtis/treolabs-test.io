/*
Back-End
 */
const userList = [
    {
        id : 0,
        userName : 'admin',
        password : 'admin',
        basket: [],
        itemHistory: []
    },
    {
        id: 1,
        userName: 'user',
        password: '1234',
        basket: [],
        itemHistory: []
    }
];

const searchUser = (login, pass)=> {
    return  userList.find(({userName, password}) => (userName === login && password === pass))
};

const itemList = [
    {
        id: 0,
        title: 'Samsung Galaxy S10 Plus 12GB/1TB Сeramic Black',
        description: 'Экран (6.4", Dynamic AMOLED, 3040x1440)/ Samsung Exynos 9820 (2 x 2.7 ГГц + 2 x 2.3 ГГц + 4 x 1.9 ГГц)/ тройная основная камера: 12 Мп + 12 Мп + 16 Мп / двойная фронтальная: 10 Мп + 8 Мп/ RAM 12 ГБ/ 1 TБ встроенной памяти + microSD (до 512 ГБ)/ 3G/ LTE/ GPS/ A-GPS/ ГЛОНАСС/ BDS/ поддержка 2х SIM-карт (Nano-SIM)/ Android 9.0 (Pie) / 4100 мА*ч',
        image: 'https://i2.rozetka.ua/goods/11849918/copy_samsung_galaxy_s10_plus_8_512_gb_ceramic_black_sm_g975fckgsek_5cb828fab2123_images_11849918460.jpg',
        price: '45999'
    },
    {
        id : 1,
        title : 'Xiaomi Redmi Note 7 4/64GB Blue',
        description : 'Экран (6.3", IPS, 2340x1080)/ Qualcomm Snapdragon 660 (2.2 ГГц + 1.84 ГГц)/ двойная основная камера: 48 Мп + 5 Мп, фронтальная камера: 13 Мп/ RAM 4 ГБ/ 64 ГБ встроенной памяти + microSD (до 256 ГБ)/ 3G/ LTE/ GPS/ GLONASS/ поддержка 2х SIM-карт (Nano-SIM)/ Android 9.0/ 4000 мА*ч',
        image : 'https://i1.rozetka.ua/goods/11955900/copy_xiaomi_redmi_note_7_4_128gb_blue_5cbec3b0d2c66_images_11955900606.jpg',
        price : '5999'
    },
    {
        id: 2,
        title: 'Samsung Galaxy A30 3/32GB Black (SM-A305FZKUSEK)',
        description: 'Экран (6.4", Super AMOLED, 2340x1080)/ Samsung Exynos 7904 (2x1.8 ГГц + 6x1.6 ГГц)/ двойная основная камера: 16 Мп + 5 Мп, фронтальная камера: 16 Мп/ RAM 3 ГБ/ 32 ГБ встроенной памяти + microSD (до 512 ГБ)/ 3G/ LTE/ GPS/ ГЛОНАСС/ поддержка 2х SIM-карт (Nano-SIM)/ Android 9.0 (Pie)/ 4000 мА*ч',
        image: 'https://i1.rozetka.ua/goods/11488209/samsung_sm_a305fzkusek_images_11488209614.jpg',
        price: '5799'
    },
    {
        id: 3,
        title: 'Samsung Galaxy A30 4/64GB Blue (SM-A305FZBOSEK)',
        description: 'Экран (6.4", Super AMOLED, 2340x1080)/ Samsung Exynos 7904 (2x1.8 ГГц + 6x1.6 ГГц)/ двойная основная камера: 16 Мп + 5 Мп, фронтальная камера: 16 Мп/ RAM 4 ГБ/ 64 ГБ встроенной памяти + microSD (до 512 ГБ)/ 3G/ LTE/ GPS/ ГЛОНАСС/ поддержка 2х SIM-карт (Nano-SIM)/ Android 9.0 (Pie)/ 4000 мА*ч',
        image: 'https://i2.rozetka.ua/goods/11488232/samsung_sm_a305fzbosek_images_11488232456.jpg',
        price: '6799'
    },
    {
        id: 4,
        title: 'Samsung Galaxy S8 64GB Midnight Black',
        description: 'Экран (5.8", Super AMOLED, 2960х1440)/ Samsung Exynos 8895 (4 x 2.3 ГГц + 4 x 1.7 ГГц)/ основная камера 12 Мп + фронтальная 8 Мп/ RAM 4 ГБ/ 64 ГБ встроенной памяти + microSD (до 256 ГБ)/ 3G/ LTE/ GPS/ поддержка 2х SIM-карт (Nano-SIM)/ Android 7.0 (Nougat) / 3000 мА*ч',
        image: 'https://i2.rozetka.ua/goods/1894533/samsung_galaxy_s8_64gb_black_images_1894533392.jpg',
        price: '15999'
    },
    {
        id: 5,
        title: 'Samsung Galaxy S10 Plus 8/128 GB Black',
        description: 'Экран (6.4", Dynamic AMOLED, 3040x1440)/ Samsung Exynos 9820 (2 x 2.7 ГГц + 2 x 2.3 ГГц + 4 x 1.9 ГГц)/ тройная основная камера: 12 Мп + 12 Мп + 16 Мп / двойная фронтальная: 10 Мп + 8 Мп/ RAM 8 ГБ/ 128 ГБ встроенной памяти + microSD (до 512 ГБ)/ 3G/ LTE/ GPS/ A-GPS/ ГЛОНАСС/ BDS/ поддержка 2х SIM-карт (Nano-SIM)/ Android 9.0 (Pie) / 4100 мА*ч',
        image: 'https://i2.rozetka.ua/goods/11052630/samsung_galaxy_s10_plus_6_128_gb_black_sm_g975fzkdsek_images_11052630657.jpg',
        price: '29999'
    },
    {
        id: 6,
        title: 'Apple iPhone XS Max 512Gb Space Gray',
        description: 'Флагман линейки смартфонов Apple iPhone XS Apple iPhone XS Max 512Gb - смартфон, характеристики которого - сплошные инновации! Первый в мире чип, изготовленный по 7-нанометровому техпроцессу. Cкорость работы новинки сразу в девять раз выше предшественника X!',
        image: 'https://i2.rozetka.ua/goods/12641344/97809136_images_12641344228.png',
        price: '32141'
    }
];
