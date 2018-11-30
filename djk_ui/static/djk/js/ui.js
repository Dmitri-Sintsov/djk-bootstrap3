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
        });
    };

    TransformTags.bsPanel = function(elem, tagName) {
        var typ = tagName.split(/-/)[1];
        var typ4 = {
            'LIGHT': 'INFO',
            'DARK': 'PRIMARY',
            'SECONDARY': 'DEFAULT',
        };
        // Translate new type of cards to existing type of panels.
        if (typeof typ4[typ] !== 'undefined') {
            typ = typ4[typ];
        }
        return this.tagNameToClassName(elem, 'PANEL-' + typ).addClass('panel');
    };

}(App.TransformTags.prototype);

App.transformTags = new App.TransformTags();

