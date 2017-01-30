(function ($, api) {
	api.bind('ready', function () {
		console.log(open_hours_control);
		$('#open_hours_overview-dummy').on('keyup', function(e) {
			e.preventDefault();
			var currentValue = $(this).val();
			var hours = fourSq.util.HoursParser.parse(currentValue);
			var jsonHours = JSON.stringify(hours);

			// Handle Preview
			$.get({
				url: open_hours_control.wp_rest.root + 'open_hours/v1/get_schedule_content',
				beforeSend: function (xhr) {
					xhr.setRequestHeader('X-WP-Nonce', open_hours_control.wp_rest.nonce);
				},
				data: {
					'open_nonce': open_hours_control.wp_rest.open_nonce,
					overview_option: jsonHours
				},
				success: function (e) {
					console.log(e);
					$('.preview_open_widget').html(e);
				}
			});

			// Handle parser
			var textarea = $("[data-customize-setting-link=open_hours_overview_setting]");
			textarea.val(jsonHours);
			textarea.trigger('change');

			return true;
		});

		$( '[id*="open_hours_overview_section"] > *:first-child' ).on( 'click', function() {
			$( '.wp-full-overlay' ).toggleClass( 'is--open-hours-section-expanded' );
		} );
	});
})(jQuery, wp.customize);