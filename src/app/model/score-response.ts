export class ScoreResponse {
    email: string;
    score: number;
    id: number;
}

export class ScoreListResponse {
    scoresList: ScoreResponse[] = [];
}
