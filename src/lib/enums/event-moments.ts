import { registerEnumType } from '@nestjs/graphql';

export enum EventMoments {
  BEFORE = 'BEFORE',
  DURING = 'DURING',
  AFTER = 'AFTER',
}

registerEnumType(EventMoments, {
  name: 'EventMoments',
  description: '-',
});

export default EventMoments;
