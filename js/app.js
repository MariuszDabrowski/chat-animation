const chat = document.querySelector('.chat');
const textItems = document.querySelectorAll('.text__item');
const loadingBubbleLeft = document.querySelector('[data-element="loading-bubble-left"]');
const loadingBubbleLeftDots = loadingBubbleLeft.querySelectorAll('.loading-bubble__dot');
const loadingBubbleRight = document.querySelector('[data-element="loading-bubble-right"]');
const loadingBubbleRightDots = loadingBubbleRight.querySelectorAll('.loading-bubble__dot');

// ---------------
// Master timeline
// ---------------

const master = new TimelineMax();
master.add(slideChat(textItems[0], 'left'));
master.add(slideChat(textItems[1], 'right'));
master.add(slideChat(textItems[2], 'left'));
master.add(slideChat(textItems[3], 'right'));
master.add(slideChat(textItems[4], 'left'));

// --------------
// Slide timeline
// --------------

function slideChat(element, side) {
  const tl = new TimelineMax();
  const bubble = (side === 'left') ? loadingBubbleLeft : loadingBubbleRight ;
  const dots = (side === 'left') ? loadingBubbleLeftDots : loadingBubbleRightDots;
  const avatar = element.parentNode.parentNode.querySelector('.chat__item__avatar');

  tl.timeScale(1.2); // If you want to speed up or slow down the entire animation, do it here
  tl.to(bubble, 0.15, {opacity: 1});
  tl.add(userTyping(dots));
  tl.to(dots, 0.3, {opacity: 0}, '-=0.3');
  tl.to(bubble, 0.4, {y: -60, ease: Power2.easeOut}, 'move'); // If you change the Power2 ease, make sure to keep it the same across all items to keep things in sync
  tl.to(bubble, 0.3, {
    height: () => element.clientHeight,
    width: () => element.clientWidth,
    ease: Power2.easeOut,
  }, 'move');
  tl.to(chat, 0.4, {y: '+=' + -(element.clientHeight + 20), ease: Power2.easeOut}, 'move-=0.06');
  tl.to(avatar, 0.8, {scale: 1, ease: Elastic.easeOut.config(0.5, 0.3)}, 'move+=0.2');
  tl.to(element, 0.3, {opacity: 1}, 'move+=0.3');
  tl.set(bubble, {width: 'auto', height: 'auto', y: 0, opacity: 0});
  tl.set(dots, {opacity: 1});

  return tl;
}

// -------------------
// Dot bounce timeline
// -------------------

function userTyping(dots) {
  const tl = new TimelineMax({ repeat: 1 });

  tl.to(dots[0], 0.3, {y: -4}, 'up');
  tl.to(dots[0], 0.3, {y: 0}, 'down');
  tl.to(dots[1], 0.3, {y: -4}, 'up+=0.15');
  tl.to(dots[1], 0.3, {y: 0}, 'down+=0.15');
  tl.to(dots[2], 0.3, {y: -4}, 'up+=0.3');
  tl.to(dots[2], 0.3, {y: 0}, 'down+=0.3');

  return tl;
}