/* eslint-disable @typescript-eslint/no-unsafe-call */
import Controller from "sap/ui/core/mvc/Controller";
import AppComponent from "../Component";
import MessageBox from "sap/m/MessageBox";
import UI5Element from "sap/ui/core/Element";
import ODataContextBinding from "sap/ui/model/odata/v4/ODataContextBinding";
import ODataModel from "sap/ui/model/odata/v4/ODataModel";

/**
 * @namespace ui5.typescript.helloworld.controller
 */
export default class App extends Controller {
	public onInit(): void {
		// apply content density mode to root view
		const view = this.getView();
		if (view) {
			view.addStyleClass(
				(this.getOwnerComponent() as AppComponent).getContentDensityClass()
			);
		}
	}

	public async onSubmit() {
		const oModel = this.getView()?.getModel();
		const oActionODataContextBinding: ODataContextBinding | undefined =
			oModel?.bindContext("/askCapitalOfCountry(...)");
		const oInputCountry: UI5Element | undefined =
			this.getView()?.byId("inputCountry");

		oActionODataContextBinding?.setParameter(
			"country",
			oInputCountry?.getValue()
		);
		await oActionODataContextBinding?.execute();
		const oActionContext = oActionODataContextBinding.getBoundContext();

		MessageBox.show(oActionContext.getObject().value);
	}
}
