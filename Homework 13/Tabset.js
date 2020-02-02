class Tabset {
    constructor(elementId, selectedTabIndex, config, ) {
        this.config = config || {
            hideAll: true
        };

        this.el = document.getElementById(elementId);
        this.selectedTabIndex = selectedTabIndex;

        this.init();
    }

    static TABSET_CLASS = 'tabset';
    static TABSET_HEADER_CLASS = 'tabset-header';
    static TABSET_TITLE_CLASS = 'tabset-title';
    static TABSET_CONTENT_CLASS = 'tabset-content';
    static TABSET_BUTTON_CLASS = 'tabset-button';    
    static TABSET_ITEM_TITLE_CLASS = 'tabset-item-title';
    static TABSET_ITEM_CONTENT_CLASS = 'tabset-item-content';
    static TABSET_ITEM_NAME = 'tabset-item-';
    static TABSET_ITEM_BUTTON1_ID = 'btnSwitchTabLeft';
    static TABSET_ITEM_BUTTON1_LABEL = '<';
    static TABSET_ITEM_BUTTON2_ID = 'btnSwitchTabRight';
    static TABSET_ITEM_BUTTON2_LABEL = '>';
    static ACTIVE_ITEM_CLASS = 'active';

    init() {
        this.formatDivs();
        this.createButtons();
        this.bindClasses();
        this.bindCallbacks();        
    }

    formatDivs() {
        this.maxTabIndex = this.el.children.length;
        this.divHeader = this.createDiv(this.el, Tabset.TABSET_HEADER_CLASS);
        this.divTitles = this.createDiv(this.divHeader, Tabset.TABSET_TITLE_CLASS);
        this.divButtons = this.createDiv(this.divHeader, Tabset.TABSET_BUTTON_CLASS);
        this.divContent = this.createDiv(this.el, Tabset.TABSET_CONTENT_CLASS);

        for (let i = 0; i < this.maxTabIndex; i++) {
            const divTab = this.el.children[0];            
            const tabItemName = Tabset.TABSET_ITEM_NAME + i;
            this.moveElement(divTab.children[0], this.divTitles, tabItemName);
            this.moveElement(divTab.children[0], this.divContent, tabItemName);
            divTab.remove();
        }

        this.showInnerIndex();
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
            Tabset.TABSET_ITEM_BUTTON1_LABEL,
            Tabset.TABSET_ITEM_BUTTON1_ID
        );
        
        this.buttonLeft.addEventListener('click', this.prevTab());

        this.buttonRight = this.createTabButton(
            Tabset.TABSET_ITEM_BUTTON2_LABEL,
            Tabset.TABSET_ITEM_BUTTON2_ID
        );

        this.buttonRight.addEventListener('click', this.nextTab());
    }

    createTabButton(label, id) {
        const buttonNew = document.createElement('button');
        buttonNew.innerHTML = label || '';
    
        if (!!id) { buttonNew.id = id; }
    
        this.divButtons.append(buttonNew);
    
        return buttonNew;
    }

    prevTab() {
        if (this.selectedTabIndex > 0) {
            this.selectedTabIndex--;
        }
        else {
            this.selectedTabIndex = this.maxTabIndex;
        }
        this.showInnerIndex();
    }

    nextTab() {
        if (this.selectedTabIndex < this.maxTabIndex) {
            this.selectedTabIndex++;
        }
        else {
            this.selectedTabIndex = 0;
        }
        this.showInnerIndex();
    }

    bindClasses() {
        this.bindClass(this.divTitles.children, Tabset.TABSET_ITEM_TITLE_CLASS);
        this.bindClass(this.divContent.children, Tabset.TABSET_ITEM_CONTENT_CLASS);   
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
            case e.target.parentNode.classList.contains(Tabset.TABSET_TITLE_CLASS)
            && !this.isVisible(clickedItem):
                this.onTitleClick(clickedItem);
                break;
        }
    }

    onTitleClick(titleElem) {              
        const tabName = titleElem.getAttribute('name');

        if (this.config.hideAll) {
            this.hideByClass(Tabset.ACTIVE_ITEM_CLASS);
        }

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
        this.showInnerIndex();
    }

    showInnerIndex() {
        const tabName = Tabset.TABSET_ITEM_NAME + this.selectedTabIndex;
        this.hideByClass(Tabset.ACTIVE_ITEM_CLASS);        
        this.showByName(tabName);
    }
}
