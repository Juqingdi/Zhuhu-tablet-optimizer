chrome.storage.local.get(['enablePc', 'optimize'], function(data){
	if(data.enablePc && data.optimize){
		$main = $("main.App-main > div", $root);
		$mainColumn = $('#SearchMain', $main);
		$sideBar = $('.SearchSideBar', $main);

		insertCss();
		createSideMenu();

		//修改 应用内打开 链接
		var params = window.location.search.slice(1).split('&');
		for (let i = 0; i < params.length; i++) {
			if( params[i].slice(0, 2) === 'q='){
				$(".tb-app", $leftSide).attr('href', 'zhihu://search?' + params[i]);
				break;
			}
		}

		moveRightSide();

		document.body.style.display = '';
	}
});