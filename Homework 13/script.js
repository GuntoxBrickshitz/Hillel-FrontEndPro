'use strict';

const tabset = new Tabset('myTabset', 0);

document
    .getElementById('btn')
    .addEventListener('click', () => tabset.showIndex(1));