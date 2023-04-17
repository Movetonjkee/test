// // Import vendor jQuery plugin example

document.addEventListener('DOMContentLoaded', () => {
  const popupLinks = document.querySelectorAll('.popup-link');
  const body = document.querySelector('body');
  const lockPadding = document.querySelectorAll('.lock-padding');

  let unlock = true;

  const timeout = 800;

  if (popupLinks.length > 0) {
    for (let index = 0; index < popupLinks.length; index++) {
      const popupLink = popupLinks[index];
      popupLink.addEventListener('click', function (e) {
        const popupName = popupLink.getAttribute('href').replace('#', '');
        const curentPopup = document.getElementById(popupName);
        popupOpen(curentPopup);
        e.preventDefault();
      });
    }
  }
  const popupCloseIcon = document.querySelectorAll('.close-popup');
  if (popupCloseIcon.length > 0) {
    for (let index = 0; index < popupCloseIcon.length; index++) {
      const el = popupCloseIcon[index];
      el.addEventListener('click', function (e) {
        popupClose(el.closest('.popup'));
        e.preventDefault();
      });
    }
  }

  function popupOpen(curentPopup) {
    if (curentPopup && unlock) {
      const popupActive = document.querySelector('.popup.open');
      if (popupActive) {
        popupClose(popupActive, false);
      } else {
        bodyLock();
      }
      curentPopup.classList.add('open');
      curentPopup.addEventListener('click', function (e) {
        if (!e.target.closest('.popup__content')) {
          popupClose(e.target.closest('.popup'));
        }
      });
    }
  }

  function popupClose(popupActive, doUnlock = true) {
    if (unlock) {
      popupActive.classList.remove('open');
      if (doUnlock) {
        bodyUnLock();
      }
    }
  }

  function bodyLock() {
    const lockPaddingValue =
      window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

    if (lockPadding.length > 0) {
      for (let index = 0; index < lockPadding.length; index++) {
        const el = lockPadding[index];
        el.style.paddingRight = lockPaddingValue;
      }
    }
    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  function bodyUnLock() {
    setTimeout(function () {
      if (lockPadding.length > 0) {
        for (let index = 0; index < lockPadding.length; index++) {
          const el = lockPadding[index];
          el.style.paddingRight = '0px';
        }
      }
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout);

    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, timeout);
  }

  document.addEventListener('keydown', function (e) {
    if (e.which === 27) {
      const popupActive = document.querySelector('.popup.open');
      popupClose(popupActive);
    }
  });

  (function () {
    // проверяем поддержку
    if (!Element.prototype.closest) {
      // реализуем
      Element.prototype.closest = function (css) {
        var node = this;
        while (node) {
          if (node.matches(css)) return node;
          else node = node.parentElement;
        }
        return null;
      };
    }
  })();
  (function () {
    // проверяем поддержку
    if (!Element.prototype.matches) {
      // определяем свойство
      Element.prototype.matches =
        Element.prototype.matchesSelector ||
        Element.prototype.webkitMatchesSelector ||
        Element.prototype.mozMatchesSelector ||
        Element.prototype.msMatchesSelector;
    }
  })();

  //SLIDER

  var swiper = new Swiper('.gallery-slider', {
    slidesPerView: 1.1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.gallery-slider .swiper-button-next',
      prevEl: '.gallery-slider .swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1.5,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      992: {
        slidesPerView: 3.5,
        spaceBetween: 30,
      },
      1440: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  var swiper2 = new Swiper('.cards-slider', {
    slidesPerView: 1.1,
    spaceBetween: 24,
    navigation: {
      nextEl: '.cards-slider .swiper-button-next',
      prevEl: '.cards-slider .swiper-button-prev',
    },
    breakpoints: {
      576: {
        slidesPerView: 2,
        spaceBetween: 24,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 24,
      },
    },
  });

  let selector = document.querySelectorAll('input[type="tel"]');
  let im = new Inputmask('+7 (999) 999-99-99');
  im.mask(selector);

  let selector2 = document.querySelector('input[type="tel"]');

  selector2.addEventListener('input', function () {
    console.log(selector2.value);

    const re = /^\d*(\.\d+)?$/;
  });

  let validateForms = function (selector, rules, successModal, yaGoal) {
    new window.JustValidate(selector, {
      rules: rules,
      submitHandler: function (form) {
        let formData = new FormData(form);

        let xhr = new XMLHttpRequest();

        xhr.onreadystatechange = function () {
          if (xhr.readyState === 4) {
            if (xhr.status === 200) {
              console.log('Отправлено');
            }
          }
        };

        xhr.open('POST', 'mail.php', true);
        xhr.send(formData);

        form.reset();
      },
    });
  };

  validateForms(
    '.form',
    {
      email: { required: true, email: true },
      tel: { required: true },
    },
    '.thanks-popup',
    'send goal',
  );
});
