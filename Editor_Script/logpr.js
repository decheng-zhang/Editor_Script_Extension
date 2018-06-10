var doc = UltraEdit.activeDocument;
doc.top();

UltraEdit.perlReOn;
doc.findReplace.regExp = true;
doc.findReplace.replaceAll = true;
doc.findReplace.replace("^(.*?\\w+?);?$","\\1;");
doc.findReplace.replace("^(\\s+\\d+ =)(http:\/\/.*?);(Href=http.*?;)?(Type=\\d+?;)?(UserIp=.*?;)?(UserName=.*?;)?(UserSN=[^;]+?)?;?$","\\2\\t\\3\\t\\4\\t\\5\\t\\6\\t\\7");
doc.findReplace.replace("^http(.*?)/?\t","http\\1\/\\t");
doc.findReplace.replace("^(http:\/\/)(.*?)\/(.*?)\/?\\t","\\2\\t\\1\\2\/\\3");
doc.findReplace.replace("Href=|Type=|UserIp=|UserName=|UserSN=|;","");
doc.findReplace.regExp = false;
//doc.findReplace.matchWord = true;
doc.findReplace.replaceAll = true;
doc.findReplace.replace("%A3%BD","=");
doc.findReplace.replace("%A1%F9","&");
doc.top();
doc.insertLine();
doc.top();
doc.moveLineDown();
doc.top();
doc.write("Domain	Url	Href	UserIp	UserName	UserSN\n")

doc.selectAll();
doc.copy();
