// src/common/common.module.ts

import { Global, Module } from '@nestjs/common';
import { CommonService } from './common.service';
import { ScheduleJobService } from './schedule.service';
import { OneSignalService } from './one-signal.service';

@Global()
@Module({
  providers: [CommonService, ScheduleJobService, OneSignalService],
  exports: [CommonService, ScheduleJobService, OneSignalService],
})
export class CommonModule {}
