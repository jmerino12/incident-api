export class Incident {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public priority: 'low' | 'medium' | 'high',
    public createdBy: String
  ) {
    if (!title || title.length < 5) throw new Error('Invalid title');
    if (!description) throw new Error('Description is required');
  }
}
