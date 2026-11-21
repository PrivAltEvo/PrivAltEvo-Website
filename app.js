document.addEventListener("DOMContentLoaded", () => {
    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#&*";
    const titleElement = document.getElementById("decrypt-title");
    const fadeElements = document.querySelectorAll(".fade-in-element");

    // Date automatique dans la manchette du journal
    const mastheadDateEl = document.getElementById("newspaper-current-date");
    if (mastheadDateEl) {
        const formattedDate = new Date().toLocaleDateString("fr-FR", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric"
        }).toUpperCase();
        mastheadDateEl.innerText = formattedDate;
    }

    // Icônes vectorielles dédiées aux vignettes d'articles
    const articleThumbIcons = {
        tests: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>`,
        outils: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>`,
        edc: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>`,
        tech: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`,
        societe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
        actualites: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><line x1="10" y1="8" x2="18" y2="8"/><line x1="10" y1="12" x2="18" y2="12"/><line x1="10" y1="16" x2="14" y2="16"/></svg>`
    };

    // 0. BASE DE DONNÉES DES ARTICLES DU BLOG (alimentée dynamiquement depuis Pages CMS / GitHub)
    const blogArticles = [];

    function buildThumbnailMarkup(article, showBadge = true) {
        const badgeHTML = showBadge ? `<span class="thumb-badge-overlay">${article.categoryLabel}</span>` : "";
        if (article.image) {
            return `
                ${badgeHTML}
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            `;
        }
        const svgIcon = articleThumbIcons[article.icon] || articleThumbIcons.actualites;
        return `
            ${badgeHTML}
            <div class="thumb-cover-artwork cover-theme-${article.category}">
                <div class="thumb-grid-pattern"></div>
                <div class="thumb-orb"></div>
                <div class="thumb-icon-ring">${svgIcon}</div>
            </div>
        `;
    }

    // 1. DÉCHIFFREMENT DU TITRE HERO
    function triggerDecryptAnimation() {
        if (!titleElement) return;
        let iterations = 0;
        const originalValue = titleElement.dataset.value;
        fadeElements.forEach(el => el.classList.remove("visible"));

        const interval = setInterval(() => {
            titleElement.innerText = originalValue.split("")
                .map((letter, index) => {
                    if (letter === " ") return " ";
                    if (index < iterations) return originalValue[index];
                    return letters[Math.floor(Math.random() * letters.length)];
                })
                .join("");

            if (iterations >= originalValue.length) {
                clearInterval(interval);
                titleElement.innerText = originalValue;
                fadeElements.forEach(el => el.classList.add("visible"));
            }
            iterations += 1.2;
        }, 20);
    }
    triggerDecryptAnimation();

    // 2. RECHERCHE EN TEMPS RÉEL SUR L'INDEX DE CONFIANCE
    const searchInput = document.getElementById("global-search");
    const trustCards = document.querySelectorAll(".trust-card-evo");
    const trustBlocks = document.querySelectorAll(".trust-category-block");
    const entreprisesContainer = document.querySelector(".entreprises-container");

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();
            let visibleCardsCount = 0;

            trustBlocks.forEach(block => {
                const cardsInBlock = block.querySelectorAll(".trust-card-evo");
                let blockVisibleCount = 0;

                cardsInBlock.forEach(card => {
                    const searchString = (card.getAttribute("data-search") || "").toLowerCase();
                    if (searchString.includes(query)) {
                        card.classList.remove("hidden");
                        blockVisibleCount++;
                        visibleCardsCount++;
                    } else {
                        card.classList.add("hidden");
                    }
                });

                block.style.display = blockVisibleCount === 0 && query !== "" ? "none" : "";
            });

            if (entreprisesContainer) {
                let emptyMsg = entreprisesContainer.querySelector(".trust-no-results");
                if (visibleCardsCount === 0 && query !== "") {
                    if (!emptyMsg) {
                        emptyMsg = document.createElement("p");
                        emptyMsg.className = "trust-no-results";
                        emptyMsg.style.cssText = "text-align:center;color:var(--text-muted);padding:3rem;font-size:0.95rem;";
                        emptyMsg.textContent = "Aucune structure ne correspond à votre recherche.";
                        entreprisesContainer.appendChild(emptyMsg);
                    }
                } else if (emptyMsg) {
                    emptyMsg.remove();
                }
            }
        });
    }

    // 3. ROUTAGE (SPA)
    const pages = document.querySelectorAll(".spa-page");

    function navigateToPage(targetId, navHighlightId = targetId) {
        const targetPage = document.getElementById(targetId);
        if (!targetPage) return;

        pages.forEach(page => {
            if (page.classList.contains("active") && page.id !== targetId) {
                page.style.opacity = "0";
                setTimeout(() => page.classList.remove("active"), 150);
            }
        });

        const searchZone = document.querySelector(".global-search-zone");
        if (searchZone) {
            if (targetId === "page-entreprises") {
                searchZone.style.display = "block";
            } else {
                searchZone.style.display = "none";
                if (searchInput) {
                    searchInput.value = "";
                    searchInput.dispatchEvent(new Event("input"));
                }
            }
        }

        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
            targetPage.classList.add("active");
            setTimeout(() => { targetPage.style.opacity = "1"; }, 30);
            if (targetId === "page-accueil") triggerDecryptAnimation();
        }, 150);

        document.querySelectorAll(".nav-item").forEach(nav => nav.classList.remove("active"));
        const activeNav = document.querySelector(`.nav-item[data-target="${navHighlightId}"]`);
        if (activeNav) activeNav.classList.add("active");
    }

    document.body.addEventListener("click", (e) => {
        const trigger = e.target.closest("[data-target]");
        if (!trigger) return;
        const targetId = trigger.getAttribute("data-target");
        if (!targetId) return;
        e.preventDefault();
        navigateToPage(targetId);
    });

    const logoLink = document.getElementById("logo-link");
    if (logoLink) {
        logoLink.addEventListener("click", (e) => {
            e.preventDefault();
            navigateToPage("page-accueil");
        });
    }

    // 4. GESTION DU BLOG (CARTES ACCUEIL + DISPOSITION JOURNAL SUR LA PAGE BLOG + LECTURE)
    const homeBlogGrid = document.getElementById("home-blog-grid");
    const blogMainGrid = document.getElementById("blog-main-grid");

    function createHomeBlogCardHTML(article) {
        return `
            <article class="blog-card" data-article-id="${article.id}">
                <div class="tcard-glow"></div>
                <div class="blog-card-thumb">
                    ${buildThumbnailMarkup(article, true)}
                </div>
                <div class="blog-card-body">
                    <div>
                        <div class="blog-card-meta-line">
                            <span>${article.date}</span>
                            <span>•</span>
                            <span>${article.readTime}</span>
                        </div>
                        <h3 class="blog-card-title">${article.title}</h3>
                        <p class="blog-card-excerpt">${article.excerpt}</p>
                    </div>
                    <div class="blog-card-footer">
                        <span class="blog-read-time">Dossier complet</span>
                        <span class="blog-read-link">Lire l'article <span>→</span></span>
                    </div>
                </div>
            </article>
        `;
    }

    function createNewspaperFeaturedHTML(article) {
        return `
            <article class="news-featured-story" data-article-id="${article.id}">
                <div class="news-featured-media">
                    ${buildThumbnailMarkup(article, false)}
                </div>
                <div class="news-featured-content">
                    <div>
                        <div class="news-kicker-row">
                            <span class="news-une-tag">À la une</span>
                            <span class="news-rubric-label">${article.categoryLabel}</span>
                        </div>
                        <h3 class="news-featured-title">${article.title}</h3>
                        <p class="news-featured-excerpt">${article.excerpt}</p>
                    </div>
                    <div class="news-story-footer">
                        <span>Publié le ${article.date} • ${article.readTime}</span>
                        <span class="blog-read-link">Lire l'article <span>→</span></span>
                    </div>
                </div>
            </article>
        `;
    }

    function createNewspaperColumnHTML(article) {
        return `
            <article class="news-column-item" data-article-id="${article.id}">
                <div>
                    <div class="news-col-thumb">
                        ${buildThumbnailMarkup(article, false)}
                    </div>
                    <span class="news-rubric-label">${article.categoryLabel}</span>
                    <h3 class="news-col-title">${article.title}</h3>
                    <p class="news-col-excerpt">${article.excerpt}</p>
                </div>
                <div class="news-story-footer">
                    <span>${article.date} • ${article.readTime}</span>
                    <span class="blog-read-link">Lire <span>→</span></span>
                </div>
            </article>
        `;
    }

    function renderNewspaper(filter = "all") {
        if (!blogMainGrid) return;

        const filtered = filter === "all"
            ? blogArticles
            : blogArticles.filter(article => article.category === filter);

        if (filtered.length === 0) {
            blogMainGrid.innerHTML = `<div style="padding: 3rem; text-align: center; color: var(--text-muted);">Aucun article dans cette rubrique pour le moment.</div>`;
            return;
        }

        if (filter === "all") {
            const [featured, ...rest] = filtered;
            const featuredHTML = createNewspaperFeaturedHTML(featured);
            const columnsHTML = rest.length
                ? `<div class="newspaper-columns">${rest.map(createNewspaperColumnHTML).join("")}</div>`
                : "";
            blogMainGrid.innerHTML = featuredHTML + columnsHTML;
        } else {
            blogMainGrid.innerHTML = `<div class="newspaper-columns">${filtered.map(createNewspaperColumnHTML).join("")}</div>`;
        }
    }

    function renderBlogs() {
        if (homeBlogGrid) {
            homeBlogGrid.innerHTML = blogArticles.slice(0, 3).map(createHomeBlogCardHTML).join("");
        }
        renderNewspaper("all");
    }

    function openArticle(articleId) {
        const article = blogArticles.find(a => a.id === articleId);
        if (!article) return;

        const coverContainer = document.getElementById("article-view-cover");
        if (coverContainer) {
            coverContainer.innerHTML = buildThumbnailMarkup(article, false);
        }

        document.getElementById("article-view-cat").innerText = article.categoryLabel;
        document.getElementById("article-view-date").innerText = article.date;
        document.getElementById("article-view-readtime").innerText = article.readTime;
        document.getElementById("article-view-title").innerText = article.title;
        document.getElementById("article-view-excerpt").innerText = article.excerpt;
        document.getElementById("article-view-body").innerHTML = article.content;

        navigateToPage("page-article-view", "page-blog");
    }

    renderBlogs();

    document.body.addEventListener("click", (e) => {
        const articleTrigger = e.target.closest("[data-article-id]");
        if (articleTrigger) {
            const articleId = articleTrigger.getAttribute("data-article-id");
            openArticle(articleId);
        }
    });

    const backToBlogBtns = [document.getElementById("back-to-blog"), document.getElementById("back-to-blog-bottom")];
    backToBlogBtns.forEach(btn => {
        if (btn) {
            btn.addEventListener("click", () => navigateToPage("page-blog", "page-blog"));
        }
    });

    const blogFilterBtns = document.querySelectorAll(".blog-tab-btn");
    blogFilterBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            blogFilterBtns.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            const filter = btn.getAttribute("data-blog-filter");
            renderNewspaper(filter);
        });
    });

    // 5. GESTION DU HAMBURGER MOBILE
    const hamburgerBtn = document.getElementById("hamburger-btn");
    const navMenu = document.getElementById("nav-menu");
    if (hamburgerBtn && navMenu) {
        hamburgerBtn.addEventListener("click", () => {
            hamburgerBtn.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
        navMenu.querySelectorAll("a, button").forEach(element => {
            element.addEventListener("click", () => {
                hamburgerBtn.classList.remove("active");
                navMenu.classList.remove("active");
            });
        });
    }

    // 6. TOGGLE THÈME
    const themeToggle = document.getElementById("theme-toggle");
    const themeIcon = document.getElementById("theme-icon");
    if (themeToggle && themeIcon) {
        themeToggle.addEventListener("click", () => {
            if (document.body.classList.contains("light-theme")) {
                document.body.classList.replace("light-theme", "dark-theme");
                themeIcon.innerHTML = '<circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>';
            } else {
                document.body.classList.replace("dark-theme", "light-theme");
                themeIcon.innerHTML = '<path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>';
            }
        });
    }

    // 7. FENÊTRE MODALE CONTACT
    const contactModal = document.getElementById("contact-modal");
    const closeContact = document.getElementById("close-contact");

    document.body.addEventListener("click", (e) => {
        if (e.target.closest("#open-contact") || e.target.closest(".open-contact-trigger")) {
            e.preventDefault();
            if (contactModal) contactModal.classList.add("active");
        }
    });
    if (closeContact && contactModal) {
        closeContact.addEventListener("click", () => contactModal.classList.remove("active"));
        contactModal.addEventListener("click", (e) => { if (e.target === contactModal) contactModal.classList.remove("active"); });
    }

    // 8. CHARGEMENT DES ARTICLES CRÉÉS VIA PAGES CMS SUR GITHUB
    const REPO_OWNER = "PrivAltEvo";
    const REPO_NAME = "PrivAltEvo-Website";
    const ARTICLES_BRANCH = "main";

    function normalizeCategorySlug(rawCategory = "") {
        const clean = rawCategory.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
        if (clean.includes("test")) return "tests";
        if (clean.includes("outil")) return "outils";
        if (clean === "edc" || clean.includes("everyday")) return "edc";
        if (clean.includes("tech")) return "tech";
        if (clean.includes("societe") || clean.includes("usage") || clean.includes("impact") || clean.includes("vie")) return "societe-usages";
        if (clean.includes("actu") || clean.includes("news")) return "actualites";
        return "actualites";
    }

    function formatCategoryLabel(slug) {
        const labels = {
            "tests": "Tests",
            "outils": "Outils",
            "edc": "EDC",
            "tech": "Tech",
            "societe-usages": "Société & Usages",
            "actualites": "Actualités"
        };
        return labels[slug] || "Actualités";
    }

    function escapeHtmlAttr(str = "") {
        return str.replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    }

    function formatMarkdownBodyToHtml(mdText = "") {
        return mdText
            .split(/\n\s*\n/)
            .map(block => block.trim())
            .filter(Boolean)
            .map(block => {
                const imgMatch = block.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
                if (imgMatch) {
                    const alt = escapeHtmlAttr(imgMatch[1]);
                    const src = escapeHtmlAttr(imgMatch[2]);
                    return `<img src="${src}" alt="${alt}" class="article-inline-img" loading="lazy">`;
                }
                if (block.startsWith("### ")) return `<h3>${block.slice(4)}</h3>`;
                if (block.startsWith("## ")) return `<h3>${block.slice(3)}</h3>`;
                return `<p>${block.replace(/\n/g, "<br>")}</p>`;
            })
            .join("");
    }

    function extractFirstImage(mdText = "") {
        const match = mdText.match(/!\[[^\]]*\]\(([^)\s]+)\)/);
        return match ? match[1] : "";
    }

    function parseMarkdownArticle(rawText, slug) {
        const match = rawText.match(/^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/);
        const meta = {};
        let rawBody = rawText;

        if (match) {
            match[1].split("\n").forEach((line) => {
                const idx = line.indexOf(":");
                if (idx > -1) {
                    const key = line.slice(0, idx).trim();
                    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
                    meta[key] = val;
                }
            });
            rawBody = match[2].trim();
        }

        const catSlug = normalizeCategorySlug(meta.category);
        const iconMap = {
            "tests": "tests",
            "outils": "outils",
            "edc": "edc",
            "tech": "tech",
            "societe-usages": "societe",
            "actualites": "actualites"
        };

        return {
            id: slug,
            category: catSlug,
            categoryLabel: formatCategoryLabel(catSlug),
            icon: iconMap[catSlug] || "actualites",
            image: meta.image || extractFirstImage(rawBody) || "",
            date: meta.date || "Récemment",
            readTime: "4 min de lecture",
            title: meta.title || slug,
            excerpt: meta.excerpt || "",
            content: formatMarkdownBodyToHtml(rawBody)
        };
    }

    async function loadGazetteArticles() {
        try {
            const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/articles?ref=${ARTICLES_BRANCH}`;
            const res = await fetch(apiUrl);
            if (!res.ok) return [];

            const files = await res.json();
            if (!Array.isArray(files)) return [];

            const mdFiles = files.filter((f) => f.type === "file" && f.name.endsWith(".md"));

            const cmsArticles = await Promise.all(
                mdFiles.map(async (file) => {
                    const rawRes = await fetch(file.download_url);
                    const rawText = await rawRes.text();
                    return parseMarkdownArticle(rawText, file.name.replace(/\.md$/, ""));
                })
            );

            return cmsArticles.reverse();
        } catch (err) {
            console.warn("Impossible de charger les articles CMS :", err);
            return [];
        }
    }

    loadGazetteArticles().then((cmsArticles) => {
        if (!cmsArticles.length) return;
        const existingIds = new Set(blogArticles.map(a => a.id));
        const uniqueNewArticles = cmsArticles.filter(a => !existingIds.has(a.id));
        if (uniqueNewArticles.length) {
            blogArticles.unshift(...uniqueNewArticles);
            const activeTab = document.querySelector(".blog-tab-btn.active");
            const currentFilter = activeTab ? activeTab.getAttribute("data-blog-filter") : "all";
            renderBlogs();
            if (currentFilter && currentFilter !== "all") {
                renderNewspaper(currentFilter);
            }
        }
    });
});