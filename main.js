let user;
let currentItemList;
let currentPag;


const logIn = ()=> {
    const login = document.getElementById('login');
    const pass = document.getElementById('pass');
    user = searchUser(login.value, pass.value);
    if (user) {
        currentItemList = itemList;
        searchBlock();
        sort();
        createHistory();
        authToggle();
        document.getElementById('wrong_auth').hidden = true;
        document.getElementById('welcome').textContent = `Welcome, ${user.userName}!`;
        login.value = '';
        pass.value = '';
        createBasket();
    } else {
        document.getElementById('wrong_auth').hidden = false;
    }
};

const logOut = ()=> {
    user = null;
    const list = document.getElementById('list_div');
    const history = document.getElementById('history_div');
    const basket = document.getElementById('basket_block');
    const searchBlock = document.getElementById('search_block');
    document.body.removeChild(history);
    document.body.removeChild(list);
    document.getElementById('header').removeChild(basket);
    document.getElementById('header').removeChild(searchBlock);
    authToggle();
};

const changeValue = (ev ,count = 0)=> {
    const minValue = document.getElementById('min').value;
    const maxValue = document.getElementById('max').value;
    document.getElementById('max_value').textContent = maxValue;
    document.getElementById('min_value').textContent = minValue;
    currentItemList = itemList.filter(({price}) => {
        return  +price > +minValue && +price < +maxValue});
    drawList(currentItemList, count);
};

const sort = (e = {target : {value: 'title'}})=> {
    let sortedList;
    if (e.target.value === 'price') {
        sortedList = itemList.sort((a, b)=> a.price - b.price);
    } else {
        sortedList = itemList.sort((a, b) => {
            const aTitle = a.title.toLowerCase();
            const bTitle = b.title.toLowerCase();
            if (aTitle < bTitle) {
                return -1;
            }
            if (aTitle > bTitle) {
                return 1;
            }
            return 0
        });
    }
    currentItemList = sortedList;
    changeValue();
};

const search = (e)=> {
    currentItemList = itemList.filter(({title}) => title.toLowerCase().includes(e.target.value.toLowerCase()));
    changeValue();
};

const clickBuy = ({target: {id}})=> {
    const basketItemIndex = user.basket.findIndex((el) => el.id === +id);
    if (basketItemIndex >= 0) {
        user.basket[basketItemIndex].count++
    } else {
        const item = currentItemList.find((el) => el.id === +id);
        user.basket.push({...item, count: 1});
    }
    refreshBasket();
};

const titleOnClick = ({target: {id}})=> {
    const item = currentItemList.find((el) => el.id === +id);
    const {image, title, description, price} = item;
    const inform = document.createElement('div');
    const img = document.createElement('img');
    const h1 = document.createElement('h1');
    const p = document.createElement('p');
    const buttonBuy = document.createElement('button');
    const buttonExit = document.createElement('p');

    user.itemHistory.push({...item, date: Date.now()});
    refreshHistory();

    img.src = image;
    h1.textContent = title;
    p.textContent = description;
    buttonBuy.textContent = `Buy ${price}UAH`;
    buttonBuy.addEventListener('click', clickBuy, false);
    buttonBuy.addEventListener('click', ()=> document.body.removeChild(inform), false);
    buttonBuy.id = id;
    buttonExit.textContent = 'x';
    buttonExit.id = 'inform_exit';
    buttonExit.addEventListener('click', ()=> document.body.removeChild(inform), false);


    inform.className = 'inform';
    inform.appendChild(buttonBuy);
    inform.appendChild(buttonExit);
    inform.appendChild(h1);
    inform.appendChild(img);
    inform.appendChild(p);
    document.body.appendChild(inform);
};

