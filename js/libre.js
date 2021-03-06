var LibreIcons = {
    /**
     * Base url for the CDN.
     */
    urlBase: 'https://cdn.jsdelivr.net/gh/DiemenDesign/LibreICONS@master/',
    /**
     * SVG Icon for an unknown icon.
     */
    unknownIcon: '<svg class="libre-unknown-icon" aria-labelledby="gui-exclamation" role="img" focusable="false" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 14 14"><path d="m 7.0157956,12 c -0.56859,0 -1.02951,-0.46096 -1.02951,-1.02955 0,-0.56851 0.46092,-1.02942 1.02951,-1.02942 0.56851,0 1.02942,0.46091 1.02942,1.02942 0,0.56859 -0.46091,1.02955 -1.02942,1.02955 z m 1.36029,-8.42977 c -0.0871,0.69397 -0.72628,4.07248 -0.93761,5.18268 -0.039,0.20528 -0.21847,0.3543 -0.42749,0.3543 l -0.008,0 c -0.21643,0 -0.40133,-0.15365 -0.44166,-0.36619 -0.21402,-1.12696 -0.85224,-4.5084 -0.93793,-5.19134 C 5.5202056,2.72725 6.1620856,2 6.9907656,2 c 0.83983,5e-5 1.49023,0.73702 1.3857,1.57023 z"/></svg>',
    /**
     * Request an icon from LibreICONS repository.
     * @param {string} url - the svg url.
     * @param {HTMLElement} iconElement - icon element to apply the svg.
     * @param {string} unknownIcon - Unknown icon svg text.
     */
    requestIcon: function(url, iconElement, unknownIcon) {
        var http = new XMLHttpRequest();
        http.onloadend = function () {
            if (http.status == 200) {
                iconElement.innerHTML = http.responseText;
            } else if (http.status == 404) {
                console.log("Error 404: " + url);
                iconElement.innerHTML = unknownIcon;
            }
        };
        http.onerror = function() {
            console.log("Error: " + url + ", status: " + http.status);
            iconElement.innerHTML = unknownIcon;
        };
        http.open('GET', url, true);
        http.send();
    },
    /**
     * Perform an update icons in the specified element.
     * @param {HTMLElement} element - The element to update. If the element is null,
     *                                update in the document.body.
     */
    updateIcons: function(element) {
        if (element === undefined || element === null) {
            element = document.body;
        }
        var items = element.querySelectorAll('i.libre');
        var _that = this;
        for (var i = 0; i < items.length; i++) {
            var iconElement = items[i];
            var icn = iconElement.getAttribute('data-icon');
            if (icn === null || icn === undefined) {
                continue;
            }
            var color = items[i].getAttribute('data-color');
            if (color === 'true') {
                color = 'svg-color/';
            } else {
                color = 'svg/';
            }
            var url = _that.urlBase + color + 'libre-' + icn + '.svg';
            this.requestIcon(url, iconElement, this.unknownIcon);
        }
    }
};

document.addEventListener('DOMContentLoaded', function(){
    var autoloadMeta = document.head.querySelector('meta[name="libre:autoload"]');
    if (autoloadMeta !== null && autoloadMeta !== undefined) {
        var value = autoloadMeta.getAttribute('value').toLowerCase();
        if (value === 'false') {
            return;
        }
    }
    LibreIcons.updateIcons();
});