const changeValue = (ev ,count = 0)=> {
    const minValue = document.getElementById('min').value;
    const maxValue = document.getElementById('max').value;
    document.getElementById('max_value').textContent = maxValue;
    document.getElementById('min_value').textContent = minValue;
    currentItemList = currentItemList.filter(({price}) => {
        return  +price > +minValue && +price < +maxValue});
    drawList(currentItemList, count);
};

const sort = ()=> {
    const value = document.getElementById('select').value;
    let sortedList;
    if (value === 'price') {
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
};

const search = ()=> {
    const value = document.getElementById('search').value;
    currentItemList = currentItemList.filter(({title}) => title.toLowerCase().includes(value.toLowerCase()));
};

const fullSort = ()=> {
    sort();
    search();
    changeValue();
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
    searchInput.addEventListener('keyup', fullSort, false);

    labelForSelect.textContent = 'Sort by';
    labelForSelect.htmlFor = 'select';
    labelForSelect.className = 'select';

    select.id = 'select';
    select.addEventListener('change', fullSort, false);
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
    inputMin.addEventListener('input', fullSort, false);

    labelForMax.htmlFor = 'max';
    labelForMax.textContent = 'Max price';
    labelForMax.className = 'label_for_range';
    inputMax.id = 'max';
    inputMax.type = 'range';
    inputMax.min = '0';
    inputMax.max = '50000';
    inputMax.step = '100';
    inputMax.value = '50000';
    inputMax.addEventListener('input', fullSort, false);

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

    searchDiv.id = 'search_block';
    searchDiv.appendChild(firstSearchPart);
    searchDiv.appendChild(secondSearchPart);

    document.getElementById('header').appendChild(searchDiv);
};
