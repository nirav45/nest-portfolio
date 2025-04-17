import { Injectable, Logger } from '@nestjs/common';
import * as schedule from 'node-schedule';

@Injectable()
export class ScheduleJobService {
  private readonly logger = new Logger(ScheduleJobService.name);

  scheduleOneTimeJob(jobName: string, runAt: Date, logic: any): void {
    const existingJob = schedule.scheduledJobs[jobName];

    if (existingJob) {
      this.logger.warn(
        `Job "${jobName}" already exists. Canceling the old job before scheduling.`,
      );
      this.cancelJob(jobName); // Cancel the existing job if you want to replace it.
    }

    const job = schedule.scheduleJob(jobName, runAt, () => {
      this.logger.log(`Executing one-time job: ${jobName}`);
      try {
        logic();
      } catch (error) {
        this.logger.error(`Error executing job "${jobName}":`, error);
      } finally {
        // Cancel the job once it is complete
        this.cancelJob(jobName);
      }
    });

    if (job) {
      this.logger.log(`Job "${jobName}" scheduled to run at ${runAt}`);
    } else {
      this.logger.warn(`Failed to schedule job "${jobName}" at ${runAt}`);
    }
  }

  cancelJob(jobName: string): void {
    const job = schedule.scheduledJobs[jobName];
    if (job) {
      job.cancel();
      this.logger.log(`Job "${jobName}" has been canceled`);
    } else {
      this.logger.warn(`Job "${jobName}" not found`);
    }
  }
}
