window.onclick = function(event) {
    const target = event.target;
    if (target.matches('.github-buttons')) {
        window.open('https://github.com/BastienBoymond/Vostfree-Extension');
    } else if (target.matches('.resume-buttons')) {
        window.location.href = '../resume/resume.html'
    } else if (target.matches('.cookies-update')) {
        window.location.href = '../cookies/cookies.html'
    } else if (target.matches('.delete-buttons')) {
        window.location.href = '../delete/delete.html'
    } else if (target.matches('.news-buttons')) {
        window.location.href = '../news/news.html'
    }
}