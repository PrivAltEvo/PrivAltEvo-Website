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
        mail: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/><path d="M16 16l2 2 4-4"/></svg>`,
        smartphone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/><path d="M9 9l2 2 4-4"/></svg>`,
        server: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><line x1="6" y1="6.5" x2="6.01" y2="6.5"/><line x1="6" y1="17.5" x2="6.01" y2="17.5"/><path d="M14 6.5h4M14 17.5h4"/></svg>`,
        key: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4"/></svg>`
    };

    // 0. BASE DE DONNÉES DES ARTICLES DU BLOG (le 1er est automatiquement mis "À la Une" dans le journal, les 3 premiers s'affichent sur l'accueil)
    const blogArticles = [
        {
            id: "quitter-gmail-sans-friction",
            category: "vie-privee",
            categoryLabel: "Vie Privée",
            icon: "mail",
            image: "",
            date: "14 Nov 2026",
            readTime: "4 min de lecture",
            title: "Quitter Gmail sans perdre ses contacts ni ses habitudes",
            excerpt: "Méthode progressive en trois étapes pour migrer sa boîte principale vers ProtonMail ou Infomaniak sans coupure de service.",
            content: `
                <p>Changer d'adresse e-mail principale semble souvent insurmontable. Entre les abonnements, les accès administratifs et les contacts historiques, la peur de rater un message critique bloque la transition.</p>
                <h3>1. Préparer le terrain avec un transfert automatique</h3>
                <p>Avant de fermer quoi que ce soit, créez votre nouveau compte chez un acteur souverain comme <strong>Infomaniak</strong> ou <strong>ProtonMail</strong>. Activez ensuite le transfert automatique depuis votre ancienne boîte Gmail vers cette nouvelle adresse.</p>
                <div class="article-callout">
                    <strong>Bon réflexe :</strong> Ne supprimez jamais votre ancienne adresse immédiatement. Gardez-la en mode "passif" pendant 6 à 12 mois pour repérer les derniers services qui écrivent encore dessus.
                </div>
                <h3>2. Migrer par cercles de priorité</h3>
                <ul>
                    <li><strong>Cercle critique :</strong> Banques, impôts, santé et gestionnaire de mots de passe.</li>
                    <li><strong>Cercle quotidien :</strong> Messageries, cloud personnel et achats récurrents.</li>
                    <li><strong>Cercle secondaire :</strong> Newsletters et comptes ponctuels (profitez-en pour faire le tri).</li>
                </ul>
                <h3>3. Utiliser des alias pour cloisonner</h3>
                <p>Plutôt que de donner votre nouvelle adresse partout, utilisez des alias dédiés par service. En cas de fuite de données chez un marchand, vous identifiez immédiatement la source et coupez l'alias en un clic.</p>
            `
        },
        {
            id: "pourquoi-degoogliser-son-smartphone",
            category: "outils",
            categoryLabel: "Outils & OS",
            icon: "smartphone",
            image: "",
            date: "02 Nov 2026",
            readTime: "5 min de lecture",
            title: "Pourquoi et comment dégoogliser son smartphone Android",
            excerpt: "Analyse des flux de télémétrie en arrière-plan et tour d'horizon des systèmes alternatifs comme GrapheneOS et /e/OS.",
            content: `
                <p>Un smartphone classique sous Android standard envoie en moyenne plusieurs mégaoctets de télémétrie chaque jour aux serveurs de Google, même lorsque le téléphone reste posé sur un bureau.</p>
                <h3>Ce que captent réellement les services système</h3>
                <p>Au-delà de la géolocalisation, les identifiants publicitaires, les horaires d'utilisation des applications et les réseaux Wi-Fi environnants permettent de dresser un profil comportemental continu.</p>
                <h3>Deux approches selon votre profil</h3>
                <ul>
                    <li><strong>/e/OS (Murena) :</strong> Idéal pour retrouver un environnement familier, simple d'installation et compatible avec la majorité des applications courantes sans compte Google.</li>
                    <li><strong>GrapheneOS :</strong> La référence absolue en matière de durcissement sécurité, de sandboxing des applications et d'isolation matérielle sur appareils Pixel.</li>
                </ul>
                <div class="article-callout">
                    <strong>À savoir :</strong> La plupart des applications bancaires et de transport fonctionnent aujourd'hui sur ces systèmes grâce aux implémentations libres comme microG ou le sandboxed Google Play.
                </div>
            `
        },
        {
            id: "cloud-europeen-vs-cloud-act",
            category: "souverainete",
            categoryLabel: "Souveraineté",
            icon: "server",
            image: "",
            date: "19 Oct 2026",
            readTime: "6 min de lecture",
            title: "Cloud Act et hébergement européen : comprendre les vrais enjeux",
            excerpt: "Pourquoi un serveur situé à Paris ou Francfort n'est pas forcément protégé s'il appartient à un fournisseur extra-européen.",
            content: `
                <p>Beaucoup d'acteurs américains communiquent désormais sur des "régions européennes" pour rassurer leurs utilisateurs. Pourtant, la localisation physique du disque dur ne suffit pas à garantir l'immunité juridique.</p>
                <h3>La portée extraterritoriale du droit américain</h3>
                <p>Le <strong>Cloud Act</strong> permet aux autorités américaines d'exiger l'accès aux données détenues par toute entreprise soumise au droit des États-Unis, quel que soit le pays où se trouvent les serveurs.</p>
                <h3>Les 3 critères d'un hébergement véritablement souverain</h3>
                <ul>
                    <li><strong>Capitaux et siège social :</strong> 100 % européens ou suisses, sans maison-mère extra-européenne.</li>
                    <li><strong>Chiffrement Zero-Knowledge :</strong> Même l'hébergeur ne détient pas les clés permettant de déchiffrer vos fichiers.</li>
                    <li><strong>Transparence du code :</strong> Logiciels clients auditables et protocoles ouverts (WebDAV, CalDAV, OpenPGP).</li>
                </ul>
            `
        },
        {
            id: "hygiene-numerique-mots-de-passe",
            category: "vie-privee",
            categoryLabel: "Vie Privée",
            icon: "key",
            image: "",
            date: "04 Oct 2026",
            readTime: "3 min de lecture",
            title: "Sortir ses mots de passe du navigateur : le guide express",
            excerpt: "Pourquoi le gestionnaire intégré à votre navigateur est un point de défaillance unique et comment passer à Bitwarden ou KeePassXC.",
            content: `
                <p>Enregistrer ses mots de passe directement dans Chrome ou Edge est pratique, mais expose l'ensemble de vos accès dès qu'un malware ou une session ouverte est compromise.</p>
                <h3>Local ou synchronisé ?</h3>
                <ul>
                    <li><strong>KeePassXC :</strong> Votre base reste un fichier chiffré sur votre machine, sous votre contrôle exclusif.</li>
                    <li><strong>Bitwarden :</strong> Synchronisation chiffrée de bout en bout entre ordinateur et mobile, open-source et audité.</li>
                </ul>
                <div class="article-callout">
                    <strong>Règle d'or :</strong> Activez systématiquement la double authentification (2FA) par application TOTP ou clé physique plutôt que par SMS.
                </div>
            `
        }
    ];

    function buildThumbnailMarkup(article, showBadge = true) {
        const badgeHTML = showBadge ? `<span class="thumb-badge-overlay">${article.categoryLabel}</span>` : "";
        if (article.image) {
            return `
                ${badgeHTML}
                <img src="${article.image}" alt="${article.title}" loading="lazy">
            `;
        }
        const svgIcon = articleThumbIcons[article.icon] || articleThumbIcons.mail;
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

    // 2. SYSTEME DE FAVORIS LOCAL STORAGE
    let userFavorites = JSON.parse(localStorage.getItem("privaltevo_favs")) || [];

    function updateFavUI() {
        const favTriggers = document.querySelectorAll(".fav-trigger");
        favTriggers.forEach(btn => {
            const id = btn.getAttribute("data-id");
            if (userFavorites.includes(id)) {
                btn.classList.add("is-active");
                btn.innerText = "★";
            } else {
                btn.classList.remove("is-active");
                btn.innerText = "☆";
            }
        });
        const countBadge = document.getElementById("fav-count");
        if (countBadge) countBadge.innerText = userFavorites.length;
    }

    document.querySelectorAll(".fav-trigger").forEach(btn => {
        btn.addEventListener("click", (e) => {
            e.stopPropagation();
            const id = btn.getAttribute("data-id");
            if (userFavorites.includes(id)) {
                userFavorites = userFavorites.filter(item => item !== id);
            } else {
                userFavorites.push(id);
            }
            localStorage.setItem("privaltevo_favs", JSON.stringify(userFavorites));
            updateFavUI();

            const activeTab = document.querySelector(".tab-btn.active");
            if (activeTab && activeTab.getAttribute("data-filter") === "favorites") {
                filterContent("favorites");
            }
        });
    });
    updateFavUI();

    // 3. MOTEUR DE RECHERCHE HYBRIDE EN TEMPS RÉEL
    const searchInput = document.getElementById("global-search");
    const tableRows = document.querySelectorAll(".table-row");
    const trustCards = document.querySelectorAll(".trust-card-evo");
    const trustGrid = document.getElementById("trust-grid");

    if (searchInput) {
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();
            const activeTabBlock = document.querySelector(".tab-btn.active");
            const activeTab = activeTabBlock ? activeTabBlock.getAttribute("data-filter") : "all";

            tableRows.forEach(row => {
                const searchString = row.getAttribute("data-search");
                const category = row.getAttribute("data-cat");
                const favId = row.querySelector(".fav-trigger").getAttribute("data-id");

                const matchesSearch = searchString.includes(query);
                let matchesTab = (activeTab === "all" || category === activeTab);
                if (activeTab === "favorites") matchesTab = userFavorites.includes(favId);

                if (matchesSearch && matchesTab) row.classList.remove("hidden");
                else row.classList.add("hidden");
            });

            let visibleCardsCount = 0;
            trustCards.forEach(card => {
                const searchString = card.getAttribute("data-search");
                if (searchString.includes(query)) {
                    card.classList.remove("hidden");
                    visibleCardsCount++;
                } else {
                    card.classList.add("hidden");
                }
            });

            if (trustGrid) {
                if (visibleCardsCount === 0 && query !== "") trustGrid.classList.add("has-no-results");
                else trustGrid.classList.remove("has-no-results");
            }
        });
    }

    // 4. ROUTAGE ET FILTRES DES ENGINS (SPA)
    function filterContent(filterValue) {
        const query = searchInput ? searchInput.value.toLowerCase().trim() : "";
        tableRows.forEach(row => {
            const category = row.getAttribute("data-cat");
            const searchString = row.getAttribute("data-search");
            const favId = row.querySelector(".fav-trigger").getAttribute("data-id");
            const matchesSearch = searchString.includes(query);
            let matchesTab = false;

            if (filterValue === "all") matchesTab = true;
            else if (filterValue === "favorites") matchesTab = userFavorites.includes(favId);
            else matchesTab = (category === filterValue);

            if (matchesTab && matchesSearch) row.classList.remove("hidden");
            else row.classList.add("hidden");
        });
    }

    const filterButtons = document.querySelectorAll(".tab-btn");
    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            filterContent(button.getAttribute("data-filter"));
        });
    });

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

        // --- CONDITION DE VISIBILITÉ DE LA BARRE DE RECHERCHE ---
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
            setTimeout(() => targetPage.style.opacity = "1", 30);
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

    // 4B. GESTION DU BLOG (CARTES ACCUEIL + DISPOSITION JOURNAL SUR LA PAGE BLOG + LECTURE)
    const homeBlogGrid = document.getElementById("home-blog-grid");
    const blogMainGrid = document.getElementById("blog-main-grid");

    // Carte standard pour les 3 derniers articles sur l'accueil
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

    // Article "À la Une" du journal (pleine largeur en haut)
    function createNewspaperFeaturedHTML(article) {
        return `
            <article class="news-featured-story" data-article-id="${article.id}">
                <div class="news-featured-media">
                    ${buildThumbnailMarkup(article, false)}
                </div>
                <div class="news-featured-content">
                    <div>
                        <div class="news-kicker-row">
                            <span class="news-une-tag">À la Une</span>
                            <span class="news-rubric-label">${article.categoryLabel}</span>
                        </div>
                        <h3 class="news-featured-title">${article.title}</h3>
                        <p class="news-featured-excerpt">${article.excerpt}</p>
                    </div>
                    <div class="news-story-footer">
                        <span>Publié le ${article.date} • ${article.readTime}</span>
                        <span class="blog-read-link">Lire l'enquête <span>→</span></span>
                    </div>
                </div>
            </article>
        `;
    }

    // Article en colonne de journal
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

        // En vue "Tout", le 1er article est en grand "À la Une" et les suivants en colonnes de journal
        if (filter === "all") {
            const [featured, ...rest] = filtered;
            const featuredHTML = createNewspaperFeaturedHTML(featured);
            const columnsHTML = rest.length
                ? `<div class="newspaper-columns">${rest.map(createNewspaperColumnHTML).join("")}</div>`
                : "";
            blogMainGrid.innerHTML = featuredHTML + columnsHTML;
        } else {
            // En vue rubrique filtrée, affichage en colonnes de journal
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

    const kesselBanner = document.getElementById("kessel-banner");
    const closeBannerBtn = document.getElementById("close-banner-btn");
    if (kesselBanner && closeBannerBtn) {
        closeBannerBtn.addEventListener("click", () => kesselBanner.classList.add("closed"));
    }

    // 7. FENÊTRE MODALE CONTROLES GLOBAL INTERFACE
    const contactModal = document.getElementById("contact-modal");
    const closeContact = document.getElementById("close-contact");

    document.body.addEventListener("click", (e) => {
        if (e.target.closest("#open-contact") || e.target.closest(".open-contact-trigger")) {
            e.preventDefault();
            contactModal.classList.add("active");
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
        if (clean.includes("vie") || clean.includes("privee")) return "vie-privee";
        if (clean.includes("souverainete")) return "souverainete";
        return "outils";
    }

    function formatCategoryLabel(slug) {
        if (slug === "vie-privee") return "Vie Privée";
        if (slug === "souverainete") return "Souveraineté";
        return "Outils & OS";
    }

    function formatMarkdownBodyToHtml(mdText = "") {
        return mdText
            .split(/\n\s*\n/)
            .map(block => block.trim())
            .filter(Boolean)
            .map(block => {
                if (block.startsWith("### ")) return `<h3>${block.slice(4)}</h3>`;
                if (block.startsWith("## ")) return `<h3>${block.slice(3)}</h3>`;
                return `<p>${block.replace(/\n/g, "<br>")}</p>`;
            })
            .join("");
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
            "vie-privee": "key",
            "souverainete": "server",
            "outils": "smartphone"
        };

        return {
            id: slug,
            category: catSlug,
            categoryLabel: formatCategoryLabel(catSlug),
            icon: iconMap[catSlug] || "mail",
            image: "",
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
