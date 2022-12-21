import { ObjectId } from '@makeit-studio/database';
import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind } from 'graphql';

@Scalar('ObjectId', () => ObjectId)
export class ObjectIdScalar implements CustomScalar<string, ObjectId> {
  description = 'Mongo object id scalar type';

  serialize(value: unknown): string {
    // check the type of received value
    if (!(value instanceof ObjectId)) {
      throw new Error('ObjectIdScalar can only serialize ObjectId values');
    }
    return value.toHexString(); // value sent to the client
  }

  parseValue(value: unknown): ObjectId {
    // check the type of received value
    if (typeof value !== 'string') {
      throw new Error('ObjectIdScalar can only parse string values');
    }
    return new ObjectId(value); // value from the client input variables
  }

  parseLiteral(ast): ObjectId {
    // check the type of received value
    if (ast.kind !== Kind.STRING) {
      throw new Error('ObjectIdScalar can only parse string values');
    }
    return new ObjectId(ast.value); // value from the client query
  }
}
