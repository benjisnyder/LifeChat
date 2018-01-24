trigger FeedCommentHookWebhookTrigger on FeedComment (after insert) {

    String url = 'https://lifechat-prod.herokuapp.com/inbox/reply/';

    String content = Webhook.jsonContent(Trigger.new, Trigger.old);

    Webhook.callout(url, content);

}