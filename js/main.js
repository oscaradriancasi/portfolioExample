
/*---------------- navigation menu----------------*/

(() =>{
    const menuBtn = document.querySelector(".menu-btn"),
    navMenu = document.querySelector(".nav-menu"),
    closeNavBtn = navMenu.querySelector(".close-nav-menu");

    menuBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);

    function showNavMenu(){
        navMenu.classList.add("open");
        bodyScrollingToggle();
    }
    function hideNavMenu(){
        navMenu.classList.remove("open");
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(() =>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },300)
    }
    //attach an event handler to document
    document.addEventListener("click", (event) =>{
        //console.log(event.target);
        if(event.target.classList.contains("link-item")){
            /* make sure event.target.hash (#) has a value before overridding default behavior*/
            //console.log(event.target.hash);
            if(event.target.hash !==""){
                //prevent default anchor click behavior
                event.preventDefault();
                const hash = event.target.hash;
                //console.log(hash);
                //desactivate existing active "section"
                document.querySelector(".section.active").classList.add("hide");
                document.querySelector(".section.active").classList.remove("active");
                //active new "section"
                document.querySelector(hash).classList.add("active");
                document.querySelector(hash).classList.remove("hide");
                //desactivate existing active navigation menu "link-item"
                navMenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                navMenu.querySelector(".active").classList.remove("active","inner-shadow");
                //if clicked link-item is contained withing the navigation menu
                if(navMenu.classList.contains("open")){
                    //activate new navigation menu "link-item"
                    event.target.classList.add("active","inner-shadow");
                    event.target.classList.remove("outer-shadow","hover-in-shadow");
                    //hide navigation menu
                    hideNavMenu();
                }
                else{
                    let navItems = navMenu.querySelectorAll(".link-item");
                    navItems.forEach((item) =>{
                        if(hash === item.hash){
                            //activate new navigation menu "link-item"
                            item.classList.add("active","inner-shadow");
                            item.classList.remove("outer-shadow","hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                //add hash (#) in url
                window.location.hash = hash;
            }
        }
    })
})();

/*---------------- about sections tab----------------*/

(() =>{
    const aboutSection = document.querySelector(".about-section");
    const tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        /* if event.target contain class 'tab-item'and not contain class 'active'*/
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")){
            const target = event.target.getAttribute("data-target");
            //desactive class active exists 'tab-item' now
            tabsContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            //activamos el nuevo boton 'tab-item'
            event.target.classList.add("active", "outer-shadow");
            //desactivamos active de 'tab-content'
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            //activamos el nuevo 'tab-content'
            aboutSection.querySelector(target).classList.add("active");

        }
    });
})();

//funcion para esconder el scroll Y al abrir el popup
function bodyScrollingToggle(){
    document.body.classList.toggle("hidden-scrolling");
}

