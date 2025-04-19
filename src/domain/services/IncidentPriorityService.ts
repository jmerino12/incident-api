export class IncidentPriorityService {
    static calculate(title: string, description: string): 'low' | 'medium' | 'high' {
        if (title.toLowerCase().includes('urgente') || description.includes('🔥')) return 'high';
        if (description.length > 100) return 'medium';
        return 'low';
      }
  }