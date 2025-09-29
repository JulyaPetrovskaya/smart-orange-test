document.addEventListener('DOMContentLoaded', ()=>{
    const track = document.querySelector('.slider__track');
    const prevButton = document.querySelector('.slider__arrow--prev');
    const nextButton = document.querySelector('.slider__arrow--next');
    const slides = Array.from(track.children);
    const slideCount = slides.length;
    const logo = document.querySelector('.slider__logo');
    const title = document.querySelector('.slider__title');
    const dotsGroup = document.querySelector('.slider__dot-group');
    for(let i = 0; i < slideCount; i++){
        const dot = document.createElement('span');
        dot.classList.add('slider__dot');
        dotsGroup.appendChild(dot);
    }
    const dots = Array.from(dotsGroup.children);
    let currentSlideIndex = 0;
    const updateDots = (currentIndex)=>{
        dots.forEach((dot, index)=>{
            if (index === currentIndex) dot.classList.add('slider__dot--active');
            else dot.classList.remove('slider__dot--active');
        });
    };
    const updateSlider = (targetIndex)=>{
        const amountToMove = targetIndex * (100 / slideCount);
        track.style.transform = `translateX(-${amountToMove}%)`;
        currentSlideIndex = targetIndex;
        if (targetIndex === 0) {
            logo.classList.remove('element-hidden');
            title.textContent = 'Test slider';
        } else {
            logo.classList.add('element-hidden');
            title.textContent = 'Owoooooo';
        }
        updateDots(targetIndex);
    };
    nextButton.addEventListener('click', ()=>{
        let nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex >= slideCount) nextSlideIndex = 0;
        updateSlider(nextSlideIndex);
    });
    prevButton.addEventListener('click', ()=>{
        let prevSlideIndex = currentSlideIndex - 1;
        if (prevSlideIndex < 0) prevSlideIndex = slideCount - 1;
        updateSlider(prevSlideIndex);
    });
    dotsGroup.addEventListener('click', (e)=>{
        const targetDot = e.target.closest('.slider__dot');
        if (!targetDot) return;
        const targetIndex = dots.findIndex((dot)=>dot === targetDot);
        updateSlider(targetIndex);
    });
    updateSlider(currentSlideIndex);
});

//# sourceMappingURL=smart_orange.dd3e336e.js.map
