import { Global, Module } from "@nestjs/common";
import { appConfigProvider } from "./app-config.provider";
import { databaseProvider } from "./database.provider";

@Global()
@Module({
  // imports: [AccountModule],
  providers: [databaseProvider, appConfigProvider],
  exports: [databaseProvider, appConfigProvider],
})
export class CommonModule { }
