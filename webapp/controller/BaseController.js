sap.ui.define([
    'sap/ui/core/mvc/Controller',
    'sap/cs/abap/util/formatters'
], function(Controller,formatters){
    return Controller.extend("sap.cs.abap.controller.BaseController",{
        formatter:formatters
    })
});