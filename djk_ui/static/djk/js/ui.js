void function(TransformTags) {

    TransformTags._init = TransformTags.init;

    TransformTags.init = function() {
        this._init();
        this.add({
            'CARD-DEFAULT': TransformTags.bsPanel,
            'CARD-PRIMARY': TransformTags.bsPanel,
            'CARD-SUCCESS': TransformTags.bsPanel,
            'CARD-INFO': TransformTags.bsPanel,
            'CARD-WARNING': TransformTags.bsPanel,
            'CARD-DANGER': TransformTags.bsPanel,
            'CARD-SECONDARY': TransformTags.bsPanel,
            'CARD-LIGHT': TransformTags.bsPanel,
            'CARD-DARK': TransformTags.bsPanel,
            'CARD-HEADER': TransformTags.bsPanelHeading,
            'CARD-BODY': TransformTags.bsPanelBody,
        });
    };

    TransformTags.bsPanel = function(elem, tagName) {
        var typ = tagName.split(/-/)[1].toLowerCase();
        var typ4 = {
            'light': 'info',
            'dark': 'primary',
            'secondary': 'default',
        };
        // Translate new type of cards to the existing type of panels.
        if (typeof typ4[typ] !== 'undefined') {
            typ = typ4[typ];
        }
        return this.toTag(elem, 'div', 'panel panel-' + typ);
    };

    TransformTags.bsPanelHeading = function(elem, tagName) {
        return this.toTag(elem, 'div', 'panel-heading');
    };

    TransformTags.bsPanelBody = function(elem, tagName) {
        return this.toTag(elem, 'div', 'panel-body');
    };

}(App.TransformTags.prototype);

App.transformTags = new App.TransformTags();

