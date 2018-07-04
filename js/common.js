$.fn.onSwipeRight = function( callback){
	$(this).on("touchstart", function(e) {
		startX = e.originalEvent.changedTouches[0].pageX,
		startY = e.originalEvent.changedTouches[0].pageY;
	});
	$(this).on("touchend", function(e) {
		moveEndX = e.originalEvent.changedTouches[0].pageX,
		moveEndY = e.originalEvent.changedTouches[0].pageY,
		X = moveEndX - startX,
		Y = moveEndY - startY;

		if ( Math.abs(X) > Math.abs(Y) && X > 0 )
			callback();
	});
}

const $root = $("#root");
let $main, $mainColumn, $sideBar, $mask, $leftSide;
let sideMenuDisplayed = false;

function insertCss(){
	const myCss = chrome.runtime.getURL('zhihutablet.css');
	$("head").append(`<link type="text/css" rel="stylesheet" href="${myCss}">`);
}

function toggleSideMenu(){
	$mask.toggleClass('tb-show');
	$leftSide.toggleClass('tb-complete');
	$main.toggleClass('tb-no-touch');
	sideMenuDisplayed = !sideMenuDisplayed;
}

function createSideMenu(){
	const $header = $('header', $root);

	const $searchBtn = $('.SearchBarExperiment-searchIcon svg', $header);
	const $searchForm = $('form.SearchBarExperiment-tool', $header);
	const $searchInput = $('input', $searchForm);

	$mask = $(`<div class="tb-mask"></div>`);
	$leftSide = $(`
		<div class="tb-left-side" style="display:none">
			<a class="tb-ls-button">
				<svg id="tb-side-menu" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#0084ff" preserveAspectRatio="xMidYMid meet">
					<rect x="2" y="4" width="16" height="2"/>
					<rect x="2" y="9" width="16" height="2"/>
					<rect x="2" y="14" width="16" height="2"/>
				</svg>
			</a>
			<a class="tb-ls-button"></a>
			<a class="tb-ls-button" href="/">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024">
					<path d="M984 490L519 9q-10-9-23-9t-23 9L9 489q-9 9-9 22.5T9 534q9 10 22.5 10T54 534l58-58v484q0 27 19 45.5t45 18.5h639q27 0 45.5-18.5T879 960V476l60 60q10 9 23 9t22-9q10-10 10-23t-10-23zM433 960V704h127v256H433zm382 0H624V704q0-26-18.5-45T560 640H433q-26 0-45 19t-19 45v256H176V412L496 77l319 335v548z" p-id="1047" fill="#0084ff"/>
				</svg>
				<span>首页</span>
			</a>
			<a class="tb-ls-button" href="//www.zhihu.com/explore">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1317.1580810546875 1317.1580810546875">
					<path fill="#0084ff" d="M234.315 1082.843c234.314 234.315 614.214 234.315 848.528 0 234.315-234.314 234.315-614.214 0-848.528C848.529 0 468.629 0 234.315 234.315 0 468.629 0 848.529 234.315 1082.843zm94.931-65.618l-29.261-29.261 261.124-426.855 426.854-261.125 29.26 29.26-261.124 426.855-426.854 261.125z"/>
				</svg>
				<span>发现</span>
			</a>
			<a class="tb-ls-button" href="//www.zhihu.com/topic">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" version="1.1" fill="#0084ff">
					<path d="M402.285714 694.857143l36.571429 0 0-109.714286 146.285714 0 0 109.714286 36.571429 0 0-109.714286 109.714286 0 0-36.571429-109.714286 0 0-146.285714 109.714286 0 0-36.571429-109.714286 0 0-109.714286-36.571429 0 0 109.714286-146.285714 0 0-109.714286-36.571429 0 0 109.714286-109.714286 0 0 36.571429 109.714286 0 0 146.285714-109.714286 0 0 36.571429 109.714286 0L402.285714 694.857143zM438.857143 402.285714l146.285714 0 0 146.285714-146.285714 0L438.857143 402.285714z" p-id="1613"/><path d="M969.142857 109.714286 54.857143 109.714286c-20.214857 0-36.571429 16.374857-36.571429 36.571429l0 658.285714c0 20.214857 16.356571 36.571429 36.571429 36.571429l329.142857 0 128 182.857143 128-182.857143 329.142857 0c20.214857 0 36.571429-16.356571 36.571429-36.571429L1005.714286 146.285714C1005.714286 126.089143 989.357714 109.714286 969.142857 109.714286zM932.571429 768 601.929143 768 512 896.464457 422.072686 768 91.428571 768 91.428571 182.857143l841.142857 0L932.571429 768z"/>
				</svg>
				<span>话题</span>
			</a>
			<a class="tb-ls-button" href="//www.zhihu.com/collections/mine">
				<svg viewBox="0 0 24 24" fill="#0084ff">
					<path d="M5.515 19.64l.918-5.355-3.89-3.792c-.926-.902-.639-1.784.64-1.97L8.56 7.74l2.404-4.871c.572-1.16 1.5-1.16 2.072 0L15.44 7.74l5.377.782c1.28.186 1.566 1.068.64 1.97l-3.89 3.793.918 5.354c.219 1.274-.532 1.82-1.676 1.218L12 18.33l-4.808 2.528c-1.145.602-1.896.056-1.677-1.218z" fill-rule="evenodd"></path>
				</svg>
				<span>我的收藏</span>
			</a>
			<a class="tb-ls-button">
				<svg viewBox="0 0 900 900" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg">
					<g>
						<title></title>
						<g id="svg_14">
							<rect stroke="#0084ff" id="svg_16" height="482.00007" width="158.64904" y="208.99997" x="46.66663" fill-opacity="0" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="60" fill="#000000"/>
							<rect stroke="#0084ff" id="svg_17" height="482.00007" width="426.73492" y="208.99997" x="207.72467" fill-opacity="0" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="60" fill="#000000"/>
							<rect stroke="#0084ff" id="svg_18" height="482.00007" width="250.70086" y="208.99997" x="602.6325" stroke-linecap="null" stroke-linejoin="null" stroke-dasharray="null" stroke-width="60" fill="#0084ff"/>
						</g>
					</g>
				</svg>
				<span>其它</span>
			</a>
			<a class="tb-ls-button tb-app">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1024 1024" version="1.1" fill="#0084ff">
					<path d="M512 426.666667l-170.666667 170.666666h128v256h85.333334v-256h128m128-426.666666H213.333333a85.333333 85.333333 0 0 0-85.333333 85.333333v512a85.333333 85.333333 0 0 0 85.333333 85.333333h170.666667v-85.333333H213.333333V341.333333h597.333334v426.666667h-170.666667v85.333333h170.666667a85.333333 85.333333 0 0 0 85.333333-85.333333V256a85.333333 85.333333 0 0 0-85.333333-85.333333z" fill=""/>
				</svg>
				<span>应用内打开</span>
			</a>
			<div class="tb-bottom-side">
				<div class="tb-bottom-btn"></div>
				<div class="tb-bottom-btn"></div>
				<div class="tb-bottom-btn"></div>
			</div>
		</div>
		`);
	const $sideMenuBtn = $("#tb-side-menu", $leftSide);
	const $lsButton = $(".tb-ls-button", $leftSide);

	$mask.click( toggleSideMenu);
	$sideMenuBtn.click( toggleSideMenu);

	$searchBtn.appendTo( $lsButton.eq(1)).click( function(){
		if(!sideMenuDisplayed)
			$searchInput.attr('value', '');
		toggleSideMenu();
	});
	$searchForm.appendTo( $lsButton.eq(1));

	$(".AppHeader-profile button.AppHeader-profileEntry", $header).appendTo( $(".tb-bottom-side .tb-bottom-btn", $leftSide).eq(0)).click(function(){
		$("body").removeClass('center-popover');
	});
	$(".AppHeader-messages button.Messages-icon", $header).prependTo( $(".tb-bottom-side .tb-bottom-btn", $leftSide).eq(1)).click(function(){
		$("body").addClass('center-popover');
	});
	$(".AppHeader-notifications button.PushNotifications-icon", $header).prependTo( $(".tb-bottom-side .tb-bottom-btn", $leftSide).eq(2)).click(function(){
		$("body").addClass('center-popover');
	});

	$header.remove();
	$main.append( $mask).append( $leftSide);
}

function moveRightSide(){
	const $rightSide = $(`
		<div class="tb-right-side">
			<div class="tb-tip">
				<p>右滑关闭</p>
			</div>
		</div>
		`);
	$sideBar.appendTo( $rightSide);
	$(".tb-ls-button", $leftSide).eq(6).click(function(){
		if(sideMenuDisplayed)
			toggleSideMenu();
		$rightSide.toggleClass('tb-show');
	});
	$rightSide.onSwipeRight( function(){
		$rightSide.toggleClass('tb-show');
	});
	$main.append( $rightSide);
}