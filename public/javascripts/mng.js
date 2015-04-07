

(function () {

	var crxMng = {

		submit: function () {
			var url = crxMng.url();
			debugger;
			$.ajax({
				url: url,
				dataType: "jsonp",
				success: function (data) {
					$("#errMsg").html(data.err || data.msg);
				}
			});

		},

		url: function () {
			return "http://localhost:3000/bld/?" +
				"dmn=" + encodeURIComponent(($("#domain").val() || "mash-pot.com")) +
				"&prdct=" + $("#prdct").val() +
				"&ep=" + $("#ep").val() +
				"&aa=test" +
				"&epid=" + $("#epid").val() +
				"&mmprdct=" + $("#mm").val();

			// http://localhost:3000/bld/?dmn=a&prdct=&ep=w&epid=ww&mmprdct=www
		}

	};

	$("form").submit(function () {
		crxMng.submit();
		return false;
	});

})();