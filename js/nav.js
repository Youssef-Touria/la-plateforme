const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
if (urlParams.get('disconnect')) {
    localStorage.clear();
}

const role=localStorage.getItem('role');
if(role!==null){
    document.querySelectorAll('.connected').forEach((item)=>{item.style.display='block'});
    document.querySelectorAll('.disconnected').forEach((item)=>{item.style.display='none'});
    document.querySelectorAll('.admined').forEach((item)=>{item.style.display='none'}); 
    if(role==='admin' || role==='moderator'){
        document.querySelectorAll('.admined').forEach((item)=>{item.style.display='block'});}
}else{
    document.querySelectorAll('.disconnected').forEach((item)=>{item.style.display='block'});
    document.querySelectorAll('.connected').forEach((item)=>{item.style.display='none'}); 
    document.querySelectorAll('.admined').forEach((item)=>{item.style.display='none'}); 
}