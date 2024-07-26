// Create button element
const btnChars = ['all', 'bag', 'shoe', 'watch', 'camera', 'headphone'];

const btnsWrapper = document.querySelector('.filter-btns');

btnChars.map(function (btnChar) {
  const modifiedChar = btnChar.charAt().toUpperCase() + btnChar.slice(1);
  // charAt(): 파라미터 인덱스에 해당하는 문자 선택
  // toUpperCase() : 대문자로 변환
  // toLowerCase() : 소문자로 변환
  // slice(): 문자열을 추출 - 파라미터 인덱스부터 추출

  const btnElement = `<button class="filter-btn" data-filter="${btnChar}"> ${modifiedChar}</button>`;
  btnsWrapper.insertAdjacentHTML('beforeend', btnElement);
});

// First Button add active class
const btns = document.querySelectorAll('.filter-btn');
// console.log(firstBtn);
btns[0].classList.add('active');

// btns.map((btn) => {
//   const filterWrapper = document.querySelector('.filter-btns');
//   const filterList = `
//     <button>${btn}</button>
//   `;
//   filterWrapper.insertAdjacentHTML('beforeend', filterList);
// });

// Create images element
const images = [
  'bag-1.jpg',
  'camera-1.jpg',
  'camera-2.jpg',
  'headphone-1.jpg',
  'headphone-2.jpg',
  'shoe-1.jpg',
  'shoe-2.jpg',
  'watch-1.jpg',
];

const imagesWrapper = document.querySelector('.filter-images');

images.map(function (image) {
  // console.log(image.split('-')[0]); // [shoe, 1.pgg]
  const imageElement = `
  <div class="filter-image" data-filter="${image.split('-')[0]}">
    <span><img src="images/${image}" alt="" /></span>
  </div>
  `;
  // console.log(imageElement);
  imagesWrapper.insertAdjacentHTML('beforeend', imageElement);
});

const imageElements = document.querySelectorAll('.filter-image');
// console.log(imageElements);

// Filter images
function activateFilter() {
  btns.forEach((btn) => {
    btn.classList.remove('active');
  });
  this.classList.add('active');

  const selectedBtn = this.getAttribute('data-filter');

  // map, filter, reduce 함수는 DOM 요소에 사용할 수 없다. Array.from() 사용하여 배열로 변환
  Array.from(imageElements).filter((imageElement) => {
    imageElement.classList.add('hide');
    // imageElement.classList.remove('show');
    setTimeout(() => {
      if (
        imageElement.getAttribute('data-filter') === selectedBtn ||
        selectedBtn === 'all'
      ) {
        imageElement.classList.remove('hide');
        imageElement.classList.add('show');
      } else {
        imageElement.classList.add('hide');
        imageElement.classList.remove('show');
      }
    }, 100); // setTimeout() : 시간 지연 함수(promise)
    // 첫 번째 parameter = callback function,
    // 두 번째 parameter = 시간(밀리초)
  });
}

btns.forEach(function (btn) {
  btn.addEventListener('click', activateFilter);
});

// activate light box when click each image
const lightBox = document.querySelector('.light-box');
const overlay = document.querySelector('.overlay');

const showLightBox = (e) => {
  // console.log(e.currentTarget); => currentTaget 찾는 방법 (콘솔.log, 콘솔.dir)
  const target = e.currentTarget;
  // console.dir(target.children[0].children[0].getAttribute('src')); 경로
  const selectedImage = target.children[0].children[0].getAttribute('src');
  const categoryName = target.getAttribute('data-filter');
  console.log(categoryName);
  const lightBoxImage = document.querySelector('.light-box-image img');
  const categoryElement = document.querySelector('.title p');

  // getAttribute(): 파라미터 속성 값 가져오기
  // setAttribute(a, b): a: 속성 이름, b: 변경할 속성 값
  // a.textCotent = b: a 요소에 b 텍스트 입력
  // categoryElement.textContent = categoryName

  lightBoxImage.setAttribute('src', selectedImage);
  categoryElement.textContent = categoryName;

  lightBox.style.display = 'block';
  overlay.style.display = 'block';
};

imageElements.forEach((imageElement) => {
  imageElement.addEventListener('click', showLightBox);
});

// close light box
const closeBtn = document.querySelector('.close');

const closeLightBox = () => {
  lightBox.style.display = 'none';
  overlay.style.display = 'none';
};

// closeBtn.addEventListener('click', closeLightBox);
// overlay.addEventListener('click', closeLightBox);

[closeBtn, overlay].forEach((element) =>
  element.addEventListener('click', closeLightBox)
);
