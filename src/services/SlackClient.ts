import { WebClient } from '@slack/web-api';

class SlackClient {
  private static instance: SlackClient;
  private client: WebClient;
  private readonly channel: string;

  private constructor() {
    this.client = new WebClient(process.env.SLACK_TOKEN);
    this.channel = process.env.SLACK_CHANNEL || '';
  }

  public static getInstance(): SlackClient {
    if (!SlackClient.instance) {
      SlackClient.instance = new SlackClient();
    }
    return SlackClient.instance;
  }

  public async sendMessage(message: string): Promise<void> {
    try {
      await this.client.chat.postMessage({
        channel: this.channel,
        text: message,
      });
    } catch (error) {
      console.error('Error sending message to Slack', error);
    }
  }
}

export default SlackClient;
