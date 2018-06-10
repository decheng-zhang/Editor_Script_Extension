var str = "Ccctt";
var tmp = str.slice(1);
var comment_list = {
		'cc': 'comment','tt': 'title'
}
var strP = "";
var n = 0;
while(tmp2 != ""){
	var tmp2 = tmp.slice(n,n+2);
	strP =strP + ' - ' +( comment_list[tmp2]|| "×Ö¶Î" );
	//UltraEdit.messageBox(strP);
	n +=2;
}

UltraEdit.messageBox(strP);