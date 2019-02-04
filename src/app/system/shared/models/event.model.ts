export class CategoryEvent {
  constructor(
    public type: string,
    public amount: number,
    public category: string,
    public date: string,
    public description: string,
    public id?: string,
    public name?: string
  ) { }
}
