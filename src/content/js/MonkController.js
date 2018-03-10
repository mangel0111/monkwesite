'use strict';
const vm = this;

vm.index = 1;
vm.timeConsumed = 0;
const sliders = [
	{ index: 0, withToMove: 0 },
	{ index: 1, withToMove: -1000 },
	{ index: 2, withToMove: -1720 },
	{ index: 3, withToMove: -2800 },
	{ index: 4, withToMove: -3850 },
	{ index: 5, withToMove: -4910 },
	{ index: 6, withToMove: -6020 },
	{ index: 7, withToMove: -7560 },
	{ index: 8, withToMove: -7560 },
	{ index: 9, withToMove: -8680 }
];

const init = () => {
	MoveSlider(0);
	document.getElementById('slider').style.visibility = 'hidden';
	presentation();
};

const presentation = () => {
	// Mock the delay to display the presentation
	const delay = 700; //less than a second
	let timeConsumed = 0;
	document.getElementById('counter').innerHTML = timeConsumed;

	const mockTheDelay = () => {
		return new Promise((resolve) => {
			let wait = setTimeout(() => {
				timeConsumed += 20;
				document.getElementById('counter').innerHTML = timeConsumed;
				resolve(timeConsumed);
			}, delay);
			return wait;
		});
	};
	
	mockTheDelay().then(()=> {
		mockTheDelay().then(()=> {
			mockTheDelay().then(()=> {
				mockTheDelay().then(()=> {
					mockTheDelay().then(()=> {
						mockTheDelay().then(()=> {
							document.getElementById('timeOut').className = 'dont-show';
							document.getElementById('slider').style.visibility = 'visible';
						});
					});
				});
			});
		});
	});
};


const paintSubItem = ({ color, index }) => {
	const slide = document.getElementById(`slide-index-${index}`);
	if(slide.children) {
		slide.children[0].style.background = color;
	}
};

const paintSelectedIndex = (index) => {
	Array.from(Array(10).keys()).map(item => {
		paintSubItem({ index: item, color: 'transparent' });
	});
	paintSubItem({ index, color: '#e9e5e5' });
};

const MoveSlider =  (index) => {
	vm.index = index;
	
	const indexText = document.getElementById('indexText');
	indexText.innerHTML = '';
	indexText.className = '';

	paintSelectedIndex(index);

	const slide = sliders.find(slide => slide.index === index);
	document.getElementById('slider').style.backgroundPosition = `${slide.withToMove}px 0px`;
	
	new Promise(() => {
		setTimeout(() => {
			replaceTheIndexText(index);
		}, 1000);
	});
};

const replaceTheIndexText = (index) => {
	for (let i = 0; i < 10 ; i++) {
		var element = document.getElementById('slide' + i);
		if (i === index) {
			let effect = 'fadeIn';
			if (i === 9) {
				effect = ' moving3';
			} 
			element.className = `showSlide${i} ${effect}`;
		} else {
			element.className = 'dont-show';
		}
	}
	handleTextArrows(index);
};

const handleTextArrows = (index) => {
	const arrowLeft = document.getElementById('leftArrow');
	const arrowRight = document.getElementById('rightArrow');
	if (index > 0 && index < 9) {
		const text = `Step ${index} out of 8 on the path to digital enlightenment`;
		const indexText = document.getElementById('indexText');
		indexText.innerHTML = text;
		indexText.className = 'fadeIn';
		arrowLeft.className = 'arrows';
		arrowRight.className = 'arrows';
	} else if (index === 0) {
		arrowLeft.className = 'dont-show';
		arrowRight.className = 'arrows';
	} else if (index === 9) {
		arrowRight.className = 'dont-show';
		arrowLeft.className = 'arrows';
	}
};

const moveBackground =  (direction) => {
	if (direction === 'left') {
		vm.index--;
	} else {
		vm.index++;
	}
	MoveSlider(vm.index);
};

const GoToMedia = (media) => {
	let link = 'https://www.mediamonks.com/';
	switch(media){
	case 'twitter': 
		link = 'https://twitter.com/mediamonks/';
		break;
	case 'facebook': 
		link = 'https://www.facebook.com/mediamonks';
		break;
	case 'careers': 
		link = 'https://www.mediamonks.com/careers/';
		break;
	case 'mediaMonk':
	default:
		break;
	}
	window.open(link);
};

// Init
init();
