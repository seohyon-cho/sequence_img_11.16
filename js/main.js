const frame = document.querySelector('figure');
const mask = document.querySelector('.mask');
const countEl = mask.querySelector('span');
const imgNum = 200;

let count = 0;

const imgs = createImgs(frame, imgNum);
imgLoadedCheck(imgs);

frame.addEventListener('mousemove', (e) => {
	const pageX = e.pageX;
	const percent = parseInt((pageX / window.innerWidth) * imgNum);

	imgs.forEach((img) => (img.style.visibility = 'hidden'));
	imgs[percent].style.visibility = 'visible';
});

// 동적으로 이미지 생성하는 함수
// 돔 생성하자마자 바로 리턴해서 활용가능하도록 처리
function createImgs(frame, imgNum, imgName = 'pic') {
	let tags = '';
	for (let i = 0; i < imgNum; i++) tags += `<img src='img/${imgName}${i}.jpg' />`;
	frame.innerHTML = tags;
	return frame.querySelectorAll('img');
}

// 이미지 소스 로딩 유무 체크하는 함수
function imgLoadedCheck(imgs) {
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
}
