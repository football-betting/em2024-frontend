export class UserRating {
    name: string;
    user_id: number;
    department: string;
    position: number;
    score_sum: number;
    sum_win_exact: number;
    sum_score_diff: number;
    sum_team: number;
    extra_point: number;
    tips: MatchInfo[];
}

export interface TeamMatch {
    name: string;
    tla: string;
}

interface MatchInfo {
    match_id: string;
    user: string;
    user_id: number;
    score: number;
    team1: TeamMatch;
    team2: TeamMatch;
    tip_home?: number;
    tip_away?: number;
    score_home?: number;
    score_away?: number;
    date: number;
}

class Department {
    [key: string]: UserRating[];
}

class Table {
    global: UserRating[];
    departments: Department;
}

export class ApiRatingResponse {
    table: Table;
    daily_winner: any;
}
