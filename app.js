document.documentElement.classList.add('js');
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); } }), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
const toggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu-drawer');
const backdrop = document.querySelector('.menu-backdrop');
function setMenu(open) {
 toggle.setAttribute('aria-expanded', String(open)); toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
 menu.classList.toggle('open', open); menu.inert = !open; backdrop.hidden = !open;
 if (open) menu.querySelector('a').focus({preventScroll:true}); else toggle.focus({preventScroll:true});
}
toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
backdrop.addEventListener('click', () => setMenu(false));
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => {
 if (toggle.getAttribute('aria-expanded') !== 'true') return;
 if (e.key === 'Escape') setMenu(false);
 if (e.key === 'Tab') { const links = [...menu.querySelectorAll('a')]; const first = links[0], last = links.at(-1); if (e.shiftKey && document.activeElement === first) { e.preventDefault(); toggle.focus(); } else if (e.shiftKey && document.activeElement === toggle) {e.preventDefault(); last.focus();} else if (!e.shiftKey && document.activeElement === last) {e.preventDefault(); toggle.focus();} else if (!e.shiftKey && document.activeElement === toggle) {e.preventDefault();first.focus();} }
});
addEventListener('resize', () => {if(innerWidth >=1050 && toggle.getAttribute('aria-expanded') === 'true') setMenu(false);});
const slides = [...document.querySelectorAll('.slide')]; const dots = [...document.querySelectorAll('.slider-dots button')];
const heroFrame = document.querySelector('.hero-frame'); const pauseButton = document.querySelector('.slider-pause');
let slideIndex = 0, paused = reducedMotion.matches, interval;
function showSlide(next) {slideIndex=(next+slides.length)%slides.length;slides.forEach((slide,i)=>{slide.classList.toggle('active',i===slideIndex);slide.setAttribute('aria-hidden',String(i!==slideIndex));});dots.forEach((dot,i)=>{dot.classList.toggle('active',i===slideIndex);dot.setAttribute('aria-pressed',String(i===slideIndex));});}
function startSlider() {clearInterval(interval);if(!paused&&!document.hidden) interval=setInterval(()=>showSlide(slideIndex+1),6000);pauseButton.textContent=paused?'▷':'Ⅱ';pauseButton.setAttribute('aria-label',paused?'Play slideshow':'Pause slideshow');}
dots.forEach((dot,i)=>dot.addEventListener('click',()=>{showSlide(i);startSlider();}));
pauseButton.addEventListener('click',()=>{paused=!paused;startSlider();});
document.addEventListener('visibilitychange',startSlider); reducedMotion.addEventListener('change',e=>{paused=e.matches;startSlider();});
heroFrame.addEventListener('mouseenter',()=>clearInterval(interval));heroFrame.addEventListener('mouseleave',startSlider);
heroFrame.addEventListener('focusin',()=>clearInterval(interval));heroFrame.addEventListener('focusout',startSlider);
let touchStart=0;heroFrame.addEventListener('touchstart',e=>{touchStart=e.changedTouches[0].clientX;},{passive:true});heroFrame.addEventListener('touchend',e=>{const distance=e.changedTouches[0].clientX-touchStart;if(Math.abs(distance)>45){showSlide(slideIndex+(distance<0?1:-1));startSlider();}},{passive:true});showSlide(0);startSlider();
const track=document.querySelector('.collection-track'), previous=document.querySelector('.prev'), next=document.querySelector('.next'), progress=document.querySelector('.track-progress span');
function updateTrack(){const max=track.scrollWidth-track.clientWidth;previous.disabled=track.scrollLeft<4;next.disabled=track.scrollLeft>=max-4;progress.style.width=`${Math.min(100,track.clientWidth/track.scrollWidth*100)}%`;progress.style.transform=`translateX(${max>0?track.scrollLeft/max*100:0}%)`;}
previous.addEventListener('click',()=>track.scrollBy({left:-track.clientWidth,behavior:reducedMotion.matches?'instant':'smooth'}));next.addEventListener('click',()=>track.scrollBy({left:track.clientWidth,behavior:reducedMotion.matches?'instant':'smooth'}));track.addEventListener('scroll',updateTrack,{passive:true});addEventListener('resize',updateTrack);updateTrack();
const form=document.querySelector('.cake-ticket'), result=document.querySelector('.enquiry-result'), resultText=result.querySelector('textarea'), status=document.querySelector('.copy-status');
const date=form.elements.date;date.min=new Date().toLocaleDateString('en-CA');
document.querySelectorAll('[data-category]').forEach(link=>link.addEventListener('click',()=>{form.elements.occasion.value=link.dataset.category;}));
form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const data=new FormData(form);const chosenDate=new Date(`${data.get('date')}T12:00:00`).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric'});resultText.value=`Hi Isha! I have a little cake wish.\n\nName: ${data.get('name')}\nMade for: ${data.get('madefor')||'Someone special'}\nOccasion: ${data.get('occasion')}\nDate: ${chosenDate}\nServings: ${data.get('servings')}\nStyle: ${data.get('look')}${data.get('budget')?'\nBudget: £'+data.get('budget'):''}${data.get('idea')?'\nMy idea: '+data.get('idea'):''}${data.get('inspiration')?'\nInspiration: '+data.get('inspiration'):''}\n\nCould you let me know your availability and pricing? Thank you!`;result.hidden=false;status.textContent='Your enquiry is ready to copy. Nothing has been sent yet.';result.scrollIntoView({behavior:reducedMotion.matches?'instant':'smooth',block:'center'});});
document.querySelector('.copy').addEventListener('click',async()=>{try{await navigator.clipboard.writeText(resultText.value);status.textContent='Copied! Open Instagram and paste your wish into a message to Isha.';}catch{resultText.focus();resultText.select();status.textContent='Select and copy the message above, then send it to Isha on Instagram.';}});
document.getElementById('year').textContent=new Date().getFullYear();

const kindWords=[{quote:'Colours are gorgeous 😍',name:'sliceofsams',url:'https://www.instagram.com/p/DYXik-VMQ9Z/c/18117220912615246/'},{quote:'These are so pretty 😍',name:'whisknbakes',url:'https://www.instagram.com/p/DYXik-VMQ9Z/c/18121382563563079/'},{quote:'So prettyyy 🩷✨',name:'secret_to_beauty_',url:'https://www.instagram.com/p/DYXik-VMQ9Z/c/18199184212362876/'}];
let loveIndex=0;function showKindWords(direction){loveIndex=(loveIndex+direction+kindWords.length)%kindWords.length;const word=kindWords[loveIndex];document.getElementById('love-quote').textContent=word.quote;const author=document.getElementById('love-author');author.textContent='@'+word.name+' · Instagram comment ↗';author.href=word.url;document.querySelector('.love-count').textContent=(loveIndex+1)+' / '+kindWords.length;}
document.querySelector('.love-prev').addEventListener('click',()=>showKindWords(-1));document.querySelector('.love-next').addEventListener('click',()=>showKindWords(1));
const loveQuote=document.querySelector('.love-card blockquote');document.querySelectorAll('.love-prev,.love-next').forEach(button=>button.addEventListener('click',()=>{if(!reducedMotion.matches)loveQuote.animate([{opacity:.15,transform:'translateY(4px)'},{opacity:1,transform:'translateY(0)'}],{duration:450,easing:'ease-out'});}));
