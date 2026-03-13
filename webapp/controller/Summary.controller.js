sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel"
], (Controller, JSONModel) => {
	"use strict";

	return Controller.extend("ui5.walkthrough.controller.Summary", {
		onInit() {
			const oSummaryModel = new JSONModel({
				totalQuantity: 0,
				totalPrice: 0,
				invoiceCount: 0
			});
			this.getView().setModel(oSummaryModel, "summary");

			const oInvoiceModel = this.getOwnerComponent().getModel("invoice");

			oInvoiceModel.read("/Invoices", {
				success: (oData) => {
					const aInvoices = oData.results || [];

					let iTotalQuantity = 0;
					let fTotalPrice = 0;

					aInvoices.forEach((oInvoice) => {
						iTotalQuantity += Number(oInvoice.Quantity) || 0;
						fTotalPrice += Number(oInvoice.ExtendedPrice) || 0;
					});

					oSummaryModel.setData({
						totalQuantity: iTotalQuantity,
						totalPrice: fTotalPrice,
						invoiceCount: aInvoices.length
					});
				},
				error: () => {
					oSummaryModel.setData({
						totalQuantity: 0,
						totalPrice: 0,
						invoiceCount: 0
					});
				}
			});
		}
	});
});