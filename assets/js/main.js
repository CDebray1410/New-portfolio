window.onload = function () {
    const dropdownButtons = document.querySelectorAll('.dropdown-button');
    const qualificationButtons = document.querySelectorAll('#qualification_section .qualification_section__filter');
    const qualificationInfosContainer = document.getElementById('qualification_section_infos');
    const portfolioInfosContainer = document.getElementById('portfolio_section__projects');
    const projectModal = document.getElementById('project_modal');
    const projectModalClose = document.getElementById('project_modal__content__close');
    const projectFilters = document.getElementsByClassName('portfolio_section__filter_nav')[0];
    const imagesDirectoryPath = './assets/images';

    function getLanguagesList(languages) {
        let portfolioLanguagesString = "";
        languages.forEach(language => {
            portfolioLanguagesString += `
                <li>
                    <img src="${imagesDirectoryPath}/icons/${language.toLowerCase()}.png" alt="Icon of the '${language}' language" class="icon-xs " />
                    <span>${language}</span>
                </li>
            `;
        })
        
        return portfolioLanguagesString;
    }

    function getProjectInfosList(projectInfos) {
        let portfolioInfosString = "";
        projectInfos.forEach(info => {
            portfolioInfosString += `
                <li>
                    <span>${info}</span>
                </li>
            `;
        })
        
        return portfolioInfosString;
    }

    function fillQualificationInfoBox(qualificationInfos) {
        qualificationInfosContainer.innerHTML = "";

        let infosBoxString = ""
        qualificationInfos.forEach(qualification => {
            infosBoxString += `
                <div class="qualification_section_infos__box">
                    <div>
                        <p>${qualification.title}</p>
                        <p>${qualification.companyOrSchool}</p>
                        <p>${qualification.start} - ${qualification.end}</p>
                        <span class="qualification_section_infos__box__pellet"></span>
                    </div>
                </div>
            `
        });
        qualificationInfosContainer.innerHTML = infosBoxString;
    }

    function fillPortfolioSection(projectsInfos) {
        let portfolioSectionString = ""

        projectsInfos.forEach(project => {
            portfolioSectionString += `
                <div class="portfolio_section__projects__card"
                    data-tag="${project.tag}"
                    data-images='${JSON.stringify(project.images)}'
                    data-name="${project.name}"
                    data-type="${project.type}"
                    data-infos="${project.infos}"
                    data-languages="${project.languages}"
                    data-description="${project.description}"
                    data-link="${project.link}"
                >
                    <div class="portfolio_section__projects__card__top">
                        <div></div>
                        <div class="centered-section-item-block">
                            <img src="./assets/images/icons/tags-purple.png" alt="Icon representing a tag" class="icon-xs" />
                            <span>${project.tag}</span>
                        </div>
                        <img src="${project.image}" alt="image of the project '${project.name}'" />
                    </div>
                    <div class="portfolio_section__projects__card__bottom background-project-box">
                        <p>
                            ${project.name}
                        </p>
                        <p>${project.type}</p>
                    </div>
                </div>
            `;
        });

        portfolioInfosContainer.innerHTML = portfolioSectionString;
    }

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

    fillQualificationInfoBox(workInfos);

    for (let index = 0; index < qualificationButtons.length; index++) {
        const qualificationCategoryButton = qualificationButtons[index];

        qualificationCategoryButton.addEventListener('click', function () {
            if (qualificationCategoryButton.classList.contains('color-purple')) {
                return;
            }

            const previousSelectedQualficationCategoryButton = index === 1 ? qualificationButtons[0] : qualificationButtons[1];
            const qualificationIllustration = document.getElementById('qualification_section__illustration');
            const newQualficationIllustrationName = index === 1 ? "education" : "working";
            const previousQualficationIllustrationName = index === 1 ? "working" : "education";
            console.error(newQualficationIllustrationName)
            let regex = new RegExp(previousQualficationIllustrationName, "g");
            let newQualficationIllustration = qualificationIllustration.src.replace(regex, newQualficationIllustrationName);
            qualificationIllustration.src = newQualficationIllustration;

            previousSelectedQualficationCategoryButton.classList.toggle('color-purple');
            qualificationCategoryButton.classList.toggle('color-purple');
            
            if (index === 0) {
                fillQualificationInfoBox(workInfos);
                return;
            }

            fillQualificationInfoBox(educationInfos);
        })
    }

    fillPortfolioSection(projectsInfos);

    const portfolioCards = document.getElementsByClassName('portfolio_section__projects__card');
    for (let i = 0; i < portfolioCards.length; i++) {
        portfolioCards[i].addEventListener('click', function () {
            const cardInfos = portfolioCards[i];
            const cardInfosImages = JSON.parse(cardInfos.dataset.images);
            const cardInfosName = cardInfos.dataset.name;
            const splittedProjectLanguages = cardInfos.dataset.languages.split(",");
            const splittedProjectInfos = cardInfos.dataset.infos.split(",");
            const projectModalContent = document.getElementById('project_modal__content');

            const projectIllustration = cardInfosImages.illustration ? cardInfosImages.illustration.toLowerCase() : 'base';

            document.getElementById('project_modal__content__box__languages').innerHTML = getLanguagesList(splittedProjectLanguages);
            document.getElementById('project_modal__content__box__infos').innerHTML = getProjectInfosList(splittedProjectInfos);
            document.getElementById('project_modal__content__box__tag').querySelector('span').innerHTML = cardInfos.dataset.tag;
            document.getElementById('project_modal__content__box__description').innerHTML = cardInfos.dataset.description;

            if (cardInfos.dataset.link) {
                document.getElementById('project_modal__content__box__link').innerHTML = `<a class="cta_button" href="${cardInfos.dataset.link}">
                    Link to project
                </a>`
            }
            projectModalContent.querySelector('aside').innerHTML = `<img src="${imagesDirectoryPath}/projects/illustrations/${projectIllustration}.png" alt="image of the project '${cardInfosName}'" />`;
            projectModal.classList.toggle('active');
        })
    }

    projectModalClose.addEventListener('click', function () {
        project_modal.classList.toggle('active');
    })

    projectFilters.querySelectorAll('div').forEach(filterElement => {
        filterElement.addEventListener('click', function () {
            const filter = filterElement.textContent.trim();
            const projectsToShow = filter === 'All' ? portfolioInfosContainer.querySelectorAll(`div[data-tag]`) : portfolioInfosContainer.querySelectorAll(`div[data-tag="${filter}"]`);
            projectsToShow.forEach(elementToShow => {
                elementToShow.classList.remove('hidden');
            });
            
            if(filter === 'All') {
                return;
            }

            const projectsToHide = portfolioInfosContainer.querySelectorAll(`div[data-tag]:not([data-tag="${filter}"])`);
            projectsToHide.forEach(elementToHide => {
                elementToHide.classList.add('hidden');
            });
        })
    });
}