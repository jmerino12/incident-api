import { DomainEvent } from "../../../domain/shared/DomainEvent";

export interface EventPublisher {
    publish(event: DomainEvent): Promise<void>;
  }