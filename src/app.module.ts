import { Module } from '@nestjs/common';
import { UserModule } from './infra/http/modules/user/user.module';
import { AuthGuard, KeycloakConnectModule } from 'nest-keycloak-connect';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    UserModule,
    KeycloakConnectModule.register({
      authServerUrl: 'http://localhost:3000/auth',
      realm: 'Demo-Realm',
      clientId: 'nest-app',
      secret: '83790b4f-48cd-4b6c-ac60-451a918be4b9',
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
