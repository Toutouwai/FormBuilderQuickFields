(function($) {

	$(function(){

		var js_config = ProcessWire.config.FormBuilderQuickFields;

		// Reload confirmation dialog
		function reloadConfirmDialog() {
			// Slight delay to avoid jQueryUI dialog init error (??)
			setTimeout(function() {
				ProcessWire.confirm(js_config.reload_confirm,
					function() {
						// On confirm
						location.reload();
					}
				);
			}, 100);
		}

		var $module_inputfield = $('#Inputfield_quick_field_settings');

		var modal_save_clicked = false;

		// Detect inputfield open/close and set hidden field value
		$visibility_input = $('#fbqf_open');
		$module_inputfield.on('closed', function() {
			$visibility_input.val('');
		});
		$module_inputfield.on('opened', function() {
			$visibility_input.val(1);
			// Show reload dialog if module field is modal save button has been clicked
			if(modal_save_clicked) reloadConfirmDialog();
		});

		// Show reload dialog if module field is open and modal save button is clicked
		$(document).on('click', '.ui-dialog-buttonset button', function() {
			modal_save_clicked = true;
			if($visibility_input.val()) {
				reloadConfirmDialog();
			}
		});

		// Inputs selector
		var $inputs_selectors = $('.fbqf-inputs-selector input');
		$inputs_selectors.change(function() {
			var type = $(this).attr('id').replace('fbqf_display_', '');
			$module_inputfield.toggleClass('display-' + type);
			if($inputs_selectors.filter(':checked').length === 1) {
				$module_inputfield.addClass('single-input')
			} else {
				$module_inputfield.removeClass('single-input');
			}
		});

		// Label selector
		var $label_selectors = $('.fbqf-label-selector input');
		$label_selectors.change(function() {
			var type = $(this).attr('id').replace('fbqf_display_', '');
			console.log("type: " + type);
			$module_inputfield.removeClass('display-label display-name display-both');
			$module_inputfield.addClass('display-' + type);
		});

		// Adjust preview field widths on input change
		$('input[id^=fbqf_width_]').change(function(event) {
			var width = $(this).val();
			$(this).closest('.fbqf-item').css('width', width + '%');
		});

	});

}(jQuery));
