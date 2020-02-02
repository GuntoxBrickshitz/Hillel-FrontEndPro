class Tabset {
    constructor(elementId, selectedTabIndex, config) {
        this.config = config || {};

        this.el = document.getElementById(elementId);
        this.selectedTabIndex = selectedTabIndex;

        this.init();
    }

    static HEADER_CLASS = 'tabset-header';
    static TITLE_CLASS = 'tabset-title';
    static CONTENT_CLASS = 'tabset-content';
    static BUTTON_CLASS = 'tabset-button';    
    static ITEM_TITLE_CLASS = 'tabset-item-title';
    static ITEM_CONTENT_CLASS = 'tabset-item-content';
    static ITEM_NAME = 'tabset-item-';
    static BUTTON_RIGHT_ID = 'btnSwitchTabLeft';
    static BUTTON_RIGHT_LABEL = '<';
    static BUTTON_LEFT_ID = 'btnSwitchTabRight';
    static BUTTON_LEFT_LABEL = '>';
    static ACTIVE_ITEM_CLASS = 'active';

    init() {
        this.formatDivs();
        this.createButtons();
        this.bindClasses();
        this.bindCallbacks();
        this.showCurrentIndex();       
    }

    formatDivs() {
        this.maxTabIndex = this.el.children.length;
        this.divHeader = this.createDiv(this.el, Tabset.HEADER_CLASS);
        this.divTitles = this.createDiv(this.divHeader, Tabset.TITLE_CLASS);
        this.divButtons = this.createDiv(this.divHeader, Tabset.BUTTON_CLASS);
        this.divContent = this.createDiv(this.el, Tabset.CONTENT_CLASS);

        for (let i = 0; i < this.maxTabIndex; i++) {
            const divTab = this.el.children[0];            
            const tabItemName = Tabset.ITEM_NAME + (i + 1);
            this.moveElement(divTab.children[0], this.divTitles, tabItemName);
            this.moveElement(divTab.children[0], this.divContent, tabItemName);
            divTab.remove();
        }       
    }

    createDiv(parent, className) {
        const divNew = document.createElement('div');       
    
        if (!!className) { divNew.className = className; }    
        parent.append(divNew);
    
        return divNew;
    }

    moveElement(element, destination, newElementName) {
        if (!!newElementName) { element.setAttribute('name', newElementName); }
        destination.append(element);
    }

    createButtons() {
        this.buttonLeft = this.createTabButton(
            Tabset.BUTTON_RIGHT_LABEL,
            Tabset.BUTTON_RIGHT_ID
        );

        this.buttonRight = this.createTabButton(
            Tabset.BUTTON_LEFT_LABEL,
            Tabset.BUTTON_LEFT_ID
        );
    }

    createTabButton(label, id) {
        const buttonNew = document.createElement('button');
        buttonNew.innerHTML = label || '';
    
        if (!!id) { buttonNew.id = id; }
    
        this.divButtons.append(buttonNew);
    
        return buttonNew;
    }

    prevTab() {
        if (this.selectedTabIndex > 1) {
            this.selectedTabIndex--;
        }
        else {
            this.selectedTabIndex = this.maxTabIndex;
        }
        this.showCurrentIndex();
    }

    nextTab() {
        if (this.selectedTabIndex < this.maxTabIndex) {
            this.selectedTabIndex++;
        }
        else {
            this.selectedTabIndex = 1;
        }
        this.showCurrentIndex();
    }

    bindClasses() {
        this.bindClass(this.divTitles.children, Tabset.ITEM_TITLE_CLASS);
        this.bindClass(this.divContent.children, Tabset.ITEM_CONTENT_CLASS);   
    }

    bindClass(elements, className) {
        Array.prototype.forEach.call(elements, itemEl => {
            itemEl.classList.add(className);
        });
    }

    bindCallbacks() {
        this.el.addEventListener('click', this.onTabsetClick.bind(this));
    }

    onTabsetClick(e) {
        const clickedItem = e.target;    

        switch (true) {            
            case clickedItem.parentNode.classList.contains(Tabset.TITLE_CLASS)
            && !this.isVisible(clickedItem):
                this.onTitleClick(clickedItem);
                break;
            default:
                switch (clickedItem.id) {
                    case Tabset.BUTTON_RIGHT_ID:
                        this.prevTab();
                        break;
                    case Tabset.BUTTON_LEFT_ID:
                        this.nextTab();
                        break;
                }            
        }
    }

    onTitleClick(titleElem) {              
        const tabName = titleElem.getAttribute('name');
        this.hideByClass(Tabset.ACTIVE_ITEM_CLASS);
        this.showByName(tabName);
    }

    show(itemElem) {
        itemElem.classList.add(Tabset.ACTIVE_ITEM_CLASS);
    }

    hide(itemElem) {
        itemElem.classList.remove(Tabset.ACTIVE_ITEM_CLASS);
    }

    isVisible(itemElem) {
        return itemElem.classList.contains(Tabset.ACTIVE_ITEM_CLASS);
    }

    showByName(nameValue) {
        const selectedElements = this.el.querySelectorAll('[name=' + nameValue + ']');
        this.applyToElements(selectedElements, this.show.bind(this));        
    }

    hideByName(nameValue) {
        const selectedElements = this.el.querySelectorAll('[name=' + nameValue + ']');
        this.applyToElements(selectedElements, this.hide.bind(this));        
    }

    hideByClass(className) {
        const selectedElements = this.el.querySelectorAll('.' + className);
        this.applyToElements(selectedElements, this.hide.bind(this));        
    }

    applyToElements(elements, funcToApply) {
        Array.prototype.forEach.call(elements, funcToApply);
    }

    showIndex(index) {        
        this.selectedTabIndex = index;
        this.showCurrentIndex();
    }

    showCurrentIndex() {
        const tabName = Tabset.ITEM_NAME + this.selectedTabIndex;
        this.hideByClass(Tabset.ACTIVE_ITEM_CLASS);        
        this.showByName(tabName);
    }
}
