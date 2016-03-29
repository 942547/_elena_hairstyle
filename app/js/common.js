$(function() {

	//SVG Fallback
	if(!Modernizr.svg) {
		$("img[src*='svg']").attr("src", function() {
			return $(this).attr("src").replace(".svg", ".png");
		});
	};

	//E-mail Ajax Send
	//Documentation & Example: https://github.com/agragregra/uniMail
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

	//Chrome Smooth Scroll
	try {
		$.browserSelector();
		if($("html").hasClass("chrome")) {
			$.smoothScroll();
		}
	} catch(err) {

	};

	$("img, a").on("dragstart", function(event) { event.preventDefault(); });

	// Динамическая подгрузка контента про скролле
	var content = $("#content"),
		loading = "<img src='img/loading.gif' alt='Loading' />";

	// Подгрузка первых записей
	$.ajax({
		url: "libs/jquery.jscroll/jscroll.php",
		dataType: "json",
		type: "GET",
		data: {type: "start"},
		success: function(data){

			if(data){

				content.append(data);
				content.find(".jscroll-loading:first").slideUp(700, function(){

					$(this).remove();
				});

				// Вызываем плагин
				$("#content").jscroll({
					autoTriggerUntil: 2,
					loadingHtml: loading
				});
			};
		},
		beforeSend: function(){

			content.append("<div class='jscroll-loading'>" + loading + "</div>");
		}
	});

});
