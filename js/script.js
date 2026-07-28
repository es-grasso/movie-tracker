const movies = [
    {
        title: "One Battle After Another",
        monthLabel: "December 2025",
        date: "2025-12-01",
        note: "The run begins with a strong opening month and sets the cadence for the challenge.",
        director: "Paul Thomas Anderson",
        country: "United States",
        countryIcon: "🇺🇸",
        watchedAt: "Anteo City Life",
        rating: "94%",
        posterUrl: "./assets/posters/one-battle-after-another-poster.jpeg",
        posterAccent: "#f2c66d"
    },
    {
        title: "Marty Supreme",
        monthLabel: "January 2026",
        date: "2026-01-01",
        note: "January keeps the streak alive with a new year entry on the board.",
        director: "Josh Safdie",
        country: "United States",
        countryIcon: "🇺🇸",
        watchedAt: "Cinelandia",
        rating: "93%",
        posterUrl: "./assets/posters/marty-supreme-poster.jpg",
        posterAccent: "#23a094"
    },
    {
        title: "Wuthering Heights",
        monthLabel: "February 2026",
        date: "2026-02-01",
        note: "A February watch means the one-film-per-month goal is still clean and uninterrupted.",
        director: "Emerald Fennell",
        country: "United Kingdom",
        countryIcon: "🇬🇧",
        watchedAt: "Notorious Merlata",
        rating: "57%",
        posterUrl: "./assets/posters/wuthering-heights-poster.jpg",
        posterAccent: "#ff90e8"
    },
    {
        title: "Sentimental Value",
        monthLabel: "March 2026",
        date: "2026-03-01",
        note: "March extends the timeline and turns the habit into a proper rhythm.",
        director: "Joachim Trier",
        country: "Norway",
        countryIcon: "🇳🇴",
        watchedAt: "Eliseo",
        rating: "95%",
        posterUrl: "./assets/posters/sentimental-value-poster.jpg",
        posterAccent: "#fff083"
    },
    {
        title: "The Drama",
        monthLabel: "April 2026",
        date: "2026-04-01",
        note: "Another month covered, another checkpoint secured for the yearly target.",
        director: "Kristoffer Borgli",
        country: "United States",
        countryIcon: "🇺🇸",
        watchedAt: "Notorious Merlata",
        rating: "76%",
        posterUrl: "./assets/posters/the-drama-poster.jpg",
        posterAccent: "#f24e1e"
    },
    {
        title: "The Devil Wears Prada 2",
        monthLabel: "May 2026",
        date: "2026-05-01",
        note: "May keeps the streak intact and pushes the tracker deeper into the year.",
        director: "David Frankel",
        country: "United States",
        countryIcon: "🇺🇸",
        watchedAt: "Notorious Merlata",
        rating: "78%",
        posterUrl: "./assets/posters/the-devil-wears-prada-2-poster.jpeg",
        posterAccent: "#ff90e8"
    },
    {
        title: "No Good Man",
        monthLabel: "June 2026",
        date: "2026-06-01",
        note: "June closes the first seven logged months with the goal still nearly on pace.",
        director: "Shahrbanoo Sadat",
        country: "Afghanistan",
        countryIcon: "🇦🇫",
        watchedAt: "Anteo City Life",
        rating: "No score yet",
        posterUrl: "./assets/posters/no-good-men-poster.png",
        posterAccent: "#23a094"
    }
];

const startDate = new Date("2025-12-01T12:00:00");
const currentDate = new Date("2026-07-27T12:00:00");
const THEME_STORAGE_KEY = "cineTrackerTheme";

const state = {
    timelineMonths: [],
    isDragging: false,
    dragStartX: 0,
    dragStartScrollLeft: 0,
    touchStartX: 0,
    touchStartY: 0
};

const dom = {};

function canUseDesktopHover() {
    return window.innerWidth > 768;
}

document.addEventListener("DOMContentLoaded", () => {
    cacheDomElements();
    initializeTheme();

    const metrics = buildMetrics();
    state.timelineMonths = metrics.timelineMonths;

    renderSummary(metrics);
    renderDashboard(metrics);
    renderTimeline(metrics.timelineMonths);
    focusLatestTimelineState();
    setupPreviewVisibility();
    setupThemeToggle();
    setupTimelineDragging();
});

