({
    onInit : function(component, event, helper) {
        var action = component.get("c.getCase");
        var caseID = component.get("v.recordId");
        
        action.setParams({ 
            "id": caseID
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            
            if (state === "SUCCESS") {
                var targetCase = response.getReturnValue();
                
                component.set('v.case', targetCase);
                
                window.setInterval(function() {
                    helper.getTranscripts(component, event);
                }, 500);
            }
        });
        $A.enqueueAction(action);
    },
    
    sendMessage : function(component, event, helper) {
		helper.sendMessage(component, event);
	}
})