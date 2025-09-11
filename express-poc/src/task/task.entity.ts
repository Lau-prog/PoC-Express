export class Task {
  constructor(
    public title: string,
    public description: string,
    public idUser: number,
    public id?: number,
  ) {}
}