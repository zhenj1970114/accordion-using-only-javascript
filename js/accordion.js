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
     * TOGGLE SUB NAVIGATION
     *
     * Reveals/hides a sub navigation, of which there can be more than one. (This
     * example contains at least five.) Only one sub nav can be shown at any one
     * time, and all the sub navs can be closed, or hidden.
     *
     * @return {void}
     */
    function toggleSubNavigation() {

        //
        // Compare the position of the element that triggered this function with the
        // position of the same element in the navHeadings array. The method
        // compareDocumentPosition returns the number 0 when a match is found, thus
        // providing us with the index of the element in the array that triggered
        // this function.
        //
        for (index = 0; index < amountOfNavHeadings; index++) {
            if (0 === this.parentNode.compareDocumentPosition(navHeadings[index])) {
                break;
            }
        }

        //
        // The sub navigation can exist in one of only three states: all sub navs
        // hidden; one sub nav showing and the same sub nav is clicked in order to
        // hide it; and, one sub nav showing while a different sub nav is clicked.
        // The following if...else structure handles all these cases.
        //
        if (allSubNavsAreHidden) {
            indexOfNavShowing = index;
            subNavContainers[index].classList.add(
                'reveal-sub-nav'
            );
            allSubNavsAreHidden = false;
        } else {
            if (index === indexOfNavShowing) {
                subNavContainers[index].classList.remove(
                    'reveal-sub-nav'
                );
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