const createPagination = (count, activePag)=> {
    const pagDiv = document.createElement('div');
    const listOfLink = document.createElement('div');
    const prev = document.createElement('button');
    const next = document.createElement('button');
    const width = 100 + count * 50;

    for (let i = 0; i < count; i++) {
        const pagElem = document.createElement('button');
        if (i === +activePag) {
            pagElem.className = 'active_pagination';
            currentPag = i;
        }
        pagElem.textContent = `${i+1}`;
        pagElem.id = `${i}`;
        pagElem.addEventListener('click', goTo, false);
        listOfLink.appendChild(pagElem);
    }
    pagDiv.id = 'pagination_div';
    pagDiv.style.width = `${width}px`;
    listOfLink.id = 'links';
    listOfLink.style.display = 'grid';
    listOfLink.style.gridTemplateColumns = `repeat(${count}, 50px)`;

    prev.textContent = '<<';
    prev.addEventListener('click', goToPrev, false);
    next.textContent = '>>';
    next.addEventListener('click', goToNext, false);

    pagDiv.appendChild(prev);
    pagDiv.appendChild(listOfLink);
    pagDiv.appendChild(next);

    return pagDiv;
};


const goToPrev = ()=> {

    if (currentPag > 0) {
        changeValue(null, currentPag - 1);
    }
};

const goToNext = ()=> {
    console.log(currentPag);
    if (currentPag < currentItemList.length - 1) {
        changeValue(null, currentPag + 1);
    }
};

const goTo = ({target: {id}})=> {
    changeValue(null, id);
};

const drawList = (list, listNumber)=> {
    const listDivExist = document.getElementById('list_div');
    const listDiv = document.createElement('div');
    const ul = document.createElement('ul');
    const pagination = createPagination(list.length, listNumber);
    const {id, title, image, price} = list[+listNumber];
    const li = document.createElement('li');
    const img = document.createElement('img');
    const h1 = document.createElement('h1');
    const button = document.createElement('button');

    if (listDivExist) {
        document.body.removeChild(listDivExist);
    }

    listDiv.id = 'list_div';
    ul.id = 'list';
    h1.id = id;
    h1.textContent = title;
    h1.addEventListener('click', titleOnClick, false);
    button.textContent = `Buy (${price}UAH)`;
    button.addEventListener('click', clickBuy, false);
    button.id = id;
    img.src = image;

    li.appendChild(h1);
    li.appendChild(img);
    li.appendChild(button);
    ul.appendChild(li);

    listDiv.appendChild(pagination);
    listDiv.appendChild(ul);
    document.body.appendChild(listDiv);
    createHistory();
};

const deleteFromBasket = ({target: {id}})=> {
    const index = user.basket.findIndex((item)=> item.id === +id);
    console.log(index);
    user.basket.splice(index, 1);
    refreshBasket();
};

const refreshBasket = ()=> {
    const bodyBasket = document.getElementById('body');
    const isExist = document.getElementById('basket_ul');
    if (isExist) {
        bodyBasket.removeChild(isExist);
    }

    let totalPrice = 0;
    const ul = document.createElement('ul');
    ul.id = 'basket_ul';

    user.basket.reduce((previousValue, {title, count, id, price}) => {
        const li = document.createElement('li');
        const titleItem = document.createElement('p');
        const countItem = document.createElement('p');
        const deleteItem = document.createElement('p');

        totalPrice += price * count;
        titleItem.id = id;
        titleItem.textContent = title;
        titleItem.className = 'basket_item_title pointer_cursor width';
        titleItem.addEventListener('click', titleOnClick, false);
        countItem.className = 'basket_item_count';
        countItem.textContent = count;
        deleteItem.id = id;
        deleteItem.addEventListener('click', deleteFromBasket, false);
        deleteItem.textContent = 'X';
        deleteItem.className = 'basket_item_delete pointer_cursor';

        li.appendChild(titleItem);
        li.appendChild(countItem);
        li.appendChild(deleteItem);

        previousValue.appendChild(li);
        return previousValue;
    }, ul);

    document.getElementById('total').textContent = `Total: ${totalPrice} UAH`;
    bodyBasket.appendChild(ul);
};

