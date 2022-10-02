window.onload = function () {
    const dropdownButtons = document.querySelectorAll('.dropdown-button');
    const qualificationButtons = document.querySelectorAll('.qualification_section div.col-6');
    const qualificationInfosContainer = document.getElementById('qualification_section_infos');
    const portfolioInfosContainer = document.getElementById('portfolio_section__projects');
    const projectImagesDirectoryPath = './assets/images/project_images',

    // Refacto import json from another file
    const workInfos = [
        {
            'title': 'Full stack developer',
            'companyOrSchool': 'Club Employés',
            'start': '2021',
            'end': '2022'
        },
        {
            'title': 'Full stack developer',
            'companyOrSchool': 'Club Employés',
            'start': '2021',
            'end': '2022'
        }
    ]
    const educationInfos = [
        {
            'title': 'Full stack developer formation',
            'companyOrSchool': 'Epitech',
            'start': '2020',
            'end': '2022'
        },
        {
            'title': 'Developer formation',
            'companyOrSchool': 'ESGI',
            'start': '2022',
            'end': '2023'
        }
    ]
    const projectsInfos = [
        {
            'tag': 'Front',
            'images': [
                'image' = '',
                'illustration' = ''
            ],
            'name': 'Quizz game',
            'type': 'Type',
            'infos': [
                '2 week duration',
                'In a group of 3',
                'Quizz website'
            ],
            'languages': [
                'PHP',
                'Symfony',
                'MySQL'
            ],
            'description': 'A quizz game',
            'link': ''
        }
    ]

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
            // 0 work 1 Qualification
            const previousSelectedQualficationCategoryButton = index === 1 ? qualificationButtons[0] : qualificationButtons[1];
            previousSelectedQualficationCategoryButton.classList.toggle('color-purple');
            qualificationCategoryButton.classList.toggle('color-purple');
            
            if (index === 0) {
                fillQualificationInfoBox(workInfos);
                return;
            }

            fillQualificationInfoBox(educationInfos);
        })
    }

    function fillQualificationInfoBox(qualificationInfos) {
        qualificationInfosContainer.innerHTML = "";

        let infosBoxString = ""
        qualificationInfos.forEach(qualification => {
            infosBoxString += `
                <div class="qualification_section_infos__box">
                    <span class="qualification_section_infos__box__pellet"></span>
                    <div>
                        <p>${qualification.title}</p>
                        <p>${qualification.companyOrSchool}</p>
                    </div>
                    <p>${qualification.start} - ${qualification.end}</p>
                </div>
            `
        });
        qualificationInfosContainer.innerHTML = infosBoxString;
    }

    function fillPortfolioSection(projectsInfos) {
        let portfolioSectionString = ""

        projectsInfos.forEach(project => {
            portfolioSectionString += `
                <div class="portfolio_section__projects__card__top"
                    data-tag="${project.tag}"
                    data-images="${project.images}"
                    data-name="${project.name}"
                    data-type="${project.type}"
                    data-infos="${project.infos}"
                    data-languages="${project.languages}"
                    data-description="${project.description}"
                    data-link="${project.link}"
                >
                    <div></div>
                    <div class="centered-section-item-block">
                        <img src="./assets/images/tags-purple.png" alt="Icon representing a tag" class="icon-xs" />
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
            `;
        });
    }

    portfolioInfosContainer.innerHTML = portfolioSectionString;
}