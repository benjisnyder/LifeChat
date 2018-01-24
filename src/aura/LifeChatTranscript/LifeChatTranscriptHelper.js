({
	sendMessage : function(component, event) {
        var caseID = component.get("v.recordId");
        var targetCase = component.get('v.case');
        var input = component.find('lc-transcript-input');
        var inputText = input.get('v.value');
        var keyCode = event.getParams().keyCode;
        var transcript = component.get('v.transcript');
        var newTranscriptMessage = {};
        
        if (keyCode === 13) {
			newTranscriptMessage.Body__c = inputText;
            newTranscriptMessage.From_Agent__c = true;
            newTranscriptMessage.ParentCase__c = caseID;
            newTranscriptMessage.ExternalID__c = this.guid();
            newTranscriptMessage.TimeString__c = Date.now() + '';
			
            // Temporarily add the new message to the transcript for real time feedback
            transcript.unshift(newTranscriptMessage);
            component.set('v.transcript', transcript);
            
            this.addMessage(component, newTranscriptMessage);
            input.set('v.value', '');
        }
	},
    
    getTranscripts : function(component, event) {
        var action = component.get("c.getTranscripts");
        var caseID = component.get("v.recordId");
        var targetCase = component.get('v.case');
        
        action.setParams({ 
            "caseNumber": caseID
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            var transcriptArray;
            
            if (state === "SUCCESS") {
                transcriptArray = response.getReturnValue();
                
                transcriptArray.sort(function (a, b) {
                    return a.TimeString__c < b.TimeString__c;
                });		
                
                component.set('v.transcript', transcriptArray);
            }
        });
        $A.enqueueAction(action);
    },
    
    addMessage : function(component, transcriptMessage) {
        var action = component.get("c.addMessage");
        
        action.setParams({ 
            "message": transcriptMessage
        });

        action.setCallback(this, function(response) {
            var state = response.getState();

            if (state === "SUCCESS") {
                // Success
            }
        });
        $A.enqueueAction(action);
    },
    
    guid : function() {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }
})