

document.addEventListener('DOMContentLoaded', function () {
    const stepOptions = document.getElementById("center");
    const stepAddIngredients = document.getElementById("stepAddIngredients");
    const fetchButton = document.getElementById('scrapeIngredients');
    const resultsDiv = document.getElementById('ingredients');
    const backToOptionsButtons = document.querySelectorAll("#backToOptions");



    document.getElementById("addIngredientsOption").addEventListener("click", () => {
        showStep(stepAddIngredients);
    });

    backToOptionsButtons.forEach((button) => {
        button.addEventListener("click", () => {
            showStep(stepOptions);
        });
    });

    function showStep(step) {
        const allSteps = document.querySelectorAll("[id^='step']");
        allSteps.forEach((s) => {
            s.classList.add("hidden");
        });
        step.classList.remove("hidden");
    }

    fetchButton.addEventListener('click', function () {

        console.log("Obtaining url");
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            const currentTab = tabs[0];
            const currentUrl = currentTab.url;

            console.log(currentUrl);

            showStep(stepScrapeWebsite);

            // Replace 'API_URL' with the actual URL of your API
            console.log("Fetching data....")
            
            chrome.runtime.sendMessage({ url: currentUrl }, response => {
                console.log("response",response)
            })
        });
    });
});