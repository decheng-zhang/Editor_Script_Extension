
var worker = '张德诚'
//////// SETTINGS //////////////////////////////////////////////////////////////

// The string used in the snippets to represent where the cursor should be moved to.
var cursor_string = '^';

// Each property of this object should be a snippet, with the name being the trigger string
// and the value being an array of the lines that will replace the trigger string.
var snippet_list = {
// Hylanda

	'dd': [
	'<field name="date">',
	'		<searchExp><expContent><![CDATA[^(.*?)...]]></expContent></searchExp>',
	'</field>...'
	],
	'cc': [
	'<field name="content">',
	'	<searchExp><expContent><![CDATA[^(.*?)...]]></expContent></searchExp>',
	'</field>...'
	],		
	'tt': [
	'<field name="title">',
	'	<searchExp><expContent><![CDATA[^(.*?)...]]></expContent></searchExp>',
	'</field>...'
	],
	'aa': [
	'<field name="author">',
	'	<searchExp><expContent><![CDATA[^(.*?)...]]></expContent></searchExp>',
	'</field>...'
	],
	'cf': [
	'<field name="contentFrom">',
	'	<searchExp><expContent><![CDATA[^(.*?)...]]></expContent></searchExp>',
	'</field>...'
	],
	'rp':[
	'<replaceExp><![CDATA[(^)]]></replaceExp>',
	'<replaceFmt><![CDATA[(?1)]]></replaceFmt>'
	]
	
};
var comment_list = {
		'cc': 'comment',
		'tt': 'title',
		'aa': 'author',
		'cf':	'contentFrom',
		'dd':	'date'
	};

var snippet_function = function (trigger_string)
{
	var today = new Date();
	var mon = today.getMonth()+1;
	var date = today.getDate()
	var year = today.getFullYear();
	var noon = (today.getHours()>12 && "下午") || "上午";
	var dateDetail = year +'年' + mon + '月' + date + '日' + noon;
	if (trigger_string.charCodeAt(trigger_string.length-1)>127 || trigger_string.charCodeAt(trigger_string-1)==94)
	{
		return [
		"<!-- " + dateDetail +"	" + worker +	"新增 site-->",
		'<site name="' + trigger_string + '" key="^" siteGroup="True">',
		'	<page url="(...)">',
		'		<rule name="default" mark="">',
		'		...',
		'		</rule>',
		'	</page>',
		'</site>'
		];
	}else if(trigger_string.search(/^C([a-z]+)$/i) > -1)
	{
		var tmp = trigger_string.slice(1);

		var strP = "";
		var n = 0;
		while(tmp2 != ""){
		var tmp2 = tmp.slice(n,n+2);
		strP =strP + '-' +( comment_list[tmp2]|| "字段" );
		//UltraEdit.messageBox(strP);
		n +=2;
		}
		return ['<!-- ' + dateDetail + ' ' + worker + ' 修改' + strP + '-->'];
	}else if(trigger_string.search(/^pg$/i) > -1)
		{
			return [
			"<!--" + dateDetail +"	"+ worker +" 新增page -->",
			'<page url="(^)"'+'>',
			'	<rule name="default" mark="">',
			'		...',
			'	</rule>',
			'</page>'];
			}else if(trigger_string.search(/^rl\d$/i) > -1)
				{
					return [
					"<!--" + dateDetail +"	"+ worker +" 新增rule -->",
					'<rule name="' + trigger_string.slice(-1) + '" mark="^">',
					'		...',
					'</rule>'];
					}
};									

var current_column_offset = (typeof UltraEdit.activeDocumentIdx == 'undefined' ? 1 : 0);

var doc             = UltraEdit.activeDocument,  // For easier reference.
    original_line   = doc.currentLineNum,
    original_column = doc.currentColumnNum + current_column_offset;


if (! doc.isSel())
{
	doc.selectWord();
	

	if (! doc.isSel())
	{
		doc.startSelect();
		doc.key('CTRL+LEFT ARROW');
		doc.endSelect();
	}

	
}
	
	//st = st.charCodeAt(0);

// Try to get a snippet from the list that matches the selected text.
var snippet = snippet_list[doc.selection];

// If no snippet was found in the list and the optional snippet function is defined, call it.
if (! snippet && snippet_function)
{
	snippet = snippet_function(doc.selection);
}

// If there is no snippet, just move the cursor back to where it was.
if (! snippet)
{
	doc.gotoLine(original_line, original_column);
}
else
{
	var snippet_string;
	
	// If the snippet is only a single line, just use that string as is.
	if (snippet.length == 1)
	{
		snippet_string = snippet[0];
	}
	// Otherwise, join the snippet's lines into a single string, adding the current line's
	// leading whitespace to all of the following lines in the process.
	else
	{
		// The selected trigger string has to be deleted now because that selection can't
		// be restored after we make other selections.
		doc.deleteText();
		
		original_line   = doc.currentLineNum;
		original_column = doc.currentColumnNum + current_column_offset;
		
		// Get the current line's leading whitespace, being careful to not include any whitespace
		// that was after the trigger string now that the trigger string has been deleted.
		doc.gotoLineSelect(doc.currentLineNum, 1);		
		
		var leading_whitespace = doc.selection.replace(/^(\s*).*$/, '$1');
		
		// Go to the end of the line to check for EOF, and because selectLine() stops at soft word-wrap line breaks.
		doc.gotoLine(doc.currentLineNum, 20000);
		
		// If the current line is the last in the file and therefore doesn't have a line ending
		// then insert another line.
		if (doc.isEof())
		{
			doc.insertLine();
			doc.deleteToStartOfLine();  // Needed because insertLine() might preserve indentation.
			doc.gotoLine(original_line, 20000);
		}
		
		// Get the line ending from the current line.
		doc.selectLine();
		
		var line_ending = doc.selection.replace(/^.*([\r\n]*)$/, '$1');
		
		snippet_string = snippet.join(line_ending + leading_whitespace);
		
		// Move the cursor back to the insertion point.
		doc.gotoLine(original_line, original_column);
	}
	
	// Output the snippet.  If there is a cursor string in the snippet then output it
	// in two halves so the cursor can be moved to the specified position in the middle.
	if (snippet_string.indexOf(cursor_string) > -1)
	{
		var snippet_half = snippet_string.split(cursor_string, 2);
		
		doc.write(snippet_half[0]);
		
		var cursor_line   = doc.currentLineNum,
		    cursor_column = doc.currentColumnNum + current_column_offset;
		
		doc.write(snippet_half[1]);
		
		doc.gotoLine(cursor_line, cursor_column);
	}
	else
	{
		doc.write(snippet_string);
	}
}
