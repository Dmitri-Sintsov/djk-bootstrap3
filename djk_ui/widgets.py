from django.forms.widgets import ChoiceWidget


class UiBaseGridWidget(ChoiceWidget):

    js_classpath = 'FkGridWidget'
    component_template_str = '<span{component_attrs}></span>'
