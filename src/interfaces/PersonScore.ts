export interface PersonScore {
    avgScore: number,
    person: string,     // name of the person, could be considered an ID
    sampleSize: number  // based on how many items was the score calculated
}