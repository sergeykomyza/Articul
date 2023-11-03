const animateCircle = () => {
    let value = 0, v = 0;
    let transform = (e,r,s) => e.setAttribute('transform',`scale(${s})rotate(${r})`);
    requestAnimationFrame(draw);
    function draw(t) {
      let speed = Math.max(0.0001, Math.abs(value-v)*0.1);
      if (v < value) v = Math.min(value, v+speed);
      if (v > value) v = Math.max(value, v-speed);
      transform(round, v*360, 1);
      transform(count, 0, 1+v*2);
      requestAnimationFrame(draw);
    }
    document.querySelector('body').addEventListener('wheel', e => {
      value = Math.min(1, Math.max(value + Math.sign(-e.wheelDelta)*0.06, -0.3));
    });
}

const animateGSAP = () => {

    let posY,
        posX

    if(document.documentElement.clientWidth > 480){
        posY = '-6.6rem'
        posX = '-0.9rem'
    } else {
        posY = '-3.3rem'
        posX = '-0.4rem'
    }

    const tl = gsap.timeline()
    const tl2 = gsap.timeline()
    
    tl.from('.present-advantages__item',{
        x: 100,
        opacity: 0,
        stagger: 0.1
    }).to('.present-advantages__item',{
        width: 'auto',
        stagger: 0.1
    }).to('.present-advantages__item--0', {
        rotate: '136deg',
        x: posX,
        y: posY
    })

    tl2.from('.present__title--car', {
        opacity: 0,
        duration: 1,
        delay: 1
    }).from('.present__title--art', {
        opacity: 0,
        delay: 0.7
    })

    setTimeout(function (){
        const tl3 = gsap.timeline({
            scrollTrigger: {
                trigger: '.footer',
                start: '1rem 80%',
                end: `+=10`,
                duration: 3,
                scrub: 1.5,
                toggleActions: "play none resume reverse",
                markers: false,
            }
        })
        tl3.from(".footer-labels__item", {
            transform: 'none',
            opacity: 0,
        }).from(".footer-labels", {
            transform: 'translate(-29rem, 0.5rem)',
            duration: 0.5,
        }).from(".footer__info", {
            opacity: 0,
        })
    }, 500);
    
}


const tabs = () => {
    document.querySelectorAll('.vacancy__item').forEach(el => {
        const runner = el.querySelector('.runner')
        const tabs = el.querySelectorAll('.js-tabBtn')
        const contents = el.querySelectorAll('.vacancy-parameters__body')
        tabs[0].classList.add('is-active')
        contents.forEach(item => {
            item.classList.remove('is-active')
        })
        contents[0].classList.add('is-active')
        tabs.forEach((item, i) => {
            item.addEventListener('click', function (e) {
                tabs.forEach(elem => {
                    elem.classList.remove('is-active')
                })
                this.classList.add('is-active')
                contents.forEach(item => {
                    item.classList.remove('is-active')
                })
                contents[i].classList.add('is-active')
            })
        })

    })
}

const accordeons = (box, item, header, content, openedClass, closedClass) => {
    const accordeon = document.querySelector(box)
    const accItem = accordeon.querySelectorAll(item)
    accItem.forEach(item => {
        const accContent = item.querySelector(content)
        accContent.style.cssText = `
        overflow: hidden;
        transition: all .3s;
    `
        item.className = closedClass
        accContent.style.maxHeight = 0
        item.addEventListener('click', toggle)
    });
    accItem[0].className = openedClass
    accItem[0].querySelector(content).style.maxHeight = accItem[0].querySelector(content).scrollHeight + 'px'
   
    function toggle(e) {
        setTimeout(function () {
            ScrollTrigger.refresh();
        }, 500);
        let target = e.target
        e.preventDefault()
        const thisClass = this.className
        const itsAccHeader = target == this.querySelector(header) || this.querySelector(header).contains(target)
        const accHeader = this.querySelector(header)
        const accContent = this.querySelector(content)
        accItem.forEach(item => {
            const accHeader = item.querySelector(header)
            const accContent = item.querySelector(content)
            if (itsAccHeader) {
                const trigger = window.pageYOffset + document.querySelector('.vacancy').getBoundingClientRect().top;
                setTimeout(()=> {
                    window.scrollTo({
                        top: trigger,
                        left: 100,
                        behavior: "smooth",
                    })
                }, 200)

                item.className = closedClass
                accContent.style.maxHeight = 0
            }
        })
        if (thisClass == closedClass) {
            this.className = openedClass
            this.querySelector(content).style.maxHeight = this.querySelector(content).scrollHeight + 'px'
        }
    }
}

animateCircle()
tabs()
accordeons('.vacancy', '.vacancy__item', '.vacancy__head', '.vacancy__body', 'vacancy__item opened', 'vacancy__item closed');
animateGSAP()
lastAnimate()