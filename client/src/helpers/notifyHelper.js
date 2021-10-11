const Swal = require("sweetalert2");

const Toast = Swal.mixin({
	toast: true,
	position: "top-end",
	showConfirmButton: false,
	timer: 2000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener("mouseenter", Swal.stopTimer);
		toast.addEventListener("mouseleave", Swal.resumeTimer);
	},
});

export const NotifyHelper = {
	success: (title) => {
		Toast.fire({
			icon: "success",
			title,
		});
	},
	warning: (title) => {
		Toast.fire({
			icon: "warning",
			title,
		});
	},
	error: (title) => {
		Toast.fire({
			icon: "error",
			title,
		});
	},
	info: (title) => {
		Toast.fire({
			icon: "info",
			title,
		});
	},
	question: (title) => {
		Toast.fire({
			icon: "question",
			title,
		});
	},
};
