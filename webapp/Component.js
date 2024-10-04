sap.ui.define([
    'sap/ui/core/UIComponent'
],function(UIComponent){
    return UIComponent.extend("sap.cs.abap.Component",{
        metadata:{
            "manifest":"json"
        },
        init:function(){
            UIComponent.prototype.init.apply(this);
            this.getRouter().initialize();
        },
        // createContent:function(){
        //     var oRootView = new sap.ui.view({
        //         viewName:"sap.cs.abap.view.App",
        //         type:"XML",
        //         id:"idApp"
        //     });

        //     var oAppCont = oRootView.byId("idApp");

        //     var oView1 = new sap.ui.view({
        //         viewName:"sap.cs.abap.view.View1",
        //         type:"XML",
        //         id:"idView1"
        //     });

        //     var oView2 = new sap.ui.view({
        //         viewName:"sap.cs.abap.view.View2",
        //         type:"XML",
        //         id:"idView2"
        //     });
            
        //     var oEmpty = new sap.ui.view({
        //         viewName:"sap.cs.abap.view.Empty",
        //         type:"XML",
        //         id:"idEmpty"
        //     });

        //     oAppCont.addMasterPage(oView1).addDetailPage(oEmpty).addDetailPage(oView2);

        //     return oRootView;
        // },
        destroy:function(){

        }
    })
});