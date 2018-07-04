chrome.storage.local.get(['enablePc', 'optimize'], function(data){
	if(data.enablePc && data.optimize){
		$main = $("main.App-main .ContentLayout", $root);
		$mainColumn = $('.ContentLayout-mainColumn', $main);
		$sideBar = $('.ContentLayout-sideColumn', $main);

		insertCss();
		createSideMenu();
		$(".tb-app", $leftSide).attr('href', 'zhihu://');
		moveRightSide();

		document.body.style.display = '';
	}
});