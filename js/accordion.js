/*jslint browser: true*/

window.onload = function () {
    var allSubNavsAreHidden = true,
        subNavContainers    = [],
        heightOfSubNav      = [],
        anchorLinkTriggers  = [],
        subNavShowing       = [],
        styleSheet          = document.styleSheets[0],
        navHeadings         = document.querySelectorAll('[data-sub-nav-heading]'),
        amountOfNavHeadings = navHeadings.length,
        indexOfNavShowing,
        index;

    for (index = 0; index < amountOfNavHeadings; index++) {
        anchorLinkTriggers[index] = navHeadings[index].querySelector('a');
        subNavContainers[index] = navHeadings[index].querySelector('ul');
        subNavShowing[index] = false;
    }

    /**
     *
     */
    function toggleSubNavigation() {
        for (index = 0; index < amountOfNavHeadings; index++) {
            if (0 === this.parentNode.compareDocumentPosition(navHeadings[index])) {
                break;
            }
        }

        if (allSubNavsAreHidden) {
            indexOfNavShowing = index;
            subNavContainers[index].classList.add('reveal-sub-nav');
            allSubNavsAreHidden = false;
        } else {
            if (index === indexOfNavShowing) {
                subNavContainers[index].classList.remove('reveal-sub-nav');
                allSubNavsAreHidden = true;
            } else {
                subNavContainers[indexOfNavShowing].classList.remove(
                    'reveal-sub-nav'
                );
                subNavContainers[index].classList.add(
                    'reveal-sub-nav'
                );
                indexOfNavShowing = index;
            }
        }
    }

    for (index = 0; index < amountOfNavHeadings; index++) {
        heightOfSubNav[index] = subNavContainers[index].clientHeight;
        styleSheet.insertRule(
            '[data-sub-nav-heading]:nth-child(' +
                (index + 1) + ') > ul.reveal-sub-nav { height: ' +
                heightOfSubNav[index] + 'px; }',
            styleSheet.cssRules.length
        );

        anchorLinkTriggers[index].addEventListener(
            'click',
            toggleSubNavigation,
            false
        );
    }

    styleSheet.insertRule('[data-sub-nav-heading] > ul { height:' +
        ' 0; }', styleSheet.cssRules.length);
};
