/**
 * Does not provide the full abstraction layer, only minimizes the difference between bs3 and bs4 API.
 */

import { each } from './lib/underscore-esm.js';
import { propGet } from './prop.js';
import { AppConf } from './conf.js';
import { elements } from './elements.js';
import { Trans } from './translate.js';
import { TransformTags } from './transformtags.js';

var blockTags = {
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

var cardTagDef = {
    classes: ['panel'],
    getCardType: function() {
        if (this.hasAttribute('type')) {
            return this.getAttribute('type');
        } else {
            return this.tagName.split(/-/)[1].toLowerCase();
        }
    },
    connected: function() {
        this.classList.add('panel-' + this.getCardType());
    },
    attributeChanged: {
        type: function(oldValue, newValue) {
            this.classList.remove('panel-' + oldValue);
            this.classList.add('panel-' + newValue);
        }
    }
};

elements.newBlockElements(
    $.extend({name: 'card-type'}, cardTagDef),
    $.extend({name: 'card-default'}, cardTagDef),
    $.extend({name: 'card-primary'}, cardTagDef),
    $.extend({name: 'card-success'}, cardTagDef),
    $.extend({name: 'card-info'}, cardTagDef),
    $.extend({name: 'card-warning'}, cardTagDef),
    $.extend({name: 'card-danger'}, cardTagDef),
    $.extend({name: 'card-secondary'}, cardTagDef),
    $.extend({name: 'card-light'}, cardTagDef),
    $.extend({name: 'card-dark'}, cardTagDef),
    {
        name: 'card-group',
        classes: ['panel-group']
    },
    {
        name: 'card-header',
        classes: ['panel-heading']
    },
    {
        name: 'card-body',
        classes: ['panel-body']
    },
    {
        name: 'card-footer',
        classes: ['panel-footer']
    },
    {
        name: 'card-title',
        classes: ['panel-title']
    },
    {
        name: 'navbar-default',
        classes: ['nav', 'navbar', 'navbar-default']
    },
    /*
    // Inherited custom elements are not supported yet.
    {
        ancestor: HTMLFormElement,
        name: 'form-inline',
        extendsTagName: 'form',
        classes: ['navbar-form', 'navbar-left']
    }
    */
);

void function(TransformTags) {

    TransformTags._init = TransformTags.init;

    TransformTags.init = function() {
        this._init();
        if (AppConf('compatTransformTags')) {
            this.add({
                'CARD-TYPE': TransformTags.bsPanel,
                'CARD-DEFAULT': TransformTags.bsPanel,
                'CARD-PRIMARY': TransformTags.bsPanel,
                'CARD-SUCCESS': TransformTags.bsPanel,
                'CARD-INFO': TransformTags.bsPanel,
                'CARD-WARNING': TransformTags.bsPanel,
                'CARD-DANGER': TransformTags.bsPanel,
                'CARD-SECONDARY': TransformTags.bsPanel,
                'CARD-LIGHT': TransformTags.bsPanel,
                'CARD-DARK': TransformTags.bsPanel,
                'CARD-GROUP': TransformTags.bsPanelGroup,
                'CARD-HEADER': TransformTags.bsPanelHeading,
                'CARD-BODY': TransformTags.bsPanelBody,
                'CARD-FOOTER': TransformTags.bsPanelFooter,
                'CARD-TITLE': TransformTags.bsPanelTitle,
                'NAVBAR-DEFAULT': TransformTags.navbarDefault,
            });
        }
        // Inherited custom elements v1 do not work yet.
        this.add({'FORM-INLINE': TransformTags.formInline});
    };

    TransformTags.bsPanel = function(elem, tagName) {
        if (elem.hasAttribute('type')) {
            var typ = elem.getAttribute('type');
            elem.removeAttribute('type');
        } else {
            var typ = tagName.split(/-/)[1].toLowerCase();
        }
        return this.toTag(elem, 'div', 'panel panel-' + typ);
    };

    TransformTags.bsPanelGroup = function(elem, tagName) {
        return this.toTag(elem, 'div', 'panel-group');
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

}(TransformTags.prototype);

var transformTags = new TransformTags();

function disposePopover($elem) {
    if (typeof $elem.popover === 'function') {
        return $elem.popover('destroy');
    }
};

function highlightNav(anchor, highlight) {
    var $li = $(anchor).parent('li');
    if (highlight) {
        $li.addClass('active');
    } else {
        $li.removeClass('active');
    }
};

function getCardTitle($elements) {
    return $elements.find('.panel-title:first');
};

function UiDatetimeWidget() {

} void function(UiDatetimeWidget) {

    UiDatetimeWidget.wrap = function() {
        this.$dateControls.wrap('<div class="input-group date datetimepicker"></div>');
        this.$dateControls.after(
            '<div class="input-group-append input-group-addon pointer"><div class="input-group-text glyphicon glyphicon-calendar"></div></div>'
        );
    };

    UiDatetimeWidget.init = function() {
        if (!this.has()) {
            return;
        }
        this.wrap();
        var formatFix = propGet(this.formatFixes, AppConf('languageCode'));
        // Date field widget.
        var options = {
            pickTime: false,
            language: AppConf('languageCode'),
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
            language: AppConf('languageCode'),
            icons: {
                date: 'calendar'
            }
        };
        if (formatFix !== undefined) {
            options.format = formatFix.datetime;
        }
        this.$dateControls.filter('.datetime-control').datetimepicker(options);
        // Picker window button help.
        this.$selector.find('.picker-switch').prop('title', Trans('Choose year / decade.'));
        // Icon clicking.
        this.$dateControls.next('.input-group-append').on('click', UiDatetimeWidget.open);
        return this;
    };

    // Does not restore DOM into original state, just prevents memory leaks.
    UiDatetimeWidget.destroy = function() {
        if (!this.has()) {
            return;
        }
        this.$dateControls.next('.input-group-append').off('click', UiDatetimeWidget.open);
        // https://github.com/Eonasdan/bootstrap-datetimepicker/issues/573
        each(this.$selector.find('.datetime-control, .date-control'), function(v) {
            var dtp = $(v).data("DateTimePicker");
            // If $.datetimepicker() was added dynamically as empty_form of inline formset,
            // there is no related instance stored in html5 data.
            if (dtp !== undefined) {
                dtp.widget.remove();
            } else {
                /*
                $(v).datetimepicker({language: AppConf('languageCode')});
                var dtp = $(v).data("DateTimePicker");
                dtp.widget.remove();
                */
            }
        });
    };

}(UiDatetimeWidget.prototype);

var ui = {
    defaultDialogSize: BootstrapDialog.SIZE_NORMAL,
    dialogBlockTags: blockTags.badges,
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
    labelClass: 'label',
    version: 3,
};

export { blockTags, transformTags, disposePopover, highlightNav, getCardTitle, UiDatetimeWidget, ui };
