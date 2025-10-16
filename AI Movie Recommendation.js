class MovieDatabase {
            constructor() {
                this.movies = [
                    { id: 1, title: "The Matrix", year: 1999, rating: 8.7, genres: ["Sci-Fi", "Action", "Thriller"], director: "Wachowskis", keywords: ["virtual reality", "dystopia", "hacker", "philosophy"], poster: "http://www.impawards.com/2021/posters/matrix_resurrections_ver3.jpg" },
                    { id: 2, title: "Inception", year: 2010, rating: 8.8, genres: ["Sci-Fi", "Thriller"], director: "Christopher Nolan", keywords: ["dreams", "heist", "mind-bending", "layers"], poster: "http://www.impawards.com/2010/posters/inception_ver4.jpg"},                                                          
                    { id: 3, title: "The Dark Knight", year: 2008, rating: 9.0, genres: ["Action", "Crime", "Drama"], director: "Christopher Nolan", keywords: ["superhero", "villain", "crime", "psychological"], poster: "http://www.impawards.com/2012/posters/dark_knight_rises_ver2.jpg"},
                    { id: 4, title: "Interstellar", year: 2014, rating: 8.6, genres: ["Sci-Fi", "Drama", "Adventure"], director: "Christopher Nolan", keywords: ["space", "time", "family", "survival"], poster: "http://www.impawards.com/2014/posters/interstellar_ver2.jpg" },
                    { id: 5, title: "Pulp Fiction", year: 1994, rating: 8.9, genres: ["Crime", "Drama"], director: "Quentin Tarantino", keywords: ["nonlinear", "gangster", "dialogue", "violence"], poster: "http://www.impawards.com/1994/posters/pulp_fiction_ver3.jpg " },
                    { id: 6, title: "The Shawshank Redemption", year: 1994, rating: 9.3, genres: ["Drama"], director: "Frank Darabont", keywords: ["prison", "hope", "friendship", "redemption"], poster: "http://www.impawards.com/1994/posters/shawshank_redemption_ver1.jpg" },
                    { id: 7, title: "Parasite", year: 2019, rating: 8.5, genres: ["Thriller", "Drama", "Comedy"], director: "Bong Joon-ho", keywords: ["class", "thriller", "korean", "social"], poster: "http://www.impawards.com/intl/south_korea/2019/posters/parasite_ver2.jpg" },
                    { id: 8, title: "Dune", year: 2021, rating: 8.0, genres: ["Sci-Fi", "Adventure", "Drama"], director: "Denis Villeneuve", keywords: ["desert", "politics", "spice", "epic"], poster: "http://www.impawards.com/2024/posters/dune_part_two.jpg" },
                    { id: 9, title: "Mad Max: Fury Road", year: 2015, rating: 8.1, genres: ["Action", "Adventure", "Sci-Fi"], director: "George Miller", keywords: ["post-apocalyptic", "chase", "desert", "survival"], poster: "http://www.impawards.com/intl/australia/2015/posters/mad_max_fury_road.jpg" },
                    { id: 10, title: "Blade Runner 2049", year: 2017, rating: 8.0, genres: ["Sci-Fi", "Thriller", "Mystery"], director: "Denis Villeneuve", keywords: ["dystopia", "android", "noir", "existential"], poster: "http://www.impawards.com/2017/posters/blade_runner_twenty_forty_nine_ver4.jpg" },
                    { id: 11, title: "The Grand Budapest Hotel", year: 2014, rating: 8.1, genres: ["Comedy", "Drama", "Adventure"], director: "Wes Anderson", keywords: ["whimsical", "stylized", "heist", "nostalgia"], poster: "http://www.impawards.com/2014/posters/grand_budapest_hotel_ver3.jpg" },
                    { id: 12, title: "Get Out", year: 2017, rating: 7.7, genres: ["Horror", "Thriller", "Mystery"], director: "Jordan Peele", keywords: ["social commentary", "psychological", "twist", "suspense"], poster: "http://www.impawards.com/2025/posters/bridget_jones_mad_about_the_boy.jpg" },
                    { id: 13, title: "Arrival", year: 2016, rating: 7.9, genres: ["Sci-Fi", "Drama", "Mystery"], director: "Denis Villeneuve", keywords: ["aliens", "language", "time", "communication"], poster: "http://www.impawards.com/2016/posters/arrival_ver3.jpg" },
                    { id: 14, title: "Whiplash", year: 2014, rating: 8.5, genres: ["Drama", "Music"], director: "Damien Chazelle", keywords: ["jazz", "obsession", "mentor", "perfection"], poster: "http://www.impawards.com/2014/posters/whiplash_ver2.jpg" },
                    { id: 15, title: "Hereditary", year: 2018, rating: 7.3, genres: ["Horror", "Drama", "Mystery"], director: "Ari Aster", keywords: ["family", "supernatural", "grief", "disturbing"], poster: "http://www.impawards.com/2018/posters/hereditary.jpg" },
                    { id: 16, title: "Everything Everywhere All at Once", year: 2022, rating: 7.8, genres: ["Sci-Fi", "Comedy", "Action"], director: "Daniels", keywords: ["multiverse", "family", "absurd", "martial arts"], poster: "http://www.impawards.com/2022/posters/everything_everywhere_all_at_once_ver3.jpg" },
                    { id: 17, title: "The Social Network", year: 2010, rating: 7.7, genres: ["Drama", "Biography"], director: "David Fincher", keywords: ["facebook", "entrepreneurship", "law", "friendship"], poster: "http://www.impawards.com/2010/posters/social_network_ver2.jpg" }
                ];
                
                this.userPreferences = {
                    watchHistory: [],
                    ratings: {},
                    favoriteGenres: [],
                    lastSearch: "",
                    favorites: []
                };
            }

            getAllGenres() {
                const genres = new Set();
                this.movies.forEach(m => m.genres.forEach(g => genres.add(g)));
                return Array.from(genres);
            }

            filterByGenre(genre) {
                if (genre === "All") return this.movies;
                return this.movies.filter(m => m.genres.includes(genre));
            }

            searchMovies(query) {
                const lowerQuery = query.toLowerCase();
                return this.movies.filter(m => 
                    m.title.toLowerCase().includes(lowerQuery) ||
                    m.genres.some(g => g.toLowerCase().includes(lowerQuery)) ||
                    m.keywords.some(k => k.includes(lowerQuery)) ||
                    m.director.toLowerCase().includes(lowerQuery)
                );
            }

            calculateMatchScore(movie, preferences) {
                let score = 0;
                const keywords = preferences.toLowerCase().split(' ');
                
                keywords.forEach(keyword => {
                    if (movie.title.toLowerCase().includes(keyword)) score += 30;
                    if (movie.genres.some(g => g.toLowerCase().includes(keyword))) score += 25;
                    if (movie.keywords.some(k => k.includes(keyword))) score += 20;
                    if (movie.director.toLowerCase().includes(keyword)) score += 15;
                });
                
                score += movie.rating * 5;
                
                return Math.min(score, 100);
            }

            getRecommendations(query, limit = 5) {
                const scored = this.movies.map(movie => ({
                    movie,
                    score: this.calculateMatchScore(movie, query)
                })).filter(item => item.score > 10);

                scored.sort((a, b) => b.score - a.score);
                
                return scored.slice(0, limit);
            }

            addToWatchHistory(movieId) {
                if (!this.userPreferences.watchHistory.includes(movieId)) {
                    this.userPreferences.watchHistory.push(movieId);
                }
            }

            rateMovie(movieId, rating) {
                this.userPreferences.ratings[movieId] = rating;
            }

            toggleFavorite(movieId) {
                const index = this.userPreferences.favorites.indexOf(movieId);
                if (index === -1) {
                    this.userPreferences.favorites.push(movieId);
                    return true;
                } else {
                    this.userPreferences.favorites.splice(index, 1);
                    return false;
                }
            }

            isFavorite(movieId) {
                return this.userPreferences.favorites.includes(movieId);
            }

            getFavorites() {
                return this.movies.filter(m => this.userPreferences.favorites.includes(m.id));
            }
        }

        const db = new MovieDatabase();
        let recommendationCount = 0;
        let currentFilter = "All";
        let userName = "Guest";

        function scrollToSection(sectionId) {
            const section = document.getElementById(sectionId);
            if (section) {
                const headerHeight = 70;
                const sectionTop = section.offsetTop - headerHeight;
                window.scrollTo({
                    top: sectionTop,
                    behavior: 'smooth'
                });
            }
        }

        function toggleProfile() {
            const modal = document.getElementById('profileModal');
            const overlay = document.getElementById('modalOverlay');
            modal.classList.add('active');
            overlay.classList.add('active');
            updateProfileDisplay();
        }

        function closeProfile() {
            const modal = document.getElementById('profileModal');
            const overlay = document.getElementById('modalOverlay');
            modal.classList.remove('active');
            overlay.classList.remove('active');
        }

        function closeAllModals() {
            closeProfile();
            closeMovieDetail();
        }

        function updateProfileDisplay() {
            const watchHistory = db.userPreferences.watchHistory
                .map(id => db.movies.find(m => m.id === id)?.title)
                .filter(Boolean)
                .slice(-5)
                .join(', ') || 'No movies watched yet';
            
            document.getElementById('watchHistoryDisplay').textContent = watchHistory;
            
            const genreCounts = {};
            db.userPreferences.watchHistory.forEach(id => {
                const movie = db.movies.find(m => m.id === id);
                if (movie) {
                    movie.genres.forEach(g => {
                        genreCounts[g] = (genreCounts[g] || 0) + 1;
                    });
                }
            });
            
            const topGenres = Object.entries(genreCounts)
                .sort((a, b) => b[1] - a[1])
                .slice(0, 3)
                .map(([genre]) => genre)
                .join(', ') || 'Start watching to build preferences';
            
            document.getElementById('favoriteGenresDisplay').textContent = topGenres;
            document.getElementById('totalRecsDisplay').textContent = recommendationCount;
            document.getElementById('usernameInput').value = userName;
        }

        function saveProfile() {
            const newName = document.getElementById('usernameInput').value.trim();
            if (newName) {
                userName = newName;
                document.getElementById('userName').textContent = userName;
            }
            closeProfile();
            alert('✅ Profile saved successfully!');
        }

        function updateStats() {
            document.getElementById('movieCount').textContent = db.movies.length;
            document.getElementById('recommendationCount').textContent = recommendationCount;
            
            const accuracy = recommendationCount > 0 ? Math.min(85 + recommendationCount * 2, 99) : 0;
            document.getElementById('userScore').textContent = accuracy + '%';
        }

        function renderGenreFilters() {
            const filters = document.getElementById('genreFilters');
            const genres = ['All', ...db.getAllGenres()];
            
            filters.innerHTML = genres.map(genre => `
                <button class="filter-btn ${genre === 'All' ? 'active' : ''}" onclick="filterMovies('${genre}')">
                    ${genre}
                </button>
            `).join('');
        }

        function filterMovies(genre) {
            currentFilter = genre;
            
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.textContent.trim() === genre) {
                    btn.classList.add('active');
                }
            });
            
            renderMovies(db.filterByGenre(genre));
        }

        function renderMovies(movies = db.movies) {
            const grid = document.getElementById('trendingGrid');
            grid.innerHTML = movies.map(movie => `
                <div class="movie-card" onclick="viewMovie(${movie.id})">
                    ${db.isFavorite(movie.id) ? '<div class="favorite-badge">❤</div>' : ''}
                    <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                    <div class="movie-overlay">
                        <div class="movie-title">${movie.title}</div>
                        <div class="movie-info">${movie.year} • ${movie.genres.join(', ')}</div>
                        <div class="rating">⭐ ${movie.rating}</div>
                    </div>
                </div>
            `).join('');
        }

        function viewMovie(movieId) {
            db.addToWatchHistory(movieId);
            const movie = db.movies.find(m => m.id === movieId);
            
            const modal = document.getElementById('movieDetailModal');
            const overlay = document.getElementById('modalOverlay');
            
            const isFav = db.isFavorite(movieId);
            
            document.getElementById('movieDetailHeader').style.backgroundImage = `url('${movie.poster}')`;
            document.getElementById('movieDetailTitle').textContent = movie.title;
            document.getElementById('movieDetailMeta').textContent = `${movie.year} • ${movie.genres.join(', ')}`;
            document.getElementById('movieDetailRating').textContent = movie.rating;
            document.getElementById('movieDetailDirector').textContent = movie.director;
            document.getElementById('movieDetailGenres').textContent = movie.genres.join(', ');
            document.getElementById('movieDetailKeywords').textContent = movie.keywords.join(', ');
            
            const favBtn = document.getElementById('favoriteBtn');
            favBtn.innerHTML = `<span class="favorites-heart ${isFav ? 'active' : ''}">❤</span> ${isFav ? 'Remove from Favorites' : 'Add to Favorites'}`;
            favBtn.onclick = () => toggleFavorite(movieId);
            
            modal.classList.add('active');
            overlay.classList.add('active');
        }

        function closeMovieDetail() {
            const modal = document.getElementById('movieDetailModal');
            const overlay = document.getElementById('modalOverlay');
            modal.classList.remove('active');
            overlay.classList.remove('active');
        }

        function toggleFavorite(movieId) {
            const added = db.toggleFavorite(movieId);
            const movie = db.movies.find(m => m.id === movieId);
            
            if (added) {
                alert(`✅ "${movie.title}" has been added to your favorites!`);
            } else {
                alert(`❌ "${movie.title}" has been removed from your favorites.`);
            }
            
            viewMovie(movieId);
            renderFavoritesSection();
            renderMovies(db.filterByGenre(currentFilter));
        }

        function renderFavoritesSection() {
            const favorites = db.getFavorites();
            const section = document.getElementById('favorites');
            
            if (favorites.length === 0) {
                section.style.display = 'none';
                return;
            }
            
            section.style.display = 'block';
            const grid = document.getElementById('favoritesGrid');
            
            grid.innerHTML = favorites.map(movie => `
                <div class="movie-card" onclick="viewMovie(${movie.id})">
                    <div class="favorite-badge">❤</div>
                    <img src="${movie.poster}" alt="${movie.title}" class="movie-poster">
                    <div class="movie-overlay">
                        <div class="movie-title">${movie.title}</div>
                        <div class="movie-info">${movie.year} • ${movie.genres.join(', ')}</div>
                        <div class="rating">⭐ ${movie.rating}</div>
                    </div>
                </div>
            `).join('');
        }

        function getRecommendations() {
            const input = document.getElementById('searchInput').value;
            if (!input.trim()) {
                alert('⚠️ Please describe what kind of movies you\'d like to watch!');
                return;
            }

            db.userPreferences.lastSearch = input;
            const section = document.getElementById('recommendations');
            const content = document.getElementById('recommendationsContent');
            
            section.style.display = 'block';
            content.innerHTML = '<div class="loading"><div class="spinner"></div>AI analyzing your preferences...</div>';
            
            scrollToSection('recommendations');

            setTimeout(() => {
                const results = db.getRecommendations(input);
                recommendationCount += results.length;
                updateStats();
                
                if (results.length === 0) {
                    content.innerHTML = '<div class="loading">No matches found. Try different keywords!</div>';
                    return;
                }

                content.innerHTML = results.map(({ movie, score }) => {
                    const reason = generateReason(movie, input, score);
                    return `
                        <div class="rec-card">
                            <div class="rec-header">
                                <div class="rec-title">${movie.title} (${movie.year})</div>
                                <div class="match-score">${Math.round(score)}% Match</div>
                            </div>
                            <div class="rec-reason">${reason}</div>
                            <div class="rec-tags">
                                ${movie.genres.map(g => `<span class="tag">${g}</span>`).join('')}
                            </div>
                            <div class="rec-actions">
                                <button class="btn-small" onclick="viewMovie(${movie.id})">👁️ View Details</button>
                                <button class="btn-small" onclick="addToFavorites(${movie.id})">⭐ Add to Favorites</button>
                                <div class="rating">⭐ ${movie.rating}</div>
                            </div>
                        </div>
                    `;
                }).join('');
            }, 1500);
        }

        function addToFavorites(movieId) {
            if (db.isFavorite(movieId)) {
                const movie = db.movies.find(m => m.id === movieId);
                alert(`ℹ️ "${movie.title}" is already in your favorites!`);
                return;
            }
            
            db.toggleFavorite(movieId);
            const movie = db.movies.find(m => m.id === movieId);
            alert(`✅ "${movie.title}" has been added to your favorites!`);
            renderFavoritesSection();
            renderMovies(db.filterByGenre(currentFilter));
        }

        function generateReason(movie, query, score) {
            const reasons = [];
            const lowerQuery = query.toLowerCase();
            
            if (movie.genres.some(g => lowerQuery.includes(g.toLowerCase()))) {
                reasons.push(`Perfect match for ${movie.genres.filter(g => lowerQuery.includes(g.toLowerCase())).join(' and ')} fans`);
            }
            
            if (movie.keywords.some(k => lowerQuery.includes(k))) {
                reasons.push(`Features themes of ${movie.keywords.filter(k => lowerQuery.includes(k)).join(', ')}`);
            }
            
            if (movie.rating >= 8.5) {
                reasons.push("Critically acclaimed masterpiece");
            }
            
            reasons.push(`Directed by ${movie.director}, known for exceptional storytelling`);
            
            return reasons.slice(0, 2).join('. ') + '.';
        }

        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                getRecommendations();
            }
        });

        renderGenreFilters();
        renderMovies();
        updateStats();
        renderFavoritesSection();
    