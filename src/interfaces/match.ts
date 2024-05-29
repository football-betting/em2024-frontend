
export interface Match {
    id?: number;
    homeTeam: Team;
    awayTeam: Team;
    utcDate: Date;
    score?: string;
    homeScore?: number;
    awayScore?: number;
}

export interface Team {
    crest: string;
    tla: string;
}
