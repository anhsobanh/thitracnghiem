function _beautifyString(inputEditor){let jsonString=inputEditor.getValue();if(jsonString.trim()===''){inputEditor.setValue(JSON.stringify({message:'Your content is empty. Please enter content',},null,2))
return;}
try{let json=JSON.parse(jsonString);let text=JSON.stringify(json,null,2);inputEditor.setValue((text))}catch(e){}}
function _minifyString(inputEditor){let jsonString=inputEditor.getValue();if(jsonString.trim()===''){inputEditor.setValue(JSON.stringify({message:'Your content is empty. Please enter content',}))
return;}
try{let json=JSON.parse(jsonString);let text=JSON.stringify(json);inputEditor.setValue((text))}catch(e){inputEditor.set({error:e.toString()});}}
function _isRealtimeUpdate(){return document.getElementById('realTimeUpdate').checked;}
function isJson(item){item=typeof item!=="string"?JSON.stringify(item):item;try{item=JSON.parse(item);}catch(e){return false;}
if(typeof item==="object"&&item!==null){return true;}
return false;}
function saveDocumentInit(saveButtonId,editor,extension='json'){document.getElementById(saveButtonId).onclick=function(){let fname=window.prompt("Save as...");if(fname==null){return;}
if(fname.trim().length===0){alert('You need input name...');return;}
if(fname.indexOf(".")===-1){fname=fname+"."+extension}else{if(fname.split('.').pop().toLowerCase()===extension){}else{fname=fname.split('.')[0]+"."+extension;}}
let type='application/json;charset=utf-8';const blob=new Blob([editor.getValue()],{type:type})
saveAs(blob,fname);}}
var inputEditor,outputEditor;var delayChange;var SitaEditor={saveContentAceEditorToComputerHandle(saveButtonId,editor,extension='xml',type='application/xml;charset=utf-8'){document.getElementById(saveButtonId).onclick=function(){let{extension=extension,type=type}=this.dataset;let fname="sita.app_file_download."+extension;const blob=new Blob([editor.getValue()],{type:type})
saveAs(blob,fname);}},saveContentEditorToComputer:function(saveButtonId,editor){document.getElementById(saveButtonId).onclick=function(){var date=new Date();let extension=this.dataset.extension||'txt';let type=this.dataset.type||'text/txt';let fname="sita.app_file_download_"+date.getMinutes()+'.'+extension;const blob=new Blob([editor.getValue()],{type:type+';charset=utf-8'})
saveAs(blob,fname);}},initOpenFileFromComputer:function(editor,buttonId='loadDocumentFromComputer'){FileReaderJS.setupInput(document.getElementById(buttonId),{readAsDefault:'Text',on:{load:function(event,file){editor.setValue(event.target.result)}}});},handleButtonCopyText(editor,buttonClickId){document.getElementById(buttonClickId).onclick=function(){editor.selectAll()
let copyText=editor.getCopyText();isClipboardWritingAllowed().then(function(allowed){if(allowed){navigator.clipboard.writeText(copyText).then(function(){alert("The text has been succesfully copied to the clipboard!");});}}).catch(function(err){alert("Cannot copy to clipboard",err);});}},beautifyJson:function(editor){let jsonString=editor.getValue();if(jsonString.trim()===''){editor.setValue(JSON.stringify({message:'Your content is empty. Please enter content',},null,2))
return;}
try{let json=JSON.parse(jsonString);let text=JSON.stringify(json,null,2);editor.setValue((text))}catch(e){}},beautifyHTML:function(inputEditor,outputEditor){if(typeof outputEditor=="undefined"){outputEditor=inputEditor;}
let opts={}
opts.indent_size=4;outputEditor.setValue(html_beautify(inputEditor.getValue(),opts));},beautifyXml:function(editor){let value=editor.getValue();if(value){var beautifiedXmlText=new XmlBeautify().beautify(editor.getValue(),{indent:"  ",useSelfClosingElement:true});editor.setValue(beautifiedXmlText);}},beautifyJs:function(editor,tab=2){let opts={}
opts.indent_size=2;let text=editor.getValue();editor.setValue(js_beautify(text,opts));},beautifyCss:function(inputEditor,outputEditor){if(typeof outputEditor=="undefined"){outputEditor=inputEditor;}
if(typeof CSSFormatter!="undefined"){var content=inputEditor.getValue();content=CSSFormatter.unminify(content);outputEditor.setValue(content);}else{let opts={}
opts.indent_size=2;let text=outputEditor.getValue();outputEditor.setValue(css_beautify(text,opts));}},unminifyCss:function(inputEditor,outputEditor){if(typeof outputEditor=="undefined"){outputEditor=inputEditor;}
var content=inputEditor.getValue();content=CSSFormatter.unminify(content);outputEditor.setValue(content)},minifyCss:function(inputEditor,outputEditor){if(typeof outputEditor=="undefined"){outputEditor=inputEditor;}
var content=inputEditor.getValue();content=CSSFormatter.minify(content);outputEditor.setValue(content)},minifyJs:function(inputEditor,outputEditor){if(typeof outputEditor=="undefined"){outputEditor=inputEditor;}
var opt={parse:{},compress:false,mangle:false,output:{ast:false,code:true},wrap:false};let res=minify(inputEditor.getValue(),opt);if(res.error){alert(res.error);outputEditor.setValue(res.code);return false;}
outputEditor.setValue(res.code);},unminifyJs:function(inputEditor,outputEditor){if(typeof outputEditor=="undefined"){outputEditor=inputEditor;}
let opts={}
opts.indent_size=2;let text=inputEditor.getValue();outputEditor.setValue(js_beautify(text,opts));},minifyHtml:function(inputEditor,outputEditor){if(typeof outputEditor=="undefined"){outputEditor=inputEditor;}
let text=inputEditor.getValue();const options={includeAutoGeneratedTags:true,removeAttributeQuotes:true,removeComments:true,removeRedundantAttributes:true,removeScriptTypeAttributes:true,removeStyleLinkTypeAttributes:true,sortClassName:true,minifyCSS:true,minifyJS:true,useShortDoctype:true,collapseWhitespace:true};outputEditor.setValue(html_minify(text,options));},beautifyPhp:function(editor){let opts={plugins:prettierPlugins,parser:"php",}
opts.tabWidth=4;try{let val=prettier.format(editor.getValue(),opts);editor.setValue(val)}catch(e){alert(e.message)}},minifyJson:function(editor){let jsonString=editor.getValue();if(jsonString.trim()===''){editor.setValue(JSON.stringify({message:'Your content is empty. Please enter content',}))
return;}
try{let json=JSON.parse(jsonString);let text=JSON.stringify(json);editor.setValue((text))}catch(e){editor.set({error:e.toString()});}},initInputEditor:function(){inputEditor=ace.edit("inputEditor");inputEditor.session.setUseWrapMode(true);inputEditor.setTheme('ace/theme/chrome');inputEditor.setShowPrintMargin(false);SitaEditor.initOpenFileFromComputer(inputEditor);try{SitaEditor.saveContentEditorToComputer('saveInputToMyComputer',inputEditor)}catch(e){}
try{SitaEditor.handleButtonCopyText(inputEditor,'copyInput');}catch(e){}
return inputEditor;},initPreview:function(inputEditor,start_tag='',close_tag=''){inputEditor.getSession().on("change",function(){clearTimeout(delayChange);delayChange=setTimeout(()=>{SitaEditor.updatePreview(inputEditor,start_tag,close_tag);},169);});SitaEditor.updatePreview(inputEditor,start_tag,close_tag);},initOutputEditor:function(){outputEditor=ace.edit("outputEditor");outputEditor.setTheme('ace/theme/xcode');outputEditor.session.setUseWrapMode(true);outputEditor.setShowPrintMargin(false);try{SitaEditor.saveContentEditorToComputer('saveOutputToMyComputer',outputEditor);}catch(e){console.log(e)}
try{SitaEditor.handleButtonCopyText(outputEditor,'copyOutput');}catch(e){}
return outputEditor;},updatePreview:function(inputEditor,start_tag='',close_tag=''){var previewFrame=document.getElementById('outputPreview');var preview=previewFrame.contentDocument||previewFrame.contentWindow.document;preview.open();preview.write(start_tag);preview.write(inputEditor.getValue());preview.write(close_tag);preview.close();},convertJsonToCamelCase:function(inputEditor,outputEditor){function toCamel(o){var newO,origKey,newKey,value
if(o instanceof Array){return o.map(function(value){if(typeof value==="object"){value=toCamel(value)}
return value})}else{newO={}
for(origKey in o){if(o.hasOwnProperty(origKey)){newKey=(origKey.charAt(0).toLowerCase()+origKey.slice(1)||origKey).toString()
value=o[origKey]
if(value instanceof Array||(value!==null&&value.constructor===Object)){value=toCamel(value)}
newO[newKey]=value}}}
return newO}
if(typeof outputEditor=="undefined"){outputEditor=inputEditor;}
let jsonString=inputEditor.getValue();try{let json=JSON.parse(jsonString);json=toCamel(json);let text=JSON.stringify(json,null,2);outputEditor.setValue((text))}catch(e){alert(e.toString())}},}
function isClipboardWritingAllowed(){return new Promise(function(resolve,reject){try{navigator.permissions.query({name:"clipboard-write"}).then(function(status){resolve((status.state=="granted"));});}catch(error){reject(error);}});}