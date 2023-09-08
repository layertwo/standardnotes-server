import { DomainEventHandlerInterface, TransitionRequestedEvent } from '@standardnotes/domain-events'
import { Logger } from 'winston'

import { TriggerTransitionFromPrimaryToSecondaryDatabaseForUser } from '../UseCase/Transition/TriggerTransitionFromPrimaryToSecondaryDatabaseForUser/TriggerTransitionFromPrimaryToSecondaryDatabaseForUser'

export class TransitionRequestedEventHandler implements DomainEventHandlerInterface {
  constructor(
    private triggerTransitionFromPrimaryToSecondaryDatabaseForUser: TriggerTransitionFromPrimaryToSecondaryDatabaseForUser,
    private logger: Logger,
  ) {}

  async handle(event: TransitionRequestedEvent): Promise<void> {
    this.logger.info(`Handling transition requested event for user ${event.payload.userUuid}`)

    const result = await this.triggerTransitionFromPrimaryToSecondaryDatabaseForUser.execute({
      userUuid: event.payload.userUuid,
    })

    if (result.isFailed()) {
      this.logger.error(`Failed to trigger transition for user ${event.payload.userUuid}`)
    }
  }
}
