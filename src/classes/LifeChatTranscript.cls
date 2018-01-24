public class LifeChatTranscript {
    @AuraEnabled 
    public static Case getCase(String id) {
		Case c = [SELECT CaseNumber FROM Case WHERE Id = :id];
        return c;    
    }
    
    @AuraEnabled
    public static List<TranscriptMessage__c> getTranscripts(String caseNumber) {
        List<TranscriptMessage__c> transcriptList = [SELECT Body__c, From_Agent__c, TimeString__c FROM TranscriptMessage__c WHERE ParentCase__c = :caseNumber];
        return transcriptList;
    }
    
    @AuraEnabled
    public static TranscriptMessage__c addMessage(TranscriptMessage__c message) {
        TranscriptMessage__c m= new TranscriptMessage__c();
        
        m.Body__c = message.Body__c;
        m.From_Agent__c = message.From_Agent__c;
        m.ParentCase__c = message.ParentCase__c;
        m.ExternalID__c = message.ExternalID__c;
        m.TimeString__c = message.TimeString__c;
        
        insert m;
		return m;
    }
}