export class CategoryEvent {
  constructor(
    public type: string,
    public amount: number,
    public category: number,
    public date: string,
    public description: string,
    public id?: number,
    public name?: srting
  ) {}
}