function cacheDomElements() {
    dom.goalSummary = document.getElementById("goalSummary");
    dom.moviesWatched = document.getElementById("moviesWatched");
    dom.goalPace = document.getElementById("goalPace");
    dom.currentStreak = document.getElementById("currentStreak");
    dom.statusLabel = document.getElementById("statusLabel");
    dom.statusNote = document.getElementById("statusNote");
    dom.timelineTrackWrap = document.getElementById("timelineTrackWrap");
    dom.timelineTrack = document.getElementById("timelineTrack");
    dom.previewCard = document.getElementById("previewCard");
    dom.previewBackdrop = document.getElementById("previewBackdrop");
    dom.previewClose = document.getElementById("previewClose");
    dom.previewTitle = document.getElementById("previewTitle");
    dom.previewMonth = document.getElementById("previewMonth");
    dom.previewDirector = document.getElementById("previewDirector");
    dom.previewCountry = document.getElementById("previewCountry");
    dom.previewWatchedAt = document.getElementById("previewWatchedAt");
    dom.previewRating = document.getElementById("previewRating");
    dom.previewPoster = document.getElementById("previewPoster");
    dom.previewPosterFallback = document.getElementById("previewPosterFallback");
    dom.previewPosterMonogram = document.getElementById("previewPosterMonogram");
    dom.themeToggle = document.getElementById("themeToggle");
}

function buildMetrics() {
    const monthsElapsed = monthDiffInclusive(startDate, currentDate);
    const watchedCount = movies.length;
    const difference = watchedCount - monthsElapsed;
    const pace = Math.round((watchedCount / monthsElapsed) * 100);
    const streak = computeCurrentStreak();
    const status = buildStatus(difference);

    return {
        monthsElapsed,
        watchedCount,
        difference,
        pace,
        streak,
        status,
        timelineMonths: buildTimelineMonths(monthsElapsed)
    };
}

function buildStatus(difference) {
    if (difference >= 0) {
        return {
            label: "On track",
            note: "You have matched or exceeded the one-movie-per-month goal.",
            summary: "Your cinema habit is right on schedule."
        };
    }

    return {
        label: "Just behind",
        note: `You are ${Math.abs(difference)} month${Math.abs(difference) === 1 ? "" : "s"} behind the goal as of July 2026.`,
        summary: "One more cinema visit will bring the target back into balance."
    };
}

function buildTimelineMonths(monthsElapsed) {
    return Array.from({ length: monthsElapsed }, (_, index) => {
        const monthDate = new Date(startDate);
        monthDate.setMonth(startDate.getMonth() + index);

        return {
            id: `timeline-${index}`,
            monthLabel: formatMonth(monthDate, "long"),
            monthName: monthDate.toLocaleString("en-US", { month: "long" }),
            yearLabel: monthDate.toLocaleString("en-US", { year: "numeric" }),
            showYearMarker: index === 0 || monthDate.getMonth() === 0,
            movie: movies[index] || null
        };
    });
}

function renderSummary(metrics) {
    dom.goalSummary.innerHTML = `
        <p class="summary-kicker">Goal check</p>
        <strong class="summary-value">${metrics.watchedCount} / ${metrics.monthsElapsed}</strong>
        <p class="summary-copy">7 Movies in 8 Months</p>
    `;
}

function renderDashboard(metrics) {
    if (!dom.moviesWatched) {
        return;
    }

    dom.moviesWatched.textContent = String(metrics.watchedCount);
    dom.goalPace.textContent = `${metrics.pace}%`;
    dom.currentStreak.textContent = `${metrics.streak} months`;
    dom.statusLabel.textContent = metrics.status.label;
    dom.statusNote.textContent = metrics.status.note;
}

function renderTimeline(timelineMonths) {
    const fragment = document.createDocumentFragment();

    timelineMonths.forEach((entry, index) => {
        fragment.appendChild(createTimelineItem(entry, index));
    });

    dom.timelineTrack.innerHTML = "";
    dom.timelineTrack.appendChild(fragment);
    hidePreviewCard();
}

function focusLatestTimelineState() {
    if (!dom.timelineTrackWrap) {
        return;
    }

    const scrollToLatest = () => {
        dom.timelineTrackWrap.scrollLeft = dom.timelineTrackWrap.scrollWidth;
    };

    requestAnimationFrame(() => {
        scrollToLatest();
        requestAnimationFrame(scrollToLatest);
    });
}

