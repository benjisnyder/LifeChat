public class LifeChatCustomerView {
	@AuraEnabled 
    public static Contact getContact(String id) {
		Case targetCase = [SELECT SuppliedPhone FROM Case WHERE Id = :id];
		Contact contact = [SELECT Name, MobilePhone, MailingAddress, Email FROM Contact WHERE MobilePhone = :targetCase.SuppliedPhone];
        return contact;
    }
}