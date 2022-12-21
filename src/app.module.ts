
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { FastifyRequest } from "fastify";

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { ApolloServerPluginLandingPageLocalDefault } from "apollo-server-core";
import { CommonModule } from "./modules/common/common.module";
import { CreditInstitutionModule } from "./modules/credit-institution/ci.module";
import { AccountModule } from "./modules/account/account.module";
import { ObjectIdScalar } from "./lib/scalars/object-id.scalar";

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      context: (request: FastifyRequest) => ({ request }),
      autoSchemaFile: "schema.gql",
      cors: true,
      playground: false,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
    }),
    CommonModule,
    CreditInstitutionModule,
  ],
  // providers: [ObjectIdScalar],
})
export class AppModule {}