function createTimelineItem(entry, index) {
    const item = document.createElement("article");
    item.className = `timeline-item${entry.movie ? "" : " is-missed"}`;
    item.setAttribute("role", "listitem");
    item.dataset.index = String(index);
    const accentClass = entry.movie ? ` accent-${(index % 3) + 1}` : "";

    const button = document.createElement("button");
    button.className = "timeline-button";
    button.type = "button";
    button.setAttribute("aria-label", `${entry.monthLabel}: ${entry.movie ? entry.movie.title : "No movie logged"}`);
    button.innerHTML = `
        <p class="timeline-year-marker${entry.showYearMarker ? "" : " is-hidden"}">${entry.yearLabel}</p>
        <span class="timeline-anchor" aria-hidden="true">
            <span class="timeline-dot"></span>
        </span>
        <p class="timeline-month">${entry.monthName}</p>
        <div class="timeline-card${accentClass}">
            <h4 class="timeline-title">${entry.movie ? entry.movie.title : "No movie logged"}</h4>
        </div>
    `;

    attachTimelineItemEvents(button, item, index);
    item.appendChild(button);

    return item;
}
function attachTimelineItemEvents(button, item, index) {
    const handlePreviewInteraction = () => {
        if (!state.timelineMonths[index]?.movie) {
            hidePreviewCard();
            clearActiveTimelineItems();
            return;
        }

        showPreviewCard();
        setActiveTimelineItem(index);
        positionPreviewCard(item);
    };

    button.addEventListener("mouseenter", () => {
        if (!canUseDesktopHover()) {
            return;
        }

        handlePreviewInteraction();
    });

    button.addEventListener("pointerenter", (event) => {
        if (!canUseDesktopHover() || event.pointerType !== "mouse") {
            return;
        }

        handlePreviewInteraction();
    });

    button.addEventListener("focus", () => {
        if (!canUseDesktopHover()) {
            return;
        }

        handlePreviewInteraction();
    });

    button.addEventListener("click", (event) => {
        if (!canUseDesktopHover()) {
            return;
        }

        event.preventDefault();
        handlePreviewInteraction();
    });
}

function setActiveTimelineItem(index) {
    getTimelineItems().forEach((item, itemIndex) => {
        item.classList.toggle("is-active", itemIndex === index);
    });

    updatePreviewContent(state.timelineMonths[index]);
}

function updatePreviewContent(entry) {
    const movie = entry.movie;

    dom.previewTitle.textContent = movie ? movie.title : "No movie logged";
    dom.previewMonth.textContent = entry.monthLabel;
    dom.previewDirector.textContent = movie?.director || "-";
    dom.previewCountry.textContent = movie ? `${movie.countryIcon} ${movie.country}` : "-";
    dom.previewWatchedAt.textContent = movie?.watchedAt || "-";
    dom.previewCountry.setAttribute("aria-label", movie?.country || "Unknown country");
    dom.previewCountry.title = movie?.country || "Unknown country";
    dom.previewRating.textContent = movie?.rating || "-";

    if (movie?.posterUrl) {
        dom.previewPoster.src = movie.posterUrl;
        dom.previewPoster.alt = `${movie.title} poster`;
        dom.previewPoster.hidden = false;
        dom.previewPosterFallback.hidden = true;
        return;
    }

    dom.previewPoster.removeAttribute("src");
    dom.previewPoster.alt = "";
    dom.previewPoster.hidden = true;
    dom.previewPosterFallback.hidden = false;
    dom.previewPosterFallback.style.background = movie?.posterAccent || "var(--color-surface-muted)";
    dom.previewPosterMonogram.textContent = createMonogram(movie?.title || entry.monthLabel);
}

function computeCurrentStreak() {
    let streak = 0;

    for (let index = 0; index < movies.length; index += 1) {
        const expectedDate = new Date(startDate);
        expectedDate.setMonth(startDate.getMonth() + index);

        const movieDate = new Date(`${movies[index].date}T12:00:00`);
        if (
            movieDate.getFullYear() === expectedDate.getFullYear() &&
            movieDate.getMonth() === expectedDate.getMonth()
        ) {
            streak += 1;
            continue;
        }

        break;
    }

    return streak;
}

