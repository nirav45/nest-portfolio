import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class OneSignalService {
  private readonly ONE_SIGNAL_API_URL =
    'https://onesignal.com/api/v1/notifications';
  private readonly APP_ID = process.env.ONE_SIGNAL_APP_ID;
  private readonly REST_API_KEY = process.env.ONE_SIGNAL_REST_API_KEY;

  /**
   * Send push notification
   * @param targetDevices - Array of target device IDs
   * @param title - Notification title
   * @param message - Notification message
   * @param additionalData - Optional additional data
   * @param role - Optional role (user, mechanic)
   */
  async sendNotification(
    targetDevices: string[],
    title: string,
    message: string,
    additionalData: Record<string, any> = {},
    role?: string,
  ): Promise<any> {
    const payload: Record<string, any> = {
      app_id: this.APP_ID,
      headings: { en: title },
      contents: { en: message },
      data: additionalData,
    };

    if (role) {
      payload.filters = [
        {
          field: 'tag',
          key: 'role', // The key for the user role tag
          relation: '=',
          value: role, // The value you're targeting
        },
      ];
    } else {
      payload.include_player_ids = targetDevices;
    }

    try {
      const response = await axios.post(this.ONE_SIGNAL_API_URL, payload, {
        headers: {
          Authorization: `Basic ${this.REST_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error sending push notification',
        error.response?.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