const createBasket = ()=> {
    const basket = document.createElement('div');
    const h3 = document.createElement('h3');
    const bodyHeader = document.createElement('div');
    const body = document.createElement('div');
    const total = document.createElement('p');
    const bodyTitle = document.createElement('p');
    const bodyCount = document.createElement('p');
    const bodyDelete = document.createElement('p');

    basket.id = 'basket_block';
    h3.textContent = 'Basket';
    body.className = 'body';
    body.id = 'body';
    bodyHeader.className = 'body';
    total.textContent = 'Total: 0 UAH';
    total.id = 'total';
    bodyTitle.textContent = 'Title';
    bodyCount.textContent = 'Count';
    bodyDelete.textContent = 'Delete';

    bodyHeader.appendChild(bodyTitle);
    bodyHeader.appendChild(bodyCount);
    bodyHeader.appendChild(bodyDelete);

    basket.appendChild(h3);
    basket.appendChild(bodyHeader);
    basket.appendChild(body);
    basket.appendChild(total);

    document.getElementById('header').appendChild(basket);
};

const firstSearchBlock = ()=> {
    const firstSearchPart = document.createElement('div');
    const searchInput = document.createElement('input');
    const labelForSelect = document.createElement('label');
    const select = document.createElement('select');
    const optionByName = document.createElement('option');
    const optionByPrice = document.createElement('option');

    firstSearchPart.className = 'search_part';
    searchInput.id = 'search';
    searchInput.placeholder = 'search';
    searchInput.type = 'text';
    searchInput.addEventListener('keyup', search, false);

    labelForSelect.textContent = 'Sort by';
    labelForSelect.htmlFor = 'select';
    labelForSelect.className = 'select'

    select.id = 'select';
    select.addEventListener('change', sort, false);
    optionByName.textContent = 'title';
    optionByPrice.textContent = 'price';
    select.appendChild(optionByName);
    select.appendChild(optionByPrice);

    firstSearchPart.appendChild(searchInput);
    firstSearchPart.appendChild(labelForSelect);
    firstSearchPart.appendChild(select);

    return firstSearchPart;
};

const secondSearchBlock = ()=> {
    const secondSearchPart = document.createElement('div');
    const labelForMin = document.createElement('label');
    const labelForMax = document.createElement('label');
    const inputMin = document.createElement('input');
    const inputMax = document.createElement('input');
    const p = document.createElement('p');
    const spanMinValue = document.createElement('span');
    const spanMaxValue = document.createElement('span');
    const text = document.createElement('span');

    secondSearchPart.className = 'search_part';

    labelForMin.htmlFor = 'min';
    labelForMin.textContent = 'Min price';
    labelForMin.className = 'label_for_range';
    inputMin.id = 'min';
    inputMin.type = 'range';
    inputMin.min = '0';
    inputMin.max = '50000';
    inputMin.step = '100';
    inputMin.value = '0';
    inputMin.addEventListener('input', changeValue, false);

    labelForMax.htmlFor = 'max';
    labelForMax.textContent = 'Max price';
    labelForMax.className = 'label_for_range';
    inputMax.id = 'max';
    inputMax.type = 'range';
    inputMax.min = '0';
    inputMax.max = '50000';
    inputMax.step = '100';
    inputMax.value = '50000';
    inputMax.addEventListener('input', changeValue, false);

    spanMinValue.id = 'min_value';
    spanMinValue.textContent = '0';
    spanMaxValue.id = 'max_value';
    spanMaxValue.textContent = '50000';
    text.textContent = ' - ';
    p.appendChild(spanMinValue);
    p.appendChild(text);
    p.appendChild(spanMaxValue);

    secondSearchPart.appendChild(labelForMin);
    secondSearchPart.appendChild(inputMin);
    secondSearchPart.appendChild(labelForMax);
    secondSearchPart.appendChild(inputMax);
    secondSearchPart.appendChild(p);

    return secondSearchPart;
};

