export const extractHTML = (s) => {
	var span = document.createElement('span');
	span.innerHTML = s;
	return span.textContent || span.innerText;
};
