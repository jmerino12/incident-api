export class SLAService {
    static getDeadline(incidentType: string): Date {
      const deadline = new Date();
      if (incidentType === 'critical') deadline.setHours(deadline.getHours() + 4);
      else deadline.setDate(deadline.getDate() + 1);
      return deadline;
    }
  }