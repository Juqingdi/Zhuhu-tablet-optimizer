chrome.storage.local.get(['enablePc', 'optimize'], function(data){
	if(data.enablePc && data.optimize){
		$main = $("main.App-main .Topstory-container", $root);
		$mainColumn = $('.Topstory-mainColumn', $main);
		$sideBar = $('.GlobalSideBar', $main);

		createSideMenu();
		$(".tb-app", $leftSide).attr('href', 'zhihu://');

		moveRightSide();

		insertCss();
		document.body.style.display = '';		
	}
});