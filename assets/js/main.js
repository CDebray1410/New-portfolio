window.onload = function () {
    const dropdownButtons = document.querySelectorAll('.dropdown-button');
    const qualificationButtons = document.querySelectorAll('.qualification_section div.col-6');

    dropdownButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Change arrow icon to down or up depending on what the previous state of dropdown menu was
            const buttonDropdownIcon = button.querySelector('img');
            let buttonDropdownIconSrc = buttonDropdownIcon.src;
            const buttonDropdownIconState = buttonDropdownIconSrc.includes("bottom");
            const buttonDropdownPreviousState = buttonDropdownIconState ? "bottom" : "up";
            const buttonDropdownNewState = buttonDropdownIconState ? "up" : "bottom";
            
            let regex = new RegExp(buttonDropdownPreviousState, "g");
            let newButtonDropdownIconSrc = buttonDropdownIconSrc.replace(regex, buttonDropdownNewState);
            buttonDropdownIcon.src = newButtonDropdownIconSrc;

            // Display or hide dropdown content
            button.nextElementSibling.classList.toggle('active')
        })
    });

    for (let index = 0; index < qualificationButtons.length; index++) {
        
        const qualificationCategoryButton = qualificationButtons[index];
        qualificationCategoryButton.addEventListener('click', function () {
            if (qualificationCategoryButton.classList.contains('color-purple')) {
                return;
            }
            // 0 work 1 Qualification
            const previousSelectedQualficationCategoryButton = index === 1 ? qualificationButtons[0] : qualificationButtons[1];
            previousSelectedQualficationCategoryButton.classList.toggle('color-purple');
            qualificationCategoryButton.classList.toggle('color-purple');

        })
    }
}