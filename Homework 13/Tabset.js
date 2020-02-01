class Tabset {
    constructor(elementId, config) {
        this.config = config || {
        };

        this.el = document.getElementById(elementId);

        this.init();
    }

    static TABSET_CLASS = 'tabset';
    static TABSET_HEADER_CLASS = 'tabset-header';
    static TABSET_ITEM_TITLE_CLASS = 'tabset-item-title';
    static TABSET_ITEM_BUTTON_CLASS = 'tabset-item-button';
    static TABSET_ITEM_CONTENT_CLASS = 'tabset-item-content';
    static TABSET_ITEM_BUTTON1_ID = 'buttonLeft';
    static TABSET_ITEM_BUTTON1_LABEL = '<';
    static TABSET_ITEM_BUTTON2_ID = 'buttonRight';
    static TABSET_ITEM_BUTTON2_LABEL = '>';
    static ACTIVE_ITEM_CLASS = 'active';

    init() {
        this.formatDivs();
        // this.bindClasses();
        this.bindCallbacks();        
    }

    formatDivs() {
        const tabsCount = this.el.children.length;
        this.divHeader = this.createDiv(this.el, '', Tabset.TABSET_HEADER_CLASS);
        this.divTitles = this.createDiv(this.divHeader, '', Tabset.TABSET_ITEM_TITLE_CLASS);
        this.divButtons = this.createDiv(this.divHeader, '', Tabset.TABSET_ITEM_BUTTON_CLASS);
        this.divContent = this.createDiv(this.el, '', Tabset.TABSET_ITEM_CONTENT_CLASS);

        for (let i = 0; i < tabsCount; i++) {    
            let divTab = this.el.children[0];
            this.divTitles.append(divTab.children[0]);
            this.divContent.append(divTab.children[0]);    
            divTab.remove();
        }

        this.buttonLeft = this.createButton(this.divButtons,Tabset.TABSET_ITEM_BUTTON1_LABEL, Tabset.TABSET_ITEM_BUTTON1_ID);
        this.buttonRight = this.createButton(this.divButtons,Tabset.TABSET_ITEM_BUTTON2_LABEL, Tabset.TABSET_ITEM_BUTTON2_ID);

        this.show(this.divContent.children[0]);
    }

    createDiv(parent, content, className) {
        const divNew = document.createElement('div');
        divNew.innerHTML = content || '';
    
        if (!!className) { divNew.className = className; }
    
        parent.append(divNew);
    
        return divNew;
    }

    createButton(parent, label, id) {
        const buttonNew = document.createElement('button');
        buttonNew.innerHTML = label || '';
    
        if (!!id) { buttonNew.id = id; }
    
        parent.append(buttonNew);
    
        return buttonNew;
    }

    bindClasses() {
        // this.el.classList.add(Tabset.TABSET_CLASS);
        Array.prototype.forEach.call(this.divTitles.children, itemEl => {
            itemEl.classList.add(Tabset.TABSET_ITEM_CLASS);
            itemEl.children[0].classList.add(
                Tabset.TABSET_ITEM_TITLE_CLASS
            );
            itemEl.children[1].classList.add(
                Tabset.TABSET_ITEM_CONTENT_CLASS
            );
        });
    }

    bindCallbacks() {
        this.el.addEventListener('click', this.onTabsetClick.bind(this));
    }

    onTabsetClick(e) {
        switch (true) {
            case e.target.classList.contains(
                Tabset.TABSET_ITEM_TITLE_CLASS
            ):
                this.onTitleClick(e.target);
                break;
        }
    }

    onTitleClick(titleElem) {
        const itemElem = titleElem.parentNode;
        const isCurrentVisible = this.isVisible(itemElem);

        if (this.config.hideAll) {
            this.hideAll();
        }

        if (!isCurrentVisible) {
            this.show(itemElem);
        }
        else {
            this.hide(itemElem);
        }
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

    hideAll() {
        const visibleElements = this.el.querySelectorAll(
            '.' + Tabset.ACTIVE_ITEM_CLASS
        );

        Array.prototype.forEach.call(visibleElements, this.hide.bind(this));
    }

    showIndex(index) {        
        this.show(this.el.children[index]);
    }

    hideIndex(index) {
        this.hide(this.el.children[index]);
    }
}
