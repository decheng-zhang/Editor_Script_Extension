var n =0;
var doc = UltraEdit.activeDocument;
var originurp = doc.currentLineNum;
//curp <=10 && (n=curp-1) || (n= 10);


//UltraEdit.messageBox(curp);
do{
	tcurp = doc.currentLineNum;
	tcurp <=10 && (n=tcurp-1) || (n= 10);
	//var tmpp=doc.currentLineNum;
	doc.gotoLineSelect(tcurp-n);
	//UltraEdit.messageBox(tcurp-n);
	doc.findReplace.mode=1;
	doc.findReplace.matchWord = true;
	doc.findReplace.find("<page");
	}while(doc.isNotFound() && (tcurp-n >0))
	var finp = doc.currentLineNum;
	//UltraEdit.messageBox(finp);
	doc.findReplace.mode = 0;
	doc.findReplace.searchDown = true;
	doc.findReplace.find("</page");
	doc.key("RIGHT ARROW");
	doc.gotoLineSelect(finp-1);
	
	