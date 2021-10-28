window.onclick = function(event) {
    const target = event.target;
    if (target.matches('.github-buttons')) {
        window.open('https://github.com/BastienBoymond/Vostfree-Extension');
    } else if (target.matches('.resume-buttons')) {
        window.location.href = '../resume/resume.html'
    }
}