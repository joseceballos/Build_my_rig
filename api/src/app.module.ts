import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma.module';
import { ComponentService } from './services/component.service';
import { ComponentTypeService } from './services/componentType.service';
import { SpecificationTypeService } from './services/specificationType.service';
import { SpecificationService } from './services/specification.service';
import { ComponentController } from './controllers/component.controller';
import { ComponentTypeController } from './controllers/componentType.controller';
import { SpecificationController } from './controllers/specification.controller';
import { SpecificationTypeController } from './controllers/specificationType.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    AppController,
    ComponentController,
    ComponentTypeController,
    SpecificationController,
    SpecificationTypeController,
  ],
  providers: [
    ComponentService,
    ComponentTypeService,
    SpecificationTypeService,
    SpecificationService,
  ],
})
export class AppModule {}
