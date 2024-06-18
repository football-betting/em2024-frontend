export function filterValidGames(game) {
    return game.homeTeam && game.homeTeam.name && game.awayTeam && game.awayTeam.name;
}

export function formatDate(date) {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
    // @ts-ignore
    return new Date(date).toLocaleDateString('de-DE', options);
}

export function extractTime(date) {
    return new Date(date).toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

export function abbreviateUsername(username: string) {
    if (username.length > 17) {
        return username.slice(0, 14) + '...';
    }
    return username;
}
