
const profilepic = document.getElementById('pop-pic');

window.addEventListener('DOMContentLoaded', function(){

    setTimeout(function(){
        profilepic.classList.add('pop');
    },200);
});

// profilePic.addEventListener('mouseenter', function() {
//     profilePic.style.transform = 'scale(1.1)';
//   });
  
//   profilePic.addEventListener('mouseleave', function() {
//     profilePic.style.transform = 'scale(1)';
//   });


  
  window.addEventListener('scroll', function () {
    const coverBox = document.getElementById('cover-box');

    if (window.scrollY > 140) {
      coverBox.classList.add('header-hidden');
    } else {
      coverBox.classList.remove('header-hidden');
    }
  });

  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, {
    threshold: 0.2
  });
  
  const elements = document.querySelectorAll('.slide-in-left ,.slide-in-right');
  
    elements.forEach(function(el) {
    observer.observe(el); 
  });

  document.querySelectorAll('.pop-in').forEach(function (el) {
    observer.observe(el);
  });


  const swiper = new Swiper('.mySwiper', {
    slidesPerView: 1,
    spaceBetween: 20,
    loop: true,
    centeredSlides: true,
    grabCursor: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      }
    }
  });