function monthDiffInclusive(from, to) {
    return (to.getFullYear() - from.getFullYear()) * 12 + (to.getMonth() - from.getMonth()) + 1;
}

function formatMonth(date, month) {
    return date.toLocaleString("en-US", { month, year: month === "long" ? "numeric" : undefined }).trim();
}

function createMonogram(value) {
    return value
        .split(" ")
        .filter(Boolean)
        .slice(0, 2)
        .map((word) => word[0])
        .join("")
        .toUpperCase();
}

function setupPreviewVisibility() {
    dom.timelineTrackWrap.addEventListener("mouseleave", () => {
        if (!canUseDesktopHover()) {
            return;
        }
        hidePreviewCard();
        clearActiveTimelineItems();
    });

    dom.timelineTrackWrap.addEventListener("focusout", (event) => {
        if (!canUseDesktopHover()) {
            return;
        }
        if (!dom.timelineTrackWrap.contains(event.relatedTarget)) {
            hidePreviewCard();
            clearActiveTimelineItems();
        }
    });

    dom.previewBackdrop.addEventListener("click", () => {
        hidePreviewCard();
        clearActiveTimelineItems();
    });

    dom.previewClose.addEventListener("click", () => {
        hidePreviewCard();
        clearActiveTimelineItems();
    });
}

function clearActiveTimelineItems() {
    getTimelineItems().forEach((item) => {
        item.classList.remove("is-active");
    });
}

function getTimelineItems() {
    return dom.timelineTrack.querySelectorAll(".timeline-item");
}

function showPreviewCard() {
    dom.previewCard.classList.remove("is-hidden");
    if (window.innerWidth <= 768) {
        dom.previewBackdrop.classList.remove("is-hidden");
    }
}

function hidePreviewCard() {
    dom.previewCard.classList.add("is-hidden");
    dom.previewBackdrop.classList.add("is-hidden");
    dom.previewCard.classList.remove("is-flipped");
}

function positionPreviewCard(item) {
    if (window.innerWidth <= 768) {
        dom.previewCard.style.removeProperty("left");
        dom.previewCard.style.removeProperty("top");
        dom.previewCard.classList.remove("is-flipped");
        return;
    }

    const trackComponent = item.closest(".timeline-track-component");
    const cardRect = item.querySelector(".timeline-card").getBoundingClientRect();
    const componentRect = trackComponent.getBoundingClientRect();
    const previewWidth = dom.previewCard.offsetWidth || 620;
    const previewHeight = dom.previewCard.offsetHeight || 0;
    const horizontalOffset = 20;
    const verticalOffset = 18;
    const viewportPadding = 24;

    let left = cardRect.right - componentRect.left + horizontalOffset;
    const maxLeft = Math.min(
        componentRect.width - previewWidth - 12,
        window.innerWidth - previewWidth - viewportPadding - componentRect.left
    );
    if (left > maxLeft) {
        left = cardRect.left - componentRect.left - previewWidth - horizontalOffset;
    }
    left = Math.max(viewportPadding - componentRect.left, left);

    const spaceBelow = window.innerHeight - cardRect.bottom - viewportPadding;
    const spaceAbove = cardRect.top - viewportPadding;
    const shouldFlipUp = previewHeight > spaceBelow && spaceAbove > spaceBelow;

    let top;
    if (shouldFlipUp) {
        const preferredViewportTop = cardRect.top - previewHeight - verticalOffset;
        const clampedViewportTop = Math.max(
            viewportPadding,
            Math.min(preferredViewportTop, window.innerHeight - previewHeight - viewportPadding)
        );
        top = clampedViewportTop - componentRect.top;
        dom.previewCard.classList.add("is-flipped");
    } else {
        const preferredViewportTop = cardRect.bottom + verticalOffset;
        const clampedViewportTop = Math.min(
            Math.max(viewportPadding, preferredViewportTop),
            Math.max(viewportPadding, window.innerHeight - previewHeight - viewportPadding)
        );
        top = clampedViewportTop - componentRect.top;
        dom.previewCard.classList.remove("is-flipped");
    }

    if (previewHeight > 0) {
        const maxTop = componentRect.height - previewHeight - 12;
        top = Math.min(top, Math.max(12, maxTop));
    }

    dom.previewCard.style.left = `${Math.max(12, left)}px`;
    dom.previewCard.style.top = `${top}px`;
}