/*---------------- filter portfolio and popup----------------*/
(() =>{
    const filterContainer = document.querySelector(".portfolio-filter"),
    portfolioItemsContainer = document.querySelector(".portfolio-items"),
    portfolioItems = document.querySelectorAll(".portfolio-item"),
    popup = document.querySelector(".portfolio-popup"),
    prevBtn = document.querySelector(".pp-prev"),
    nextBtn = document.querySelector(".pp-next"),
    closeBtn = document.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    /*filtro portfolio items*/
    filterContainer.addEventListener("click", (event) =>{
        if(event.target.classList.contains('filter-item') &&
            !event.target.classList.contains("active")){
                //desactivamos la clase active existente del 'filter-item' actual
                filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
                //activamos el nuevo boton 'filter-item'
                event.target.classList.add("active", "outer-shadow")
                //guardamos el valor de cada data-target de cada boton del filtro
                const target = event.target.getAttribute("data-target");
                //recorremos todos los items y si data-target (de los botones) es igual al nombre de data-category(de los items) o es igual a todos
                portfolioItems.forEach((item) =>{
                    if(target === item.getAttribute("data-category") || target === "all"){
                        item.classList.remove("hide");  //eliminara el none del item
                        item.classList.add("show");     //y lo enseñara
                    }else{ //sino lo contrario
                        item.classList.remove("show");
                        item.classList.add("hide");
                    }
                })
            }
    })
    /*popup portfolio items*/
    
    portfolioItemsContainer.addEventListener("click", (event) =>{
        //console.log(event.target);  //cuando clickamos en cada portfolio obtenemos el elemento en si su html
        //console.log(event.target.closest(".portfolio-item-inner")); //obtenemos todos los elementos html del interor del portfolio
        if(event.target.closest(".portfolio-item-inner")){
            const portfolioItem = event.target.closest(".portfolio-item-inner").parentElement;
            //console.log(portfolioItem); //obtenemos el padre del contenido interior del item
            //obtenemos la posicion de cada item
            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            //console.log(itemIndex);
            screenshots = portfolioItems[itemIndex].querySelector(".portfolio-item-img img")
            .getAttribute("data-screenshots");
            //console.log(screenshots); //obtenemos todos los screenshots de nuestro proyecto
            screenshots = screenshots.split(","); //convertimos los pantallazos en un array
            //console.log(screenshots);
            if(screenshots.length === 1){
                prevBtn.style.display = "none";
                nextBtn.style.display = "none";
            }else{
                prevBtn.style.display = "block";
                nextBtn.style.display = "block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }

    })


    //funcion ocultar popup
    closeBtn.addEventListener("click", () =>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }

    });
    //funcion para enseñar el popup
    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }
    //funcion para efecto slide popup
    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        //console.log(imgSrc);
        const popupImg = popup.querySelector(".pp-img");
        //console.log(popupImg);
        /*activar el efecto cargar al cambiar de img popup*/
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc; 
        popupImg.onload = () =>{
            //desactivar efecto load despues de cargar imgpopup
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length; //contador de img 
    }
    //show next img slide 
    nextBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }
        popupSlideshow();
    })
    //show prev img slide 
    prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1;
        }else{
            slideIndex--;
        }
        popupSlideshow();
    })


    function popupDetails(){
        //si el proyecto no tiene detalles ocultamos el boton
        if(portfolioItems[itemIndex].querySelector(".portofolio-item-details")){
            projectDetailsBtn.style.display = "none";
            return; //fin de la ejecucion de la funcion
        }
        projectDetailsBtn.style.display = "block";
        //obtener los detalles del proyecto y devolverlos
        const details = portfolioItems[itemIndex].querySelector(".portfolio-item-details").innerHTML;
        popup.querySelector(".pp-project-details").innerHTML = details;
        const title = portfolioItems[itemIndex].querySelector(".portfolio-item-title").innerHTML;
        popup.querySelector(".pp-title h2").innerHTML = title;    
        const category = portfolioItems[itemIndex].getAttribute("data-category");
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");//remplazamos e-commerce por e commerce       
  
    }




    //btn datail project
    projectDetailsBtn.addEventListener("click", () => {
        popupDetailsToggle();
    });

    //function show details projects
    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";

        }else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0,projectDetailsContainer.offsetTop); //para version movil 
        }
    }
})();

/*----------------------------------TESTIMONIAL SLIDER----------------------------------*/

(() =>{
    const sliderContainer = document.querySelector(".testi-slider-container"),
    slides = sliderContainer.querySelectorAll(".testi-item"),
    slideWidth = sliderContainer.offsetWidth,
    prevBtn = document.querySelector(".testi-slider-nav .prev"),
    nextBtn = document.querySelector(".testi-slider-nav .next"),
    activeSlide = sliderContainer.querySelector(".testi-item.active");
    let slideIndex = Array.from(activeSlide.parentElement.children).indexOf(activeSlide);
    
    //get all width slides
    slides.forEach((slide) =>{
        slide.style.width = slideWidth + "px"; //testi-item style = "x px"
    });
    //get width container item
    sliderContainer.style.width = slideWidth * slides.length + "px"; //testi-slider-container style = "x px"

    nextBtn.addEventListener("click", () =>{
        if(slideIndex === slides.length-1){
            slideIndex = 0;
        }else{
            slideIndex++;
        }

        slider();
    });
    prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex = slides.length-1;
        }else{
            slideIndex--;
        }

        slider();
    });

    function slider(){
        //desactive if exists slide
        sliderContainer.querySelector(".testi-item.active").classList.remove("active");
        //active new slide
        slides[slideIndex].classList.add("active");
        sliderContainer.style.marginLeft = - (slideWidth * slideIndex) + "px";
    }
    slider();

})();

/*----------------------------------HIDE ALL SECTIONS EXCEPT ACTIVE SECTION---------------------------------*/
(() =>{
    const sections = document.querySelectorAll(".section");
    sections.forEach((section)=>{
        if(!section.classList.contains("active")){
            section.classList.add("hide");
        }
    });
})();


//preloader
window.addEventListener("load", () => {
    document.querySelector(".preloader").classList.add("fade-out");
    setTimeout(() =>{
        document.querySelector(".preloader").style.display="none";
    },600)
})