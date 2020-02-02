'use strict';

const tabset = new Tabset('myTabset', 1);

document
    .getElementById('btn')
    .addEventListener('click', () => tabset.showIndex(2));