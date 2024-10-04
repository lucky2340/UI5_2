sap.ui.define([
    
], function() {
    return ({
        getStatus:function(status){
            var oModel = this.getOwnerComponent().getModel();
            var oStatuses = oModel.getProperty("/status");
            for (let i = 0; i < oStatuses.length; i++) {
                const element = oStatuses[i];
                if(element.key == status){
                    return element.value
                }
            }
        },

        getColor:function(status){
            switch (status) {
                case "A":
                    return "Success"
                    break;
                case "O":
                    return "Warning"
                    break;
                case "D":
                    return "Error"
                    break;                                    
                default:
                    break;
            }
        }
    })
});