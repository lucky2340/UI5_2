sap.ui.define([
    'sap/cs/abap/controller/BaseController',
    'sap/ui/model/json/JSONModel',
    'sap/m/MessageBox',
    'sap/m/MessageToast'
], function(BaseController,JSONModel,MessageBox,MessageToast) {
    return BaseController.extend("sap.cs.abap.controller.Add",{
        onInit:function(){
            var oPayload = new JSONModel();
            oPayload.setData({
                "myData":{
                    "PRODUCT_ID":"",
                    "TYPE_CODE": "PR",
                    "CATEGORY": "Notebooks",
                    "NAME": "Notebook Basic 15",
                    "DESCRIPTION": "Enter Description Here",
                    "SUPPLIER_ID": "0100000046",
                    "SUPPLIER_NAME": "SAP",
                    "TAX_TARIF_CODE": "1 ",
                    "MEASURE_UNIT": "",
                    "PRICE": "0.00",
                    "CURRENCY_CODE": ""
                }
            })
            this.getView().setModel(oPayload,"hunk");
            this.oLocalModel = oPayload;
        },

        onSave:function(){
            debugger
            var oPayload = this.oLocalModel.getProperty("/myData");
            if(!oPayload.PRODUCT_ID){
                MessageBox.error("Product cannot be empty");
                return;
            }
            var oModel = this.getOwnerComponent().getModel();
            
            if(this.sMode === "Create"){
                oModel.create("/ProductSet",oPayload,{
                    success:function(oData,response){
                        var prdId = response.data.PRODUCT_ID;
                        MessageToast.show("Order " + prdId +  " created");
                    },
                    error:function(oError){
                        // MessageBox.error(JSON.parse(oError.responseText).error.innererror.errordetails[0].message);
                        // var oData = oError.getParameter("");
                        // console.log(oError);
                        // MessageBox.error("Issue in creation of order");
                        
                    },
                    refreshAfterChange: true

                });
            }else{
                oModel.update("/ProductSet('" + oPayload.PRODUCT_ID +  "')", oPayload, {
                    success:function(){
                        
                    },
                    error:function(){
                        debugger;
                    },
                    refreshAfterChange: true
                });
            }
        },

        onCancel:function(){
            this.setMode("Create");
            var oPayload = this.oLocalModel;
            oPayload.setProperty("/myData",{
                "PRODUCT_ID":"",
                "TYPE_CODE": "PR",
                "CATEGORY": "Notebooks",
                "NAME": "Notebook Basic 15",
                "DESCRIPTION": "Enter Description Here",
                "SUPPLIER_ID": "0100000046",
                "SUPPLIER_NAME": "SAP",
                "TAX_TARIF_CODE": "1 ",
                "MEASURE_UNIT": "",
                "PRICE": "0.00",
                "CURRENCY_CODE": ""
                });         
        },

        onSubmitProduct:function(oEvent){
            debugger
            var that = this;
            var sVal = oEvent.getParameter("value");
            var oModel = this.getOwnerComponent().getModel();
            oModel.read("/ProductSet('" + sVal + "')",{
                success:function(data){
                    that.oLocalModel.setProperty("/myData",data);
                    that.setMode("Update");
                },
                error:function(){

                }
            });
            
        },

        sMode:"Create",
        setMode:function(mode){
            debugger
            if(mode === "Create"){
                this.getView().byId("idSaveBtn").setText("Save");
                this.getView().byId("idPrdId").setEnabled(true);
            }else{
                this.getView().byId("idSaveBtn").setText("Update");
                this.getView().byId("idPrdId").setEnabled(false);
            }
            this.sMode = mode;
        },

        onMexp:function(){
            debugger;
            var that = this;
            var oModel = this.getOwnerComponent().getModel();
            var oCat =this.oLocalModel.getProperty("/myData/CATEGORY")
            oModel.callFunction("/GetMostExpensiveProduct",{
                urlParameters:{
                    I_CATEGORY: oCat
                },
                success:function(data){
                    that.oLocalModel.setProperty("/myData",data);
                    that.setMode("Update");
                },
                error:function(error){
                    debugger;
                }
            });
        }

    })
});