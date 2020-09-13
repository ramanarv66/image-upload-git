export class ScoreResponse {
    email: string;
    score: number;
    id: number;
    message: string;
}

export class ScoreListResponse {
    scoresList: ScoreResponse[] = [];
}