function initializeTheme() {
    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    document.body.classList.toggle("theme-dark", storedTheme === "dark");
}

function setupThemeToggle() {
    updateThemeToggleLabel();

    dom.themeToggle.addEventListener("change", () => {
        document.body.classList.toggle("theme-dark", !dom.themeToggle.checked);
        localStorage.setItem(THEME_STORAGE_KEY, document.body.classList.contains("theme-dark") ? "dark" : "light");
        updateThemeToggleLabel();
    });
}

window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
        dom.previewBackdrop.classList.add("is-hidden");
    }
});

function updateThemeToggleLabel() {
    const isDark = document.body.classList.contains("theme-dark");
    dom.themeToggle.checked = !isDark;
    dom.themeToggle.setAttribute("aria-label", isDark ? "Switch to light mode" : "Switch to dark mode");
}

function setupTimelineDragging() {
    setupTimelineTouchDelegation();
    dom.timelineTrackWrap.addEventListener("pointerdown", handlePointerDown);
    dom.timelineTrackWrap.addEventListener("pointermove", handlePointerMove);
    dom.timelineTrackWrap.addEventListener("pointerup", handlePointerRelease);
    dom.timelineTrackWrap.addEventListener("pointercancel", handlePointerRelease);
    dom.timelineTrackWrap.addEventListener("pointerleave", () => {
        if (state.isDragging) {
            endDragging();
        }
    });
}

function setupTimelineTouchDelegation() {
    dom.timelineTrackWrap.addEventListener("touchstart", (event) => {
        if (window.innerWidth > 768 || event.touches.length === 0) {
            return;
        }

        state.touchStartX = event.touches[0].clientX;
        state.touchStartY = event.touches[0].clientY;
    }, { passive: true });

    dom.timelineTrackWrap.addEventListener("touchend", (event) => {
        if (window.innerWidth > 768 || event.changedTouches.length === 0) {
            return;
        }

        const endX = event.changedTouches[0].clientX;
        const endY = event.changedTouches[0].clientY;
        const diffX = Math.abs(endX - state.touchStartX);
        const diffY = Math.abs(endY - state.touchStartY);

        if (diffX >= 10 || diffY >= 10) {
            return;
        }

        const card = event.target.closest(".timeline-card");
        if (!card) {
            return;
        }

        const item = card.closest(".timeline-item");
        if (!item || item.classList.contains("is-missed")) {
            return;
        }

        const index = Number(item.dataset.index);
        if (Number.isNaN(index)) {
            return;
        }

        event.preventDefault();
        console.log("Mobile Tap Detected:", card);
        showPreviewCard();
        setActiveTimelineItem(index);
        positionPreviewCard(item);
    }, { passive: false });

    dom.timelineTrackWrap.addEventListener("click", (event) => {
        if (!canUseDesktopHover()) {
            return;
        }

        const card = event.target.closest(".timeline-card");
        if (!card) {
            return;
        }

        const item = card.closest(".timeline-item");
        if (!item || item.classList.contains("is-missed")) {
            return;
        }

        const index = Number(item.dataset.index);
        if (Number.isNaN(index)) {
            return;
        }

        showPreviewCard();
        setActiveTimelineItem(index);
        positionPreviewCard(item);
    });
}

function handlePointerDown(event) {
    if (window.innerWidth <= 768 && event.target.closest(".timeline-button")) {
        return;
    }

    state.isDragging = true;
    state.dragStartX = event.clientX;
    state.dragStartScrollLeft = dom.timelineTrackWrap.scrollLeft;
    dom.timelineTrackWrap.classList.add("is-dragging");
    dom.timelineTrackWrap.setPointerCapture(event.pointerId);
}

function handlePointerMove(event) {
    if (!state.isDragging) {
        return;
    }

    dom.timelineTrackWrap.scrollLeft = state.dragStartScrollLeft - (event.clientX - state.dragStartX);
}

function handlePointerRelease(event) {
    if (!state.isDragging) {
        return;
    }

    endDragging();
    if (dom.timelineTrackWrap.hasPointerCapture(event.pointerId)) {
        dom.timelineTrackWrap.releasePointerCapture(event.pointerId);
    }
}

function endDragging() {
    state.isDragging = false;
    dom.timelineTrackWrap.classList.remove("is-dragging");
}
