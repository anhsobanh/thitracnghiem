function searchfunc(){
    let menusearch = document.querySelector('#menusearch');
    let menuitems = Array.from(document.querySelectorAll('.menu__item'));
    menusearch.value = menusearch.value.toLowerCase();
    menuitems.forEach(function(el){
        let text = el.innerText;
        if(text.indexOf(menusearch.value)>-1)
        el.style.display="";
        else el.style.display="none";
    })}

