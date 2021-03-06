class FormWithInlineFormsetsMixin:

    def get_ajax_refresh_selector(self):
        return '.formsets.panel:has([data-url="{}"])'.format(
            escape_css_selector(self.get_form_action_url())
        )
