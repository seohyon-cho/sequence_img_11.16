const frame = document.querySelector('figure');
const mask = document.querySelector('.mask');
const countEl = mask.querySelector('span');
const imgNum = 200;

let count = 0;

createImgs(frame, imgNum, 'pic');
const imgs = frame.querySelectorAll('img');

imgs.forEach((img) => {
	img.addEventListener('error', (e) => {
		e.currentTarget.setAttribute('src', 'img/logo.png');
	});

	img.addEventListener('load', () => {
		console.log(count);
		countEl.innerText = parseInt((count / imgNum) * 100) + 1;
		count++;
		if (count === imgNum) {
			mask.remove();
		}
	});
});

frame.addEventListener('mousemove', (e) => {
	const pageX = e.pageX;
	const percent = parseInt((pageX / window.innerWidth) * imgNum);

	imgs.forEach((img) => (img.style.visibility = 'hidden'));
	imgs[percent].style.visibility = 'visible';
});

// 동적으로 이미지 생성하는 함수
function createImgs(frame, imgNum, imgName = 'pic') {
	let tags = '';

	for (let i = 0; i < imgNum; i++) {
		tags += `<img src='img/${imgName}${i}.jpg' />`;
	}
	frame.innerHTML = tags;
}
