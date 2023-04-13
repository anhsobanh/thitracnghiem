function convertToSlug(Text){return Text.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');}
function validateEmail(email){const re=/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;return re.test(String(email).toLowerCase());}
function validURL(str){var pattern=new RegExp('^(https?:\\/\\/)?'+
'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+
'((\\d{1,3}\\.){3}\\d{1,3}))'+
'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
'(\\?[;&a-z\\d%_.~+=-]*)?'+
'(\\#[-a-z\\d_]*)?$','i');return!!pattern.test(str);}
function _pad(i){return i<10?`0${i}`:`${i}`;}
function setHeightOfEditable(elementId){var mainForm=document.getElementById('mainFormInput');var inputHiddenId='height_'+elementId;var editAble=document.getElementById(elementId);function _setHeight(){let inputHidden;if(!document.getElementById(inputHiddenId)){inputHidden=document.createElement("input");inputHidden.type='hidden';inputHidden.id=inputHiddenId;inputHidden.name=inputHiddenId;mainForm.appendChild(inputHidden)}else{inputHidden=document.getElementById(inputHiddenId);}
inputHidden.value=editAble.offsetHeight;}
try{new ResizeObserver(_setHeight).observe(editAble);}catch(e){}}
function copyTextByElement(id,doneString,emptyString){let textarea=document.getElementById(id);if(textarea.value===''){if(emptyString){alert(emptyString);}
return;}
textarea.select();document.execCommand('copy');alert(doneString);};function copyText(value,msg){return setClipboard(value,msg);}
function setClipboard(value,msg){if(value===''){alert('Content is empty!');return;}
var tempInput=document.createElement("input");tempInput.style="position: absolute; left: -1000px; top: -1000px;";tempInput.value=value;document.body.appendChild(tempInput);tempInput.select();document.execCommand("copy");document.body.removeChild(tempInput);if(msg){alert(msg);}}
function __callback(){}
function _POST_FORM(formId,url,options={}){let{callback,type='json',globalCallback=true,appendData=[]}=options;if(typeof callback!=='function'){}
let data=[];if(typeof formId!=="undefined"){data=$(formId).serializeArray();}else{}
let _token=jQuery('meta[name=_token]').attr("content");if(_token){let _data={'name':'_token','value':_token};data.push(_data);}
if(appendData){for(let i in appendData){data.push(appendData[i]);}}
jQuery.ajax({url:url,type:"POST",data:data,dataType:type,success:function(res){try{eval(options.callback(res))}catch(e){}
if(globalCallback){return eval(__callback(res));}},error:function(xhr,ajaxOptions,thrownError){try{eval(options.callback(xhr.responseJSON))}catch(e){}
if(xhr.responseJSON.errors){let _msg='';for(const[key,val]of Object.entries(xhr.responseJSON.errors)){console.log(val)
console.log(key)
_msg+=val+"\n";}
alert(_msg)}else{alert(thrownError);}}});return false;}
function _GET_URL(url,options={}){jQuery.ajax({url:url,type:"GET",dataType:options.dataType||'json',success:function(res){if(typeof options.callback!=="undefined"){return eval(options.callback(res));}
return eval(__callback(res));},error:function(xhr,ajaxOptions,thrownError){alert(thrownError);}});return false;}
function saveToLocal(key,tool,max=36){let tools=localStorage.getItem(key);if(!tools){tools=[];}else{tools=JSON.parse(tools);tools=tools.filter(object=>{return object.l!==tool.l;});}
tools.unshift(tool);if(tools.length>36){tools.pop();}
localStorage.setItem(key,JSON.stringify(tools));}
function saveHistory(tool){saveToLocal('history',tool,36);}
function saveFav(tool){saveToLocal('fav',tool,36);}
function getLocalKey(key,position_show='header'){let tools=localStorage.getItem(key);if(!tools){tools=[];}else{tools=JSON.parse(tools);}
let html='';for(let i in tools){let tool=tools[i];html+='<li>\n'+
'<a class="dropdown-item" href="'+tool.l+'">'+tool.n+'</a>\n'+
'</li>'}
try{document.getElementById('recent').classList.remove('d-none');document.getElementById('recentMenu').innerHTML=html;}catch(e){}}
function getHistory(){getLocalKey('history');}
function showFileInfo(input,show='file1Name'){let file=input.files[0];let size=Math.ceil(file.size/1024);var html='<div style="overflow:hidden;width: 100%">'+file.name+' <i> ('+size+' KB)</i></div>';document.getElementById(show).innerHTML=html;}
function showFormRemote(link,options){let content='<div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModal" data-bs-focus="false" aria-hidden="true"><div id="mdbd"></div></div>';jQuery('#myModal').remove();jQuery('body').append(content)
jQuery('.modal-backdrop').remove();jQuery('#mdbd').load(link,function(){jQuery('#myModal').modal("show");jQuery('#myModal').find('[data-modal-close="true"]').on("click",function(){jQuery("#myModal").modal("hide");});});}