sap.ui.define([
    'sap/cs/abap/controller/BaseController',
    'sap/ui/model/Filter',
    'sap/ui/model/FilterOperator'
], function(BaseController, Filter, FilterOperator) {
    return BaseController.extend("sap.cs.abap.controller.View1",{

        onInit:function(){
            this.router = this.getOwnerComponent().getRouter();
        },

        onNext:function(){
            var oAppCont = this.getView().getParent().getParent();
            oAppCont.to("idView2");
        },

        onSingleDelete:function(oEvent){
            var oSelectedRecord = oEvent.getParameter("listItem");
            var oList = oEvent.getSource();
            oList.removeItem(oSelectedRecord);
        },

        onMultiDelete:function(){
            debugger;
            var oList = this.getView().byId("idList");
            var oSelectedItems = oList.getSelectedItems();
            oSelectedItems.forEach(element => {
                oList.removeItem(element);
            });
        },

        onItemSelect:function(oEvent){
            debugger;
            var oSelectedItem = oEvent.getParameter("listItem");
            var sPath = oSelectedItem.getBindingContextPath();
            var sFruitId = sPath.split("/")[sPath.split("/").length - 1];
            this.router.navTo("detail",{
                fruitId: sFruitId
            })
            // var oView2 = this.getView().getParent().getParent().getDetailPages()[1];
            // oView2.bindElement(sPath);
            this.onNext();
        },

        onSearch:function(oEvent){
            var sValue = oEvent.getParameter("query");
            if(!sValue){
                var sValue = oEvent.getParameter("newValue");
            }
            var oList = this.getView().byId("idList");
            var oBinding = oList.getBinding("items");
            var oFilter1 = new Filter("CATEGORY", FilterOperator.Contains, sValue);
            // var oFilter2 = new Filter("taste", FilterOperator.Contains, sValue);
            // var filterFinal = new Filter({
            //     filters:[oFilter1,oFilter2],
            //     and:false
            // });
            oBinding.filter(oFilter1);
        },

        onAdd:function(){
            this.router.navTo("add");
        }

    })
});