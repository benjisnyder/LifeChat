({
	onInit : function(component, event, helper) {
		var action = component.get("c.getContact");
        var caseID = component.get("v.recordId");
        console.log(caseID);
        action.setParams({ 
            "id": caseID
        });
        
        action.setCallback(this, function(response) {
            var state = response.getState();
            console.log(response.getReturnValue());
            if (state === "SUCCESS") {
                component.set('v.targetContact', response.getReturnValue());
            }
        });
        $A.enqueueAction(action);
	}
})