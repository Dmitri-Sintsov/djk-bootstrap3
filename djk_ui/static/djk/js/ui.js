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
            'CARD-FOOTER': TransformTags.bsPanelFooter,
            'CARD-TITLE': TransformTags.bsPanelTitle,
            'FORM-INLINE': TransformTags.formInline,
            'NAVBAR-DEFAULT': TransformTags.navbarDefault,
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

    TransformTags.bsPanelFooter = function(elem, tagName) {
        return this.toTag(elem, 'div', 'panel-footer');
    };

    TransformTags.bsPanelTitle = function(elem, tagName) {
        return this.toTag(elem, 'div', 'panel-title');
    };

    TransformTags.formInline = function(elem, tagName) {
        return this.toTag(elem, 'form', 'navbar-form navbar-left');
    };

    TransformTags.navbarDefault = function(elem, tagName) {
        return this.toTag(elem, 'nav', 'nav navbar navbar-default');
    };

}(App.TransformTags.prototype);

App.transformTags = new App.TransformTags();

App.ui = {
    getCardTitle: function($elements) {
        return $elements.find('.panel-title:first');
    },
    highlightNav: function(anchor, highlight) {
        var $li = $(anchor).parent('li');
        if (highlight) {
            $li.addClass('active');
        } else {
            $li.removeClass('active');
        }
    },
};

