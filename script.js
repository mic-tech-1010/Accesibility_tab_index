class NavigationBar {
    constructor(domNode) {
        this.rootNode = domNode;
        this.useArrowKeys = true;
        this.controlledNodes = [];
        this.navMenu = this.rootNode.querySelector('.nav__menu');
        this.navList = this.navMenu.querySelector('ul')
        this.openNavButton = this.rootNode.querySelector('.nav__open');
        this.media = window.matchMedia('(width < 40em)');
        this.setupTopNav(this.media);
        this.topLevelNodes = [
            ...this.navList.querySelectorAll(
                '.main-link, button[aria-expanded][aria-controls]'
            ),
        ];

        this.topLevelNodes.forEach((node) => {
            if (node.tagName.toLowerCase() === 'button' &&
                node.hasAttribute('aria-controls')
            ) {
                const menu = node.parentNode.querySelector('ul');

                if (menu) {
                    this.controlledNodes.push(menu);

                    node.setAttribute('aria-expanded', 'false');


                    // menu.addEventListener('keydown', this.onMenuKeyDown.bind(this));
                    node.addEventListener('click', this.onButtonClick.bind(this));
                    // node.addEventListener('keydown', this.onButtonKeyDown.bind(this));

                }

            }

            else {
                this.controlledNodes.push(null);
                // node.addEventListener('keydown', this.onLinkKeyDown.bind(this));
            }

        });

        // this.rootNode.addEventListener('focusout', this.onBlur.bind(this));
        this.openNavButton.addEventListener('click', this.onToogleNavBar.bind(this));
        this.media.addEventListener('change', this.changeMedia.bind(this));
    }

    controlFocusByKey(keyboardEvent, nodeList, currentIndex) {
        switch (keyboardEvent.key) {
            case 'ArrowUp':
            case 'ArrowLeft':
                keyboardEvent.preventDefault();
                if (currentIndex > -1) {
                    var prevIndex = Math.max(0, currentIndex - 1);
                    nodeList[prevIndex].focus();
                }
                break;
            case 'ArrowDown':
            case 'ArrowRight':
                keyboardEvent.preventDefault();
                if (currentIndex > -1) {
                    var nextIndex = Math.min(nodeList.length - 1, currentIndex + 1);
                    nodeList[nextIndex].focus();
                }
                break;
            case 'Home':
                keyboardEvent.preventDefault();
                nodeList[0].focus();
                break;
            case 'End':
                keyboardEvent.preventDefault();
                nodeList[nodeList.length - 1].focus();
                break;
        }
    }

    toggleNavMenu() {

    }

    // toggle the nav bar in mobile view
    onToogleNavBar(e) {
        const button = e.currentTarget;
        const isExpanded = button.getAttribute('aria-expanded') === 'true';
        this.toggleMenu(button, !isExpanded);
        !isExpanded === true ? this.navMenu.removeAttribute('inert') : this.navMenu.setAttribute('inert', '');
    }

    onButtonClick(event) {
        var button = event.target;
        var buttonIndex = this.topLevelNodes.indexOf(button);
        var buttonExpanded = button.getAttribute('aria-expanded') === 'true';
        this.toggleExpand(buttonIndex, !buttonExpanded);
        //!buttonExpanded ? this.controlledNodes[buttonIndex].setAttribute('inert', '')
    }

    // toggle the sub item
    toggleExpand(index, expanded) {
        // close open menu, if applicable
        if (this.openIndex !== index) {
            this.toggleExpand(this.openIndex, false);
        }

        // handle menu at called index
        if (this.topLevelNodes[index]) {
            this.openIndex = expanded ? index : null;
            this.topLevelNodes[index].setAttribute('aria-expanded', expanded);
            this.toggleMenu(this.controlledNodes[index], expanded);
        }
    }

    setupTopNav(e) {
        if (e.matches) {
            // is mobile
            this.navMenu.setAttribute('inert', '');

        }
        else {
            // is tablet/desktop
            this.openNavButton.setAttribute('aria-expanded', 'false')
            this.navMenu.removeAttribute('inert');
        }
    }

    changeMedia(e) {
        this.setupTopNav(e);
    }


    toggleMenu(domNode, show) {
        if (domNode) {
            if (show) {
                domNode.setAttribute('aria-expanded', 'true');
                // this.navMenu.removeAttribute('inert');

            }
            else {
                domNode.setAttribute('aria-expanded', 'false');
                // this.navMenu.setAttribute('inert', '');
            }
        }
    }

    updateKeyControls(useArrowKeys) {
        this.useArrowKeys = useArrowKeys;
    }


}

window.addEventListener('load', function () {
    const nav = document.querySelector('.nav');
    new NavigationBar(nav)
})
