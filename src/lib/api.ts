import type {ApiRatingResponse} from "../interfaces/table.ts";
import fetchApi from '../core/api';

export async function getRating(userId: number) {
    const data = await fetchApi<ApiRatingResponse>('rating');

    let topThree = data.table.global.slice(0, 3);
    const userPosition = data.table.global.slice(3).findIndex(user => user.user_id === userId);

    let userAndNeighbors = [];
    if (userPosition > 0) {
        const start = Math.max(0, userPosition - 1);
        const end = userPosition + 2;
        userAndNeighbors = data.table.global.slice(3).slice(start, end);
    } else {
        topThree = data.table.global.slice(0, 6);
    }

    const langenfeld = data.table.departments.Langenfeld;
    const mannheim = data.table.departments.Mannheim;
    const mainz  = data.table.departments.Maintz;

    return {
        topThree,
        userAndNeighbors,
        langenfeld,
        mannheim,
        mainz,
    };
}
