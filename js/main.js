/*
  전체적인 작업 흐름
  1. 동적으로 200개의 img DOM 생성
  2. 마우스가 움직일 때, 마우스 포인터의 가로 좌표값을 200분율로 변환 
  3. 200분율 중 현재 마우스 포인터 위치 순번에 따른 이미지만 보이게끔 처리 
  4. 이미지 DOM이 생성되고, 이미지 소스가 로딩될 때마다 로딩순번을 100분율 처리 
  5. 이미지 생성 시 해당이미지에 에러 발생 시, 대체이미지 처리
  6. 이미지 소스가 모두 로딩되기 전까지는 마스크 화면으로 가려주면서 로딩상황 100분율을 출력
  7. 모든 이미지 소스 로딩 완료 시, 마스크 화면 제거 처리. 
*/

const frame = document.querySelector('figure');
const imgNum = 200;
const mask = document.querySelector('.mask');
const countEl = mask.querySelector('span');

let tags = '';

// 1단계
for (let i = 0; i < imgNum; i++) {
	tags += `<img src='img/pic${i}.jpg' />`;
}
frame.innerHTML = tags;

// 3, 4단계 (1)
// 동적으로 200개의 DOM이 막 생성된 순간
const imgs = frame.querySelectorAll('img');

// 5단계
let count = 0;
// 각 동적 생성 이미지 요소를 반복 처리
imgs.forEach((img) => {
	img.addEventListener('error', (e) => {
		// console.log('해당 이미지 로딩 실패', e);
		// 만약 특정 이미지에서 에러 발생 시(엑박), 대체 이미지 출력
		e.currentTarget.setAttribute('src', 'img/logo.png');
	});
	// 특정 이미지 렌더링 성공 시, count값 증가
	img.addEventListener('load', () => {
		console.log(count);
		// 카운트값을 다시 백분율로 변환해서 로딩화면에 출력
		countEl.innerText = parseInt((count / imgNum) * 100) + 1;
		count++;
		// 카운트갯수와 전체 이미지 갯수가 동일해지면 (모든 이미지 소스가 렌더링 완료 시)
		// 마스크 제거
		if (count === imgNum) {
			mask.remove();
		}
	});
});

// 2단계
frame.addEventListener('mousemove', (e) => {
	// const { pageX } = e;
	const pageX = e.pageX;
	// 백분율 공식 : 현재 수치 값 / 전체 수치 값 * 100;
	const percent = parseInt((pageX / window.innerWidth) * imgNum);
	// parseInt('숫자값') -> 인수로 전달된 숫자값의 소수점 아래로 버리고 정수로 반환
	// parseFloat('숫자값') -> 인수로 전달된 숫자값의 소수점까지 포함한 실수로 반환

	// 3, 4단계 (2)
	imgs.forEach((img) => (img.style.visibility = 'hidden'));
	imgs[percent].style.visibility = 'visible';
});
