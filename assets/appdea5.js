function __callback(res){let _msg=res.msg.replace(/\n/g,"<br />");switch(res.status){case 'notif-error':{$.toast({heading:'Error message',position:'top-center',text:_msg,icon:'error',loader:true,loaderBg:'#9EC600'});break;}
case 'notif-info':{jQuery.toast({heading:'Notification',position:'top-right',text:_msg,icon:'info',loader:true,loaderBg:'#9EC600'});break;}
case 'notif-success':{jQuery.toast({heading:'Notification',position:'top-right',text:_msg,icon:'info',loader:true,loaderBg:'#4CAF50'});break;}
case 1:{alert(res.msg);if(typeof res.data.reload!=="undefined"&&res.data.reload===true){location.reload();}else if(typeof res.data.redirect!=="undefined"&&res.data.redirect){window.location.href=res.data.redirect;}
break;}
default:{alert(res.msg);break;}}}
function alertError(string,heading='Error message',type='error'){$.toast({heading:heading,position:'top-center',text:string,icon:type,loader:true,loaderBg:'#9EC600'});}
function _GET_URL(url,options={}){jQuery.ajax({url:url,type:"GET",dataType:options.dataType||'json',success:function(res){if(typeof options.callback!=="undefined"){return eval(options.callback(res));}
return eval(__callback(res));},error:function(xhr,ajaxOptions,thrownError){alert(thrownError);}});return false;}
JSON._parse=JSON.parse
JSON.parse=function(json){try{return JSON._parse(json)}catch(e){jsonlint.parse(json)}}
function formatDateTime2iCal(date){const year=date.getUTCFullYear();const month=_pad(date.getUTCMonth()+1);const day=_pad(date.getUTCDate());const hour=_pad(date.getUTCHours());const minute=_pad(date.getUTCMinutes());const second=_pad(date.getUTCSeconds());return `${year}${month}${day}T${hour}${minute}${second}Z`;}