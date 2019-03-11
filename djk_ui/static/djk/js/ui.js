App.blockTags = {
    list: [
        {
            enclosureTag: '<ul>',
            enclosureClasses: 'list-group',
            itemTag: '<li>',
            itemClasses: 'condensed list-group-item preformatted',
            localKeyTag: '<div>',
            localKeyClasses: 'label label-info label-gray preformatted br-after',
        },
        {
            enclosureTag: '<ul>',
            enclosureClasses: 'list-group',
            itemTag: '<li>',
            itemClasses: 'condensed list-group-item list-group-item-warning preformatted',
            localKeyTag: '<div>',
            localKeyClasses: 'label label-info label-gray preformatted br-after',
        },
    ],
    badges: [
        {
            enclosureTag: '<div>',
            enclosureClasses: 'well well-condensed well-sm',
            itemTag: '<span>',
            itemClasses: 'badge preformatted',
            localKeyTag: '<div>',
            localKeyClasses: 'label label-info label-white preformatted',
        }
    ]
};

void function(TransformTags) {

    TransformTags._init = TransformTags.init;

    TransformTags.init = function() {
        this._init();
        this.add({
            'CARD': TransformTags.bsPanel,
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
        if (elem.hasAttribute('type')) {
            var typ = elem.getAttribute('type');
            elem.removeAttribute('type');
        } else {
            var typ = tagName.split(/-/)[1].toLowerCase();
        }
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

/**
 * Does not provide the full abstraction layer, only minimizes the difference between bs3 and bs4 API.
 */
App.ui = {
    defaultDialogSize: BootstrapDialog.SIZE_NORMAL,
    dialogBlockTags: App.blockTags.badges,
    disposePopover: function($elem) {
        if (typeof $elem.popover === 'function') {
            return $elem.popover('destroy');
        }
    },
    getCardTitle: function($elements) {
        return $elements.find('.panel-title:first');
    },
    // Currently available highlight directions:
    //   0 - do not highlight,
    //   1 - highlight columns,
    //   2 - highlight rows,
    highlightModeRules: [
        {
            'none': {
                direction: null,
                header: '',
                cycler: [],
            }
        },
        {
            'cycleColumns': {
                direction: 0,
                header: 'info',
                cycler: ['warning', ''],
            },
        },
        {
            'cycleRows': {
                direction: 1,
                header: 'info',
                cycler: ['warning', ''],
            },
        },
        {
            'linearRows': {
                direction: 1,
                header: '',
                cycler: ['linear-white'],
            }
        },
    ],
    highlightNav: function(anchor, highlight) {
        var $li = $(anchor).parent('li');
        if (highlight) {
            $li.addClass('active');
        } else {
            $li.removeClass('active');
        }
    },
    labelClass: 'label',
    version: 3,
};


App.ui.DatetimeWidget = function() {};

void function(DatetimeWidget) {

    DatetimeWidget.wrap = function() {
        this.$dateControls.wrap('<div class="input-group date datetimepicker"></div>');
        this.$dateControls.after(
            '<div class="input-group-append input-group-addon pointer"><div class="input-group-text glyphicon glyphicon-calendar"></div></div>'
        );
    };

    DatetimeWidget.init = function() {
        if (!this.has()) {
            return;
        }
        this.wrap();
        var formatFix = App.propGet(this.formatFixes, App.conf.languageCode);
        // Date field widget.
        var options = {
            pickTime: false,
            language: App.conf.languageCode,
            icons: {
                date: 'calendar'
            }
        };
        if (formatFix !== undefined) {
            options.format = formatFix.date;
        }
        this.$dateControls.filter('.date-control').datetimepicker(options);
        // Datetime field widget.
        options = {
            language: App.conf.languageCode,
            icons: {
                date: 'calendar'
            }
        };
        if (formatFix !== undefined) {
            options.format = formatFix.datetime;
        }
        this.$dateControls.filter('.datetime-control').datetimepicker(options);
        // Picker window button help.
        this.$selector.find('.picker-switch').prop('title', App.trans('Choose year / decade.'));
        // Icon clicking.
        this.$dateControls.next('.input-group-append').on('click', DatetimeWidget.open);
        return this;
    };

    // Does not restore DOM into original state, just prevents memory leaks.
    DatetimeWidget.destroy = function() {
        if (!this.has()) {
            return;
        }
        this.$dateControls.next('.input-group-append').off('click', DatetimeWidget.open);
        // https://github.com/Eonasdan/bootstrap-datetimepicker/issues/573
        _.each(this.$selector.find('.datetime-control, .date-control'), function(v) {
            var dtp = $(v).data("DateTimePicker");
            // If $.datetimepicker() was added dynamically as empty_form of inline formset,
            // there is no related instance stored in html5 data.
            if (dtp !== undefined) {
                dtp.widget.remove();
            } else {
                /*
                $(v).datetimepicker({language: App.conf.languageCode});
                var dtp = $(v).data("DateTimePicker");
                dtp.widget.remove();
                */
            }
        });
    };

}(App.ui.DatetimeWidget.prototype);
