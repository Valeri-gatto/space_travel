const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');
const image = document.querySelectorAll('picture');
const info = document.querySelectorAll('.destination-info');

tabList.addEventListener("keydown", changeTabFocus);
tabs.forEach((tab) => {
    tab.addEventListener("click", changeTabPanel);
});


let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37;
    const keydownRight = 39;

    if (e.keyCode === keydownRight || e.keyCode === keydownLeft) {
        tabs[tabFocus].setAttribute("tabindex", -1);

        if (e.keyCode === keydownRight) {
            tabFocus++;
            if (tabFocus >= tabs.length) {
                tabFocus = 0;
            }
        } else if (e.keyCode === keydownLeft) {
            tabFocus--;
            if (tabFocus < 0) {
                tabFocus = tabs.length - 1;
            }
        }

        tabs[tabFocus].setAttribute("tabindex", 0);
        tabs[tabFocus].focus();
    }
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls');
    const targetImage = targetTab.getAttribute('data-image');
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;

    // делаем предыдущую кнопку неактивной
    tabContainer.querySelector('[aria-selected=true]').setAttribute("aria-selected", false);

    // делаем кнопку активной
    targetTab.setAttribute("aria-selected", true);

    // меняем текст
    hideContent(mainContainer, 'article');
    showContent(mainContainer, [`#${targetPanel}`]);

    // меняем картинку
    hideContent(mainContainer, 'picture');
    showContent(mainContainer, [`#${targetImage}`]);
}

function hideContent(parent, content) {
    parent.querySelectorAll(content)
        .forEach((item) => item.setAttribute("hidden", true));
}

function showContent(parent, content) {
    parent.querySelector(content)
        .removeAttribute('hidden');
}
