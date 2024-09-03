import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';
import { ComponentService } from './component.service';
import { ComponentTypeService } from './componentType.service';
import { SpecificationTypeService } from './specificationType.service';
import { SpecificationService } from './specification.service';

@Module({
  imports: [PrismaModule],
  controllers: [AppController],
  providers: [
    ComponentService,
    ComponentTypeService,
    SpecificationTypeService,
    SpecificationService,
  ],
})
export class AppModule {}
