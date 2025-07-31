addEventListener("resize", () => {
	const mvp = document.getElementById("vp");
	if (window.innerWidth <= 480) {
		mvp.setAttribute("content", "user-scalable=no,width=480");
	} else if (mvp.attributes.getNamedItem("content")) {
		mvp.setAttribute("content", "user-scalable=no,width=device-width");
	}
});
