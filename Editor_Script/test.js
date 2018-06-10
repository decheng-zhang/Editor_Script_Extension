var doc = UltraEdit.activeDocument;
var orLineN = doc.currentLineNum;
doc.key("LEFT ARROW");
if(doc.currentChar=="	"||doc.currentChar==" "){
doc.key("RIGHT ARROW");
doc.write('	');
}else {
	
doc.key("RIGHT ARROW");
var orLineC = doc.currentColumnNum+1;
doc.findReplace.searchDown = true;
doc.findReplace.find("...");		
var fiLineN = doc.currentLineNum - orLineN;

if(doc.isFound() && fiLineN<6){

	doc.deleteText();
	}
	else{
		doc.gotoLine(orLineN,orLineC);
		doc.write('	');
 }
}



