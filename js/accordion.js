/*jslint browser: true*/

window.onload = function () {
    var allSubNavsAreHidden = true,
        subNavContainers    = [],
        anchorLinkTriggers  = [],
        subNavShowing       = [],
        styleSheet          = document.styleSheets[0],
        amountOfCSSRules    = styleSheet.cssRules.length || styleSheet.rules.length,
        topNavItem          = document.querySelectorAll('[data-top-nav-item]'),
        amountOfTopNavItems = topNavItem.length,
        indexOfSubNavShowing,
        index;

    for (index = 0; index < amountOfTopNavItems; index++) {
        anchorLinkTriggers[index] = topNavItem[index].querySelector('a');
        subNavContainers[index] = topNavItem[index].querySelector('ul');
        subNavShowing[index] = false;
    }

    function toggleSubNavigation() {
        for (index = 0; index < amountOfTopNavItems; index++) {
            if (0 === this.parentNode.compareDocumentPosition(topNavItem[index])) {
                break;
            }
        }

        if (allSubNavsAreHidden) {
            indexOfSubNavShowing = index;
            subNavContainers[index].classList.add(
                'reveal-sub-nav'
            );
            allSubNavsAreHidden = false;
        } else {
            if (index === indexOfSubNavShowing) {
                subNavContainers[index].classList.remove(
                    'reveal-sub-nav'
                );
                allSubNavsAreHidden = true;
            } else {
                subNavContainers[indexOfSubNavShowing].classList.remove(
                    'reveal-sub-nav'
                );
                subNavContainers[index].classList.add(
                    'reveal-sub-nav'
                );
                indexOfSubNavShowing = index;
            }
        }
    }

    for (index = 0; index < amountOfTopNavItems; index++) {
        styleSheet.insertRule(
            '[data-top-nav-item]:nth-child(' +
                (index + 1) + ') > ul.reveal-sub-nav { height: ' +
                subNavContainers[index].clientHeight + 'px; }',
            amountOfCSSRules++
        );

        anchorLinkTriggers[index].addEventListener(
            'click',
            toggleSubNavigation,
            false
        );
    }

    styleSheet.insertRule('[data-top-nav-item] > ul { height: 0; }',
        amountOfCSSRules
        );
};
