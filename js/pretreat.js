chrome.runtime.sendMessage({zhihutabletInjected: true}, function(n){
	chrome.storage.local.get(['enablePc', 'optimize'], function(data){
		if(data.enablePc){
			var t=document.createElement("script");
			t.type="text/javascript";
			t.text="navigator.__defineGetter__('userAgent', function () { return 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.181 YaBrowser/18.4.1.488.00 Safari/537.36'; });";
			document.getElementsByTagName("head")[0].appendChild(t);

			if(data.optimize)
				document.body.style.display = 'none';
		}
	});
});