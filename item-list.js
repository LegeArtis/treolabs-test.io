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

    const index = user.itemHistory.findIndex(({id}) => id === item.id);
    if (index >= 0) {
        user.itemHistory[index].date = Date.now();
    } else {
        user.itemHistory.push({...item, date: Date.now()});
    }
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
    if (currentPag < currentItemList.length - 1) {
        changeValue(null, currentPag + 1);
    }
};

const goTo = ({target: {id}})=> {
    changeValue(null, id);
};

const drawList = (list, listNumber = 0)=> {
    const listDivExist = document.getElementById('list_div');
    const listDiv = document.createElement('div');
    const ul = document.createElement('ul');
    const h1 = document.createElement('h1');

    if (listDivExist) {
        document.body.removeChild(listDivExist);
    }

    listDiv.id = 'list_div';
    ul.id = 'list';

    if (list.length > 0) {
        const pagination = createPagination(list.length, listNumber);
        const {id, title, image, price} = list[+listNumber];
        const img = document.createElement('img');
        const button = document.createElement('button');
        const li = document.createElement('li');
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
        listDiv.appendChild(pagination);
        ul.appendChild(li);
    } else {
        h1.textContent = 'Cannot find product!';
        ul.appendChild(h1);
    }



    listDiv.appendChild(ul);
    document.body.appendChild(listDiv);
    createHistory();
};
