export interface DomainEvent {
    type: string;
    payload: Record<string, any>;
    occurredAt: Date;
  }
  