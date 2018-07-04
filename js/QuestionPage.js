chrome.storage.local.get(['enablePc', 'optimize'], function(data){
	if(data.enablePc && data.optimize){
		$main = $("main.App-main .QuestionPage", $root);
		$mainColumn = $('.Question-mainColumn', $main);
		$sideBar = $('.Question-sideColumn', $main);

		insertCss();
		createSideMenu();

		var params = window.location.pathname.split('/');
		if( params[3] && params[3] === 'answer' && params[4])
			$(".tb-app", $leftSide).attr('href', 'zhihu://answer/' + params[4]);
		else if( params[1] && params[1] === 'question' && params[2])
			$(".tb-app", $leftSide).attr('href', 'zhihu://questions/' + params[2]);
		else
			$(".tb-app", $leftSide).attr('href', 'zhihu://');

		//删除 查看全部回答 按钮的事件
		var $questionMainAction = $(".QuestionMainAction", $main);
		if( $questionMainAction.length > 0){
			var allAnswerLink = $questionMainAction.attr('href');
			var allAnswerText = $questionMainAction.eq(0).text();
			$(`<a class="QuestionMainAction" href="${allAnswerLink}">${allAnswerText}</a>`).replaceAll( $questionMainAction);
		}

		moveRightSide();

		document.body.style.display = '';
	}
});