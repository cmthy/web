document.addEventListener("DOMContentLoaded", () => {
    const items = document.querySelectorAll(".drag-item");
    let dragCount = 0;
    const totalItems = items.length;

    items.forEach((img, index) => {
        let isDragging = false;
        let offsetX = 0, offsetY = 0;

        const id = index + 1;
        const textBefore = document.getElementById(`text-tree-${(id - 2) * 2 + 1}`);
        const textAfter = document.getElementById(`text-tree-${(id - 1) * 2 + 1}`);
        const nextImg = document.getElementById(`img-tree-${(id - 1) + 1}`);

        img.addEventListener("mousedown", (e) => {
            isDragging = true;
            offsetX = e.clientX - img.offsetLeft;
            offsetY = e.clientY - img.offsetTop;
            img.style.cursor = "grabbing";

            img.style.display = "none";
            if (textBefore) textBefore.style.display = "none";
        });

        document.addEventListener("mouseup", () => {
            if (isDragging) {
                isDragging = false;
                img.style.cursor = "grab";

                if (textAfter) textAfter.style.display = "block";
                if (nextImg) nextImg.style.display = "none";
                dragCount++;

                if (dragCount === totalItems) {
                    setTimeout(() => {
                        if (textAfter) textAfter.style.display = "none";
                        const instruction = document.getElementById("instruction");
                        if (instruction) instruction.style.display = "none";
                        const instruction2 = document.getElementById("instruction2");
                        if (instruction2) instruction2.style.display = "block";
                        const nexttext1 = document.getElementById("nexttext1");
                        if (nexttext1) nexttext1.style.display = "block";
                    }, 500);
                }
            }
        });
    });

    const nexttext1 = document.getElementById("nexttext1");
    if (nexttext1) {
        nexttext1.addEventListener("click", () => {
            nexttext1.style.display = "none";
            const nexttext2 = document.getElementById("nexttext2");
            if (nexttext2) nexttext2.style.display = "block";
        });
    }

    const nexttext2 = document.getElementById("nexttext2");
    if (nexttext2) {
        nexttext2.addEventListener("click", () => {
            const scene5 = document.getElementById("scene-5");
            if (scene5) {
                scene5.scrollIntoView({
                    behavior: "smooth",  
                    block: "center"       
                });
            }
        });
    }
});


window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const scene78 = document.getElementById('scene-7-8');
    const scene7Top = scene78.offsetTop;
    const sceneHeight = window.innerHeight;

    // Chỉ chạy hiệu ứng khi scrollY nằm trong vùng scene-7 đến scene-8
    if (scrollY >= scene7Top && scrollY <= scene7Top + sceneHeight * 2) {
        const relativeScroll = scrollY - scene7Top;

        const waterUp = document.getElementById('water-up');
        const startY = 550;
        const endY = 80;
        const moveRatio = Math.min(relativeScroll / (sceneHeight * 1), 1); // max 1
        const newTop = startY - (startY - endY) * moveRatio;
        waterUp.style.top = `${newTop}px`;

        // text move & fade
        const text1 = document.querySelector('.text-1');
        const text2 = document.querySelector('.text-2');
        const textTranslate = relativeScroll * 1;
        const opacity = Math.max(1 - relativeScroll / (sceneHeight * 0.5), 0.5);
        text1.style.transform = `translateY(${textTranslate}px)`;
        text2.style.transform = `translateY(${textTranslate}px)`;
        text1.style.opacity = opacity;
        text2.style.opacity = opacity;
        const stoneLayers = document.querySelectorAll('.stone-2');
        stoneLayers.forEach(layer => {
            layer.style.transform = `translateY(${relativeScroll * 2}px)`;
            layer.style.zIndex = 0; // nằm dưới scene-8
        });
    }
});

const speaker = document.getElementById("speaker");
const soundIcon = document.getElementById("sound");
const audio = document.getElementById("intro-audio");

let isPlaying = false;
// Đảm bảo icon sound ẩn khi load
window.addEventListener("DOMContentLoaded", () => {
  soundIcon.style.transform = "translateX(-25px)";
  soundIcon.style.opacity = "0";
});

speaker.addEventListener("click", () => {
  if (isPlaying) {
    audio.pause();
    // Ẩn icon sound
    soundIcon.style.transform = "translateX(-25px)";
    soundIcon.style.opacity = "0";
  } else {
    audio.play();
    // Hiện icon sound
    soundIcon.style.transform = "translateX(0)";
    soundIcon.style.opacity = "1";
  }
  isPlaying = !isPlaying;
});
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  if (currentScrollY > lastScrollY && currentScrollY > 50) {
    // Cuộn xuống
    speaker.classList.add("shrink");
  } else if (currentScrollY < lastScrollY) {
    // Cuộn lên
    speaker.classList.remove("shrink");
  }

  lastScrollY = currentScrollY;
});


const scrollEl = document.getElementById('lyricsScroll');
const lines = scrollEl.querySelectorAll('.lyrics-line');
let currentIndex = 0;

function scrollLyrics() {
    if (currentIndex >= lines.length) {
        currentIndex = 0; 
        scrollEl.scrollTo({ top: 0, behavior: 'smooth' }); 
    }


    const line = lines[currentIndex];
    const offset = line.offsetTop - scrollEl.clientHeight / 2 + line.clientHeight / 2;

    scrollEl.scrollTo({
        top: offset,
        behavior: 'smooth'
    });

    lines.forEach(l => l.classList.remove('highlight'));
    line.classList.add('highlight');

    currentIndex++;
    setTimeout(scrollLyrics, 2000); 
}
scrollLyrics();