const searchBlock = ()=> {
    const searchDiv = document.createElement('div');
    const firstSearchPart = firstSearchBlock();
    const secondSearchPart = secondSearchBlock();
    // const search = document.createElement('input');
    // const labelForSelect = document.createElement('label');
    // const select = document.createElement('select');
    // const optionByName = document.createElement('option');
    // const optionByPrice = document.createElement('option');
    // const labelForMin = document.createElement('label');
    // const labelForMan = document.createElement('label');
    // const inputMin = document.createElement('input');
    // const inputMan = document.createElement('input');
    // const p = document.createElement('p');
    // const spanMinValue = document.createElement('span');
    // const spanMaxValue = document.createElement('span');
    // searchDiv.id = 'search_block';
    // firstSearchPart.className = 'search_part';
    // search.id = 'search';
    // search.placeholder = 'search';
    // search.type = 'text';
    // labelForSelect.textContent = 'Sort by';
    // labelForSelect.htmlFor = 'select';
    // select.id = 'select';
    // select.addEventListener('onchange', sort, false);
    // optionByName.textContent = 'title';
    // optionByPrice.textContent = 'name';
    // select.appendChild(optionByName);
    // select.appendChild(optionByPrice);
    //
    // firstSearchPart.appendChild(search);
    // firstSearchPart.appendChild(labelForSelect);
    // secondSearchPart.className = 'search_part';

    searchDiv.id = 'search_block';
    searchDiv.appendChild(firstSearchPart);
    searchDiv.appendChild(secondSearchPart);

    document.getElementById('header').appendChild(searchDiv);
};

const createHistory = ()=> {
      const existHistory = document.getElementById('history_div');
      if (existHistory) {
          document.body.removeChild(existHistory);
      }
      const historyDiv = document.createElement('div');
      historyDiv.id = 'history_div';
      document.body.appendChild(historyDiv);
      refreshHistory();
};

Date.prototype.toShortFormat = function() {

    const month_names =["Jan","Feb","Mar",
        "Apr","May","Jun",
        "Jul","Aug","Sep",
        "Oct","Nov","Dec"];

    const day = this.getDate();
    const month_index = this.getMonth();
    const year = this.getFullYear();
    const hours = this.getHours();
    let minutes = this.getMinutes();
    let seconds = this.getSeconds();
    if (seconds < 10) {
        seconds = '0' + seconds;
    }
    if (minutes < 10) {
        minutes = `0${minutes}`;
    }

    return `${day}-${month_names[month_index]}-${year} ${hours}:${minutes}:${seconds}`;
};

const refreshHistory = ()=> {
    const historyDiv = document.getElementById('history_div');
    if (historyDiv.firstChild) {
        historyDiv.removeChild(historyDiv.firstChild);
    }
    const ul = document.createElement('ul');

    const sortedHistory = user.itemHistory.sort((a, b) => b.date - a.date);

    sortedHistory.reduce((previousValue, currentValue) => {
        const li = document.createElement('li');
        const p = document.createElement('p');
        const dateP = document.createElement('p');

        p.id = currentValue.id;
        p.textContent = currentValue.title;
        p.addEventListener('click', titleOnClick, false);
        p.className = 'history_title pointer_cursor';
        dateP.id = 'history_date';
        const date = new Date(currentValue.date);
        dateP.textContent = date.toShortFormat();

        console.log(date.getHours());


        li.appendChild(p);
        li.appendChild(dateP);

        previousValue.appendChild(li);
        return previousValue;
    }, ul);

    historyDiv.appendChild(ul);
};




const authToggle = ()=> {
    const authOff = document.getElementById('auth_off');
    const authIn = document.getElementById('auth_in');
    authOff.hidden = !authOff.hidden;
    authIn.hidden = !authIn.hidden;
};


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
