var helpers = function () {
    var scrollFn = function (location) {
        browser.executeScript('window.scrollTo(' + location.x + ', ' + location.y + ');');
    };

    // The following wait removes test flakyness when we try to click an element that is not displayed yet
    this.wait = function (element) {
        browser.waitForAngular();
        browser.wait(function () {
            return element.isPresent();
        }, 10000);
        browser.wait(function () {
            return element.isDisplayed();
        }, 10000);
        return element;
    };

    this.waitForText = function (element, text) {
        this.wait(element);
        browser.wait(function () {
            return element.getText().then(function (t) {
                return t === text;
            });
        }, 10000);
        return element;
    };

    this.scrollThenClick = function (element) {
        this.wait(element);
        element.getLocation().then(scrollFn).then(element.click);
    };

    this.scrollThenType = function (element, value) {
        this.wait(element);
        element.getLocation().then(scrollFn).then(function () {
            element.clear();
            element.sendKeys(value);
        });
    };

    this.findVisible = function (elementSelector) {
        return element.all(elementSelector).filter(function (webElement) {
            return webElement.isDisplayed();
        });
    };
};

module.exports = new helpers();

