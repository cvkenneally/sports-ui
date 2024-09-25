// storefront/static/storefront/js/scores.js

// Function to filter games by the selected date
function filterByDate() {
    var selectedDate = document.getElementById('score-date').value;
    console.log('Selected Date:', selectedDate);  // Add this to check if the function is called

    // Make an AJAX call to fetch the scores for the selected date
    fetch(`/api/get-scores/?date=${selectedDate}`)
        .then(response => response.json())
        .then(data => {
            console.log('Fetched Scores:', data);  // Check if data is received
            updateScores(data.scores);  // Update the page with the filtered scores
        })
        .catch(error => console.error('Error fetching scores:', error));
}

// Function to update the scores on the page (same as before)
function updateScores(scores) {
    var contentGrid = document.querySelector('.content-grid');
    contentGrid.innerHTML = '';  // Clear current game blocks

    if (scores.length === 0) {
        contentGrid.innerHTML = '<p>No games available for this date.</p>';
    } else {
        scores.forEach((score, index) => {
            // Determine the icon based on the sport
            let sportIcon = '';
            if (score.sport === 'basketball') {
                sportIcon = '<i class="fas fa-basketball-ball"></i>';
            } else if (score.sport === 'football') {
                sportIcon = '<i class="fas fa-football-ball"></i>';
            } else if (score.sport === 'soccer') {
                sportIcon = '<i class="fas fa-futbol"></i>';
            }

            // Construct the game block
            var gameBlock = `
                <div class="content-block score-block" data-sport="${score.sport}" data-gameid="${index + 1}">
                    <!-- Sport Icon -->
                    <div class="sport-icon">${sportIcon}</div>

                    <!-- Game Time -->
                    <div class="time-remaining">${score.time_remaining}</div>

                    <!-- Score and Teams -->
                    <div class="score-container">
                        <div class="team">
                            <div class="score">${score.team1_score}</div>
                            <div class="team-name">${score.team1}</div>
                        </div>
                        <div class="team">
                            <div class="score">${score.team2_score}</div>
                            <div class="team-name">${score.team2}</div>
                        </div>
                    </div>
                </div>
            `;
            contentGrid.innerHTML += gameBlock;
        });

        // Reapply dark mode if it's active
        const isDarkMode = document.body.classList.contains('dark-mode');
        if (isDarkMode) {
            updateElementsForDarkMode(true);
        }

        // Attach event listener to each score block after it's created
        document.querySelectorAll('.score-block').forEach(function(block) {
            block.addEventListener('click', function() {
                var gameId = this.getAttribute('data-gameid');
                showDetails(gameId);
            });
        });
    }
}



// Function to show the modal with game details
function showDetails(gameId) {
    console.log("Modal triggered for game ID:", gameId);

    // Fetch the game details from the existing data
    var gameBlock = document.querySelector(`[data-gameid="${gameId}"]`);
    if (gameBlock) {
        var game = {
            team1: gameBlock.querySelector('.team:nth-child(1) .team-name').textContent,
            team1_score: gameBlock.querySelector('.team:nth-child(1) .score').textContent,
            team2: gameBlock.querySelector('.team:nth-child(2) .team-name').textContent,
            team2_score: gameBlock.querySelector('.team:nth-child(2) .score').textContent,
            time_remaining: gameBlock.querySelector('.time-remaining').textContent,
            sport: gameBlock.getAttribute('data-sport')
        };

        var modal = document.getElementById('details-modal');
        modal.style.display = 'flex';

        // Force a repaint
        modal.offsetHeight;

        // Dynamically insert game details into the modal
        var detailsContent = `
            <p><strong>Game Details</strong></p>
            <p><strong>${game.team1}</strong>: ${game.team1_score}</p>
            <p><strong>${game.team2}</strong>: ${game.team2_score}</p>
            <p><strong>Time Remaining:</strong> ${game.time_remaining}</p>
            <p><strong>Sport:</strong> ${game.sport}</p>
        `;

        document.getElementById('modal-details-content').innerHTML = detailsContent;
    } else {
        console.error('Game not found');
    }
}

// Function to close the modal
function closeModal() {
    var modal = document.getElementById('details-modal');
    modal.style.display = 'none';  // Hide the modal
}

// Close the modal if clicked outside the content area
window.onclick = function(event) {
    var modal = document.getElementById('details-modal');
    if (event.target == modal) {
        modal.style.display = 'none';  // Close the modal if clicked outside the modal content
    }
}

function filterGames(sport) {
    // Get all the game blocks
    var games = document.getElementsByClassName('score-block');

    // Loop through each game and show or hide based on the sport
    for (var i = 0; i < games.length; i++) {
        var gameSport = games[i].getAttribute('data-sport');

        if (sport === 'all' || gameSport === sport) {
            games[i].style.display = 'block';  // Show the game
        } else {
            games[i].style.display = 'none';   // Hide the game
        }
    }

    // Highlight the selected menu item
    var buttons = document.getElementsByClassName('menu-item');
    for (var j = 0; j < buttons.length; j++) {
        buttons[j].classList.remove('active');
    }
    event.target.classList.add('active');
}
