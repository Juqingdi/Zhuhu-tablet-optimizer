chrome.storage.local.get(['enablePc', 'optimize'], function(data){
	if(data.enablePc && data.optimize){
		const myCss = chrome.runtime.getURL('zhihutablet.css');
		$("head").append(`<link type="text/css" rel="stylesheet" href="${myCss}">`);

		let $main = $("#root main.App-main");
		let $header = $(".ColumnPageHeader-Wrapper", $main);

		$main.addClass('zhihutablet');

		//添加应用内打开按钮
		let params = window.location.pathname.split('/');
		if(params[1] && params[1] === 'p' && params[2]){
			let applink = `zhihu://articles/${params[2]}`;

			let $appbutton = $(`
				<button id='test' type="button" class="Button FollowButton ColumnPageHeader-FollowButton Button--primary Button--blue tb-app">
					<a href="${applink}">应用内打开</a>
				</button>
				`);

			$(".ColumnPageHeader-Button", $header).prepend( $appbutton);
		}

		document.body.style.display = '';
	}
});