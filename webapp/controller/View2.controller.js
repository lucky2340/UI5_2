sap.ui.define([
    'sap/cs/abap/controller/BaseController',
    'sap/ui/model/json/JSONModel'
], function(BaseController,JSONModel) {
    return BaseController.extend("sap.cs.abap.controller.View2",{

        onInit:function(){
            this.router = this.getOwnerComponent().getRouter();
            this.router.getRoute("detail").attachMatched(this.herculus, this);
            this.localModel = this.getOwnerComponent().getModel("fruit"); 

            var oModel = new JSONModel();
            oModel.setData({
                "vendor":[{
                    "name":"",
                    "contactNo":"",
                    "person":"",
                    "city":"",
                }]
            });
            this.getView().setModel(oModel,"bunk");
            this.localModel = oModel;
        },

        onBack:function(){
            var oAppCont = this.getView().getParent();
            var oView1 = oAppCont.getPages()[0];
            oAppCont.to(oView1);
        },

        herculus:function(oEvent){
            var sFruitId = oEvent.getParameter("arguments").fruitId;
            var sPath = "/" + sFruitId;
            this.getView().bindElement(sPath);
        },

        onRefresh:function(){
            debugger;
            // var oModel = this.getOwnerComponent().getModel("fruit");

            // var oPayload = this.localModel.getProperty("/supplier");
            // var oTable = this.getView().byId("idTbleS");
            // oTable.bindAggregation("items","fruit>/supplier");
            // var oODataModel = this.getOwnerComponent().getModel("fruit");
		    // oODataModel.refresh(true);
            // this.getView().byId("idTbleS").getModel("fruit").refresh();
            // this.getView().byId("idTbleS").getBinding("items").getModel().refresh(true);
            var oTable = this.getView().byId("idTbleS");
            var oTableModel = oTable.getModel("fruit").getProperty("/supplier");
            var oTemp = oTableModel;
            oTable.getModel("fruit").setProperty("/supplier",oTemp);

            // this.getView().byId("idTbleS").getModel("fruit").refresh(true);
        },

        onDelete:function(oEvent){
            debugger
            var oItemSelected = oEvent.getParameter("listItem");
            var oTable = this.getView().byId("idTbleS");
            // var oBinding = oTable.getBinding("items");
            oTable.removeItem(oItemSelected);
        },

        onAddRow: function() {
            var oTable = this.getView().byId("batchTable");
            var oTableModel = oTable.getModel("bunk").getProperty("/vendor");
            var oNewRow = {
                "name":"",
                "contactNo":"",
                "person":"",
                "city":"",
                };
            oTableModel.push(oNewRow);
            oTable.getModel("bunk").setProperty("/vendor", oTableModel);
        },

        onDeleteS:function(oEvent){
            debugger
            var oItemSelected = oEvent.getParameter("listItem");
            var oTable = this.getView().byId("batchTable");
            // var oBinding = oTable.getBinding("items");
            oTable.removeItem(oItemSelected);
        }

    })
});