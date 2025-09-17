export class Task {
  constructor(
    public title: string,
    public description: string,
    public idUser: number,
    public estado: 'PENDIENTE' | 'COMPLETO',
    public id?: number,
  ) {}
}