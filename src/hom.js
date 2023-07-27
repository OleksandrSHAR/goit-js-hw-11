import Notiflix from 'notiflix';
import { searchImg } from "./api"
 import { geleryMarc } from "./gelery"
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const buttonLoad = document.querySelector(".loadd-more-js")
const seaForm = document.querySelector("#search-form")
const geleryImg = document.querySelector(".gallery")
const lightbox = new SimpleLightbox('.gallery a')
const elJs=document.querySelector(".js-guard")
let page = 1;
let searVal;


buttonLoad.addEventListener("click",scrol)
seaForm.addEventListener("submit", onSearch)

async function onSearch(e) {
  try {
    e.preventDefault();
     observer.unobserve(elJs)
    geleryImg.innerHTML = "";
    Notiflix.Loading.arrows();
    searVal = seaForm.elements.searchQuery.value.trim()
    const valid = /^[a-zA-Z0-9\s]+$/.test(searVal)
    page = 1;
   
    if (!valid) {
      Notiflix.Notify.info('Sorry, there are no images matching your search query. Please try again.');
      Notiflix.Loading.remove();
      return
    } else {
      const { hits, hitsTot } = await searchImg(searVal)
      if (hitsTot === 0) {
        Notiflix.Report.warning('Not found', 'Your request was not found, please check the correctness of what you wrote and try again', 'cllose');
      }
      
     
      Notiflix.Report.success('Hooray' ,'We found images', 'OK')
      geleryImg.innerHTML = geleryMarc(hits)
      lightbox.refresh();
      e.target.reset()
       observer.observe(elJs);
    
    }
  }
  catch (error) {
      Notiflix.Notify.failure('Sorry, an error occurred');
      console.log(error)
    }
  finally {
    seaForm.reset()
   Notiflix.Loading.remove();}
  }


function scrol(){
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  })
  buttonLoad.style.visibility = "hidden";
}


  let options = {
    root: null,
    rootMargin: "10px",
    threshold: 0,
  };

let observer = new IntersectionObserver(paginationHand, options);


 async function paginationHand(entries, observer) {
  for (let entry of entries) {
   if(entry.isIntersecting){
  try {
    Notiflix.Loading.arrows();
    page +=1;
    console.log(page);
    const {hits, hitsTot} = await searchImg(searVal, page)
    geleryImg.insertAdjacentHTML('beforeend', geleryMarc(hits))
    if(hits.length < 40){
      observer.unobserve(entry.target)
    }
    lightbox.refresh();
    
    if(page > Math.round((hitsTot / 40))) {
      setTimeout(() => {
        buttonLoad.style.visibility = "visible";
      Notiflix.Report.failure('END', 'Nothing else found', 'OK');
      return;
      }, 1000);
  }
    } catch(err) {
      console.log(err);
      buttonLoad.style.visibility = "visible";
      Notiflix.Report.failure('UPS', 'It seems that a malfunction has occurred', 'Closse');
      }
      finally {
      Notiflix.Loading.remove();
    }
  }
 };
}