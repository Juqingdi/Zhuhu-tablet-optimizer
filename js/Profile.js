chrome.storage.local.get(['enablePc', 'optimize'], function(data){
	if(data.enablePc && data.optimize){
		$main = $("main.App-main > div", $root);
		$mainColumn = $('#People-mainColumn', $main);
		$sideBar = $('.Profile-sideColumn', $main);

		insertCss();
		createSideMenu();

		//修改 应用内打开 链接
		var params = window.location.pathname.split('/');
		if( params[1] && params[1] === 'people' && params[2])
			$(".tb-app", $leftSide).attr('href', 'zhihu://people/' + params[2]);
		else
			$(".tb-app", $leftSide).attr('href', 'zhihu://');

		moveRightSide();

		document.body.style.display = '';
	}
});