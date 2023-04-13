var passwordCheckBox=document.getElementsByClassName('form-check-input');var i=passwordCheckBox.length;while(i--){passwordCheckBox[i].addEventListener("change",_genPassword);}
function _genPassword(){let stringInclude='';let newPassword='';let maxLength=512;let _includeSymbol=document.getElementById('symbol').checked;if(_includeSymbol){stringInclude+="!\"#$%&'()*+,-./:;<=>?@[\]^_`{|}~";}
let _includeNumber=document.getElementById('number').checked;if(_includeNumber){stringInclude+='0123456789';}
let _includeLower=document.getElementById('lowercase').checked;if(_includeLower){stringInclude+='abcdefghijklmnopqrstuvwxyz';}
let _includeUpper=document.getElementById('uppercase').checked;if(_includeUpper){stringInclude+='ABCDEFGHIJKLMNOPQRSTUVWXYZ';}
let _excludeSimilar=document.getElementById('similar').checked;if(_excludeSimilar){stringInclude=stringInclude.replace(/i|l|1|L|o|0|O/g,'');}
let _excludeAmbiguous=document.getElementById('ambiguous').checked;if(_excludeAmbiguous){stringInclude=stringInclude.replace(/[\/.?;:`'"<>,~{}()|[\]\\]/g,'');}
let pLength=document.getElementById('length').value;if(pLength>maxLength){document.getElementById('length').value=maxLength;pLength=maxLength;}
let pMany=document.getElementById('many').checked;let pQuantity=1;if(pMany){pQuantity=20;}
let pSplist=document.getElementById('split').checked;for(let k=0;k<pQuantity;k++){for(let i=0;i<pLength;i++){newPassword+=stringInclude.charAt(Math.floor(Math.random()*stringInclude.length));if(pSplist){if((i+1)%5===0&&i<pLength-1){newPassword+='-'}}}
if(k<pQuantity-1){newPassword+='\n';}}
if(stringInclude.length===0){newPassword='';}
if(pMany){document.getElementById('password-many').value=newPassword;}else{document.getElementById('password').value=newPassword;}
_toggleResult(!pMany)}
function _changeLength(event){document.getElementById('current-length').innerHTML=event.value;_genPassword();}
function _toggleResult(isSingle){if(isSingle){document.getElementById('singleResult').classList.add('d-block');document.getElementById('singleResult').classList.remove('d-none');document.getElementById('manyResult').classList.add('d-none');document.getElementById('manyResult').classList.remove('d-block');}else{document.getElementById('singleResult').classList.add('d-none');document.getElementById('singleResult').classList.remove('d-block');document.getElementById('manyResult').classList.add('d-block');document.getElementById('manyResult').classList.remove('d-none');}}