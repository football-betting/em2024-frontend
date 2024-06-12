class Tip {
    name: string;
    user_id: number;
    department: string;
    position: number;
    score_sum: number;
    sum_win_exact: number;
    sum_score_diff: number;
    sum_team: number;
    extra_point: number;
    tips: any[];
}

class Department {
    [key: string]: Tip[];
}

class Table {
    global: Tip[];
    departments: Department;
}

export class ApiRatingResponse {
    table: Table;
    daily_winner: any;
}
