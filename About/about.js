document.querySelectorAll('.profile').forEach(profile => {
    profile.addEventListener('mouseenter', () => {
        profile.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.2)';
    });

    profile.addEventListener('mouseleave', () => {
        profile.style.boxShadow = '0 4px 10px rgba(0, 0, 0, 0.1)';
    });

    // Add click event to toggle 'open' class
    profile.addEventListener('click', () => {
        profile.classList.toggle('open');
    });
});
