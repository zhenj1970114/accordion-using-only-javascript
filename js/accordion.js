/*jslint browser: true*/

window.onload = function () {
    var allSubNavsAreHidden = true,
        subNavContainers    = [],
        heightOfSubNav      = [],
        anchorLinkTriggers  = [],
        subNavShowing       = [],
        styleSheet          = document.styleSheets[0],
        amountOfCSSRules    = styleSheet.cssRules.length || styleSheet.rules.length,
        topNavItem          = document.querySelectorAll('[data-top-nav-item]'),
        amountOfTopNavItems = topNavItem.length,
        indexOfSubNavShowing,
        index;

    for (index = 0; index < amountOfTopNavItems; index++) {
        //
        // Populate the anchorLinkTriggers array with references to the first <a>
        // descendant of each of the <li data-top-nav-item> elements.
        //
        anchorLinkTriggers[index] = topNavItem[index].querySelector('a');

        //
        // Populate the subNavContainers array with references to the first <ul>
        // descendant of each of the <li data-top-nav-item> elements.
        //
        subNavContainers[index] = topNavItem[index].querySelector('ul');

        //
        // Populate the subNavShowing Boolean array to false.
        //
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
        // position of the same element in the topNavItem array. The method
        // compareDocumentPosition returns the number 0 when a match is found, thus
        // providing us with the index of the element in the array that triggered
        // this function.
        //
        for (index = 0; index < amountOfTopNavItems; index++) {
            if (0 === this.parentNode.compareDocumentPosition(topNavItem[index])) {
                break;
            }
        }

        //
        // The sub navigation can exist in one of only three states: all sub navs
        // hidden; one sub nav showing and the same sub nav is clicked in order to
        // hide it; and, one sub nav showing while a different sub nav is clicked.
        // The following if...else structure handles all these cases.
        //
        // If all the sub navigations are hidden...
        //
        if (allSubNavsAreHidden) {
            //
            // use the index variable that was set in the for loop above to indicate
            // which item in the topNavItem array was clicked, assigning the value
            // to the indexOfSubNavShowing variable.
            //
            indexOfSubNavShowing = index;

            //
            // Reveal the sub nav, the unordered list (<ul>) item referred to by the
            // subNavContainers array, by assigning the reveal-sub-nav class to the
            // <ul> item indexed at subNavContainers[index].
            //
            subNavContainers[index].classList.add(
                'reveal-sub-nav'
            );

            //
            // Because it’s no longer true that all the sub navigations are hidden,
            // since we just revealed the <ul> item indexed at
            // subNavContainers[index], we set the allSubNavsAreHidden to false.
            //
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
        heightOfSubNav[index] = subNavContainers[index].clientHeight;
        styleSheet.insertRule(
            '[data-top-nav-item]:nth-child(' +
                (index + 1) + ') > ul.reveal-sub-nav { height: ' +
                heightOfSubNav[index] + 'px; }',
            amountOfCSSRules++
        );

        anchorLinkTriggers[index].addEventListener(
            'click',
            toggleSubNavigation,
            false
        );
    }

    styleSheet.insertRule('[data-top-nav-item] > ul { height: 0; }',
        amountOfCSSRules // Note: The postfix increment operator from the for
                         //       loop above has already incremented this value
                         //       to the next position. Thus, incrementing again
                         //       is un-necessary.
        );
};
