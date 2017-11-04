window.onload=function(){

	toolTip($(".control"));

	// 显示结果的div
	var showResultParent = $(".flex-container");
	// 显示父元素代码的div
	var codeParent = $(".code-wrap-parent");
	// 显示子元素代码的div
	var codeChild = $(".code-wrap-child");
	
	$(".control").addEventListener("click",function(e){
		var element = e.target;
		if(element.localName == 'label'){
			var parentA = element.parentNode;
			var parentB = parentA.parentNode;

			// 清除当前属性的所有高亮显示
			for(var i=0;i<parentA.children.length;i++){
				parentA.children[i].classList.remove("active");
			}
			// 点击单独高亮显示
			element.classList.add("active");
			
			// 获得样式
			var propertyName = parentB.querySelector(".property").getAttribute("data"); // 获取属性
			var valueName = element.getAttribute("data-value"); // 获取值


			switch(parentA.getAttribute("data-bind")){
				case "parent":					
					// 点击的属性赋值给显示结果的div，同一条属性的样式只会显示一条，所以不会重复
					showResultParent.style.cssText += propertyName +":"+ valueName;
					// 点击标签显示对应代码
					codeParent.innerText = ".flex-container{\n"+ showCode(showResultParent.style.cssText.split(";")) +"\n}";
					hljs.highlightBlock(codeParent);
					break;
				// case "child":
				// 	// 属性赋值给盒子元素，这里挑了第三个盒子
				// 	var showResultChild = showResultParent.querySelector(".flex-item:nth-child(3)");
				// 	// 属性是手动输入，自定义属性data-contol="input"
				// 	if(element.getAttribute("data-contol")=="input"){
				// 		element.innerText = 0;
				// 		element.setAttribute("contenteditable",true); // 可编辑
				// 		element.onkeyup=function(){
				// 			element.setAttribute("data-value",element.textContent);
				// 			propertyName = element.getAttribute("data") || propertyName;
				// 			showResultChild.style.cssText += propertyName +":"+ element.getAttribute("data-value");
				// 			// 点击标签显示对应代码
				// 			codeChild.innerText = ".flex-item:nth-child(3){\n"+ showCode(showResultChild.style.cssText.split(";")) +"\n}";
				// 			hljs.highlightBlock(codeChild);
				// 		}
				// 	}else{
				// 		showResultChild.style.cssText += propertyName +":"+ valueName;
				// 		// 点击标签显示对应代码
				// 		codeChild.innerText = ".flex-item:nth-child(3){\n"+ showCode(showResultChild.style.cssText.split(";")) +"\n}";
				// 		hljs.highlightBlock(codeChild);
				// 	}
				// 	break;
			}
		}
	},true);
	
}

// 显示代码
function showCode(arr){
	var str = '\t';
	for(var i=0;i<arr.length;i++){
		str += arr[i].replace(/(^\s+)|(\s+$)/g, ";\n\t");
	}
	return str
}

// 获取元素
function $(element){
	return document.querySelector(element);
}

// 提示气泡
function toolTip(element){
	element.addEventListener("mousemove",function(e){
		var ele = e.target;
		if(ele.getAttribute("data-title")!=undefined&&ele.getAttribute("data-title")!=""){
			if($(".tooltip")!=undefined){
				$(".tooltip .tooltip-inner").innerHTML = ele.getAttribute("data-title");

				ele.addEventListener("mouseout",function(){
					if($(".tooltip")!=undefined){
						document.body.removeChild($(".tooltip"));
						return
					}
				},true);
			}else{					
				var tooltip = document.createElement("div");
				tooltip.className = "tooltip";
				var tooltipInner = document.createElement("div");
				tooltipInner.className = "tooltip-inner";
				tooltipInner.innerHTML = ele.getAttribute("data-title");

				tooltip.appendChild(tooltipInner);
				document.body.appendChild(tooltip);
				
				var top = ele.offsetTop - $(".control").scrollTop - tooltip.offsetHeight - 5;
				var left = ele.offsetLeft + ele.offsetWidth / 2 - tooltip.offsetWidth / 2;
				left = left <= 0 ? -5 : left;
				tooltip.style.cssText = "top:"+ top +"px;left:"+ left +"px;";
			}
		}
	},true);
}